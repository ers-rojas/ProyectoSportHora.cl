# backend/pagos/views.py

from rest_framework import viewsets
from .models import Pago
from .serializers import PagoSerializer
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!

class PagoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows payments to be viewed or edited.
    """
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!