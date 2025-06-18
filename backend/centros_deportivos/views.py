# backend/centros_deportivos/views.py

from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from math import radians, cos, sin, asin, sqrt
# Asegúrate de que ya tienes las importaciones necesarias
from .models import CentroDeportivo, Cancha, Evento # ¡Importa Evento!
from .serializers import CentroDeportivoSerializer, CanchaSerializer, EventoSerializer # ¡Importa EventoSerializer!
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!
import os


class CentroDeportivoViewSet(viewsets.ModelViewSet):
    """
    API endpoint for centros deportivos. Cualquier usuario puede listar o ver detalles; sólo admin puede crear/modificar.
    """
    queryset = CentroDeportivo.objects.all()
    serializer_class = CentroDeportivoSerializer

    def get_permissions(self):
        # List y Retrieve públicos
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        # Otras acciones restringidas
        return [IsAdminUser()]

# Nuevo ViewSet para Cancha
class CanchaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows courts to be viewed or edited.
    """
    queryset = Cancha.objects.all()
    serializer_class = CanchaSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!

# Nuevo ViewSet para Evento
class EventoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows events to be viewed or edited.
    """
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!

# --- Endpoint público para listar centros disponibles filtrados por deporte/fecha/hora ---
class CentroDisponibleList(generics.ListAPIView):
    serializer_class = CentroDeportivoSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = CentroDeportivo.objects.all()

        # Filtros opcionales vía query params
        sport = self.request.query_params.get("sport")
        if sport:
            qs = qs.filter(canchas__tipo__iexact=sport).distinct()

        # Podrías filtrar por disponibilidad real usando reservas aquí
        # date = self.request.query_params.get("date")
        # time = self.request.query_params.get("time")
        # TODO: filtrar canchas/reservas para mostrar solo centros con disponibilidad

        return qs

# ------------------ Centros cercanos ------------------

def haversine(lat1, lon1, lat2, lon2):
    """Distancia en metros entre dos puntos lat/lon"""
    R = 6371000
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    return 2 * R * asin(sqrt(a))


@api_view(['GET'])
def centros_cercanos(request):
    """Devuelve centros propios cercanos (<= radio metros) y opcionalmente externos."""
    lat_param=request.query_params.get('lat')
    lng_param=request.query_params.get('lng')
    lat=lng=None
    if lat_param and lng_param:
        try:
            lat=float(lat_param)
            lng=float(lng_param)
        except ValueError:
            return Response({'detail':'lat/lng inválidos'},status=400)
    elif not request.query_params.get('comuna'):
        return Response({'detail':'lat y lng requeridos'},status=400)

    radio = float(request.query_params.get('rad', 5000))  # metros
    sport = request.query_params.get('sport', '').lower()
    comuna = request.query_params.get('comuna', '').lower()

    cercanos = []
    centros_qs = CentroDeportivo.objects.all()
    if comuna:
        centros_qs = centros_qs.filter(direccion__icontains=comuna)
    if sport:
        centros_qs = centros_qs.filter(canchas__tipo__icontains=sport).distinct()

    # Solo filtramos por distancia si tenemos lat/lng
    if lat is not None and lng is not None:
        centros_qs = centros_qs.exclude(latitud__isnull=True).exclude(longitud__isnull=True)

    for centro in centros_qs:
        if lat is not None and lng is not None and centro.latitud is not None:
            dist = haversine(lat, lng, float(centro.latitud), float(centro.longitud))
            if dist > radio:
                continue
            data = CentroDeportivoSerializer(centro).data
            data['dist'] = int(dist)
        else:
            data = CentroDeportivoSerializer(centro).data
            data['dist'] = None
        cercanos.append(data)

    cercanos.sort(key=lambda x: x['dist'])

    # --- Externos vía Google Places ---
    externos = []
    key = os.getenv('GOOGLE_PLACES_KEY')
    if key:
        try:
            import requests
            keywords = {
                'futbolito': 'cancha futbol 5',
                'futbol-11': 'cancha futbol 11',
                'tenis': 'cancha tenis',
                'padel': 'cancha padel'
            }
            kw = keywords.get(sport, 'cancha deportiva')
            url = (
                'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
                f'?location={lat},{lng}&radius={int(radio)}'
                f'&keyword={kw.replace(" ", "%20")}'
                '&language=es&key=' + key
            )
            places = requests.get(url, timeout=4).json()
            for p in places.get('results', []):
                externos.append({
                    'id': p.get('place_id'),
                    'nombre': p.get('name'),
                    'direccion': p.get('vicinity'),
                    'img': (
                        f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400"
                        f"&photoreference={p['photos'][0]['photo_reference']}&key={key}"
                    ) if p.get('photos') else None,
                    'externo': True
                })
        except Exception as exc:
            print('Google Places error:', exc)

    return Response({'propios': cercanos, 'externos': externos})