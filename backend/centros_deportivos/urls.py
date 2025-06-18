from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Importa los ViewSets
from .views import CentroDeportivoViewSet, CanchaViewSet, EventoViewSet # ¡Añade EventoViewSet!

router = DefaultRouter()
router.register(r'centros_deportivos', CentroDeportivoViewSet)
router.register(r'canchas', CanchaViewSet)
router.register(r'eventos', EventoViewSet) # ¡Añade esta línea para Evento!

urlpatterns = [
    path('', include(router.urls)),
]