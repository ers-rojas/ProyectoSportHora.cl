# backend/reseñas/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResenaViewSet

router = DefaultRouter()
router.register(r'reseñas', ResenaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]