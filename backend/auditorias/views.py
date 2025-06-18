# backend/auditorias/views.py

from rest_framework import viewsets
from .models import Auditoria
from .serializers import AuditoriaSerializer
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!

class AuditoriaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows audit records to be viewed or edited.
    """
    queryset = Auditoria.objects.all()
    serializer_class = AuditoriaSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!