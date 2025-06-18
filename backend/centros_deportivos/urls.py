from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Importa los ViewSets
from .views import CentroDeportivoViewSet, CanchaViewSet, EventoViewSet, CentroDisponibleList # ¡Añade EventoViewSet y CentroDisponibleList!

router = DefaultRouter()
router.register(r'centros_deportivos', CentroDeportivoViewSet)
router.register(r'canchas', CanchaViewSet)
router.register(r'eventos', EventoViewSet) # ¡Añade esta línea para Evento!

urlpatterns = [
    # Ruta personalizada antes que router para evitar que el router capture "disponibles" como pk
    path('centros_deportivos/disponibles/', CentroDisponibleList.as_view(), name='centros-disponibles'),
    path('', include(router.urls)),
]