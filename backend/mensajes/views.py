# backend/mensajes/views.py

from rest_framework import viewsets
from .models import Mensaje
from .serializers import MensajeSerializer
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!

class MensajeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows messages to be viewed or edited.
    """
    queryset = Mensaje.objects.all()
    serializer_class = MensajeSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!