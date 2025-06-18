from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SuscripcionViewSet

router = DefaultRouter()
router.register(r'suscripciones', SuscripcionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]