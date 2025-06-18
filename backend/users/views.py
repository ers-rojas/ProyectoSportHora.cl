# backend/users/views.py

from rest_framework import viewsets
from .models import Usuario, Cliente
from .serializers import UsuarioSerializer, ClienteSerializer
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated # Asegúrate de que todas estas estén importadas
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

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

# --- Registro de cliente (usuario + cliente) ----

class RegistroClienteAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        nombre_centro = request.data.get('nombreCentro')
        telefono = request.data.get('telefono')

        if not all([email, password]):
            return Response({'detail': 'email y password requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear usuario
        if Usuario.objects.filter(email=email).exists():
            return Response({'detail': 'El correo ya está registrado'}, status=status.HTTP_400_BAD_REQUEST)

        user = Usuario.objects.create_user(username=email, email=email, password=password, first_name=nombre_centro)

        # Crear cliente asociado
        cliente = Cliente.objects.create(usuario=user)

        # Podrías guardar teléfono en otro modelo; por ahora se ignora

        return Response({'id': user.id, 'cliente_id': cliente.pk}, status=status.HTTP_201_CREATED)

# ---------------------- LOGIN ----------------------

class LoginAPIView(APIView):
    """
    Autentica con email y password. Devuelve token y tipo de usuario (cliente o usuario).
    """
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'detail': 'Email y password requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        # Usamos email como username ya que en registro usamos username=email
        user = authenticate(request, username=email, password=password)

        if user is None:
            return Response({'detail': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generar o recuperar token
        token, _ = Token.objects.get_or_create(user=user)

        # Determinar tipo de cuenta
        user_type = 'cliente' if hasattr(user, 'cliente') else 'usuario'

        return Response({
            'token': token.key,
            'user_type': user_type,
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
        })

# Aquí podríamos añadir más ViewSets para otros modelos si fuera necesario en la app 'users'