# backend/mensajes/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MensajeViewSet

router = DefaultRouter()
router.register(r'mensajes', MensajeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]