# backend/suscripciones/views.py

from rest_framework import viewsets
from .models import Suscripcion
from .serializers import SuscripcionSerializer
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!

class SuscripcionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subscriptions to be viewed or edited.
    """
    queryset = Suscripcion.objects.all()
    serializer_class = SuscripcionSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!