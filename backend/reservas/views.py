# backend/reservas/views.py

from rest_framework import viewsets
from .models import Reserva
from .serializers import ReservaSerializer
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!

class ReservaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reservations to be viewed or edited.
    """
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!