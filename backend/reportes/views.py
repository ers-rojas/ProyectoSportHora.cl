# backend/reportes/views.py

from rest_framework import viewsets
from .models import Reporte
from .serializers import ReporteSerializer
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!

class ReporteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reports to be viewed or edited.
    """
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!