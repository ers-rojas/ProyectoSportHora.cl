# backend/centros_deportivos/views.py

from rest_framework import viewsets, generics, permissions
# Asegúrate de que ya tienes las importaciones necesarias
from .models import CentroDeportivo, Cancha, Evento # ¡Importa Evento!
from .serializers import CentroDeportivoSerializer, CanchaSerializer, EventoSerializer # ¡Importa EventoSerializer!
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!


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