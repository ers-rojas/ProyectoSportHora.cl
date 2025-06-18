from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, ClienteViewSet, RegistroClienteAPIView, LoginAPIView

# Crea un router y registra nuestros viewsets con él.
# El router generará automáticamente las URLs para las operaciones CRUD (list, create, retrieve, update, partial_update, destroy)
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet) # Las URLs serán algo como /api/usuarios/
router.register(r'clientes', ClienteViewSet) # Las URLs serán algo como /api/clientes/

# Las URLs son generadas automáticamente por el router.
urlpatterns = [
    path('', include(router.urls)),
    path('registro-cliente/', RegistroClienteAPIView.as_view(), name='registro_cliente'),
    path('login/', LoginAPIView.as_view(), name='login'),
]