# backend/users/views.py

from rest_framework import viewsets
from .models import Usuario, Cliente
from .serializers import UsuarioSerializer, ClienteSerializer
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated # Asegúrate de que todas estas estén importadas

class UsuarioViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Usuario.objects.all().order_by('-date_joined')
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        """
        Define permisos personalizados basados en la acción.
        - 'create' (registro de usuario): Permitido para cualquiera (AllowAny).
        - Otras acciones (list, retrieve, update, partial_update, destroy): Solo para Superusuarios (IsAdminUser).
        """
        if self.action == 'create':
            # Permite que cualquier usuario cree una cuenta (registro)
            return [AllowAny()]
        else:
            # Para todas las demás acciones (listar, ver detalles, actualizar, borrar),
            # solo permite a los usuarios con permisos de administrador (Superusuarios).
            return [IsAdminUser()]

class ClienteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    # Para el ClienteViewSet, todas las operaciones serán accesibles solo por Superusuarios.
    # Si en el futuro quieres que un cliente pueda ver/editar su propio perfil,
    # necesitarías un permiso personalizado.
    permission_classes = [IsAdminUser] # ¡MODIFICADO: Ahora solo administradores pueden acceder a clientes!

# Aquí podríamos añadir más ViewSets para otros modelos si fuera necesario en la app 'users'