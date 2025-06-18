# backend/reseñas/views.py

from rest_framework import viewsets
from .models import Resena
from .serializers import ResenaSerializer
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!

class ResenaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reviews to be viewed or edited.
    """
    queryset = Resena.objects.all()
    serializer_class = ResenaSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!