# backend/centros_deportivos/views.py

from rest_framework import viewsets
# Asegúrate de que ya tienes las importaciones necesarias
from .models import CentroDeportivo, Cancha, Evento # ¡Importa Evento!
from .serializers import CentroDeportivoSerializer, CanchaSerializer, EventoSerializer # ¡Importa EventoSerializer!
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!


class CentroDeportivoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows sports centers to be viewed or edited.
    """
    queryset = CentroDeportivo.objects.all()
    serializer_class = CentroDeportivoSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!

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