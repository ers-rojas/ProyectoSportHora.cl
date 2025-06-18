from django.contrib import admin
from .models import CentroDeportivo

# Registramos el modelo CentroDeportivo con un ModelAdmin customizado
@admin.register(CentroDeportivo)
class CentroDeportivoAdmin(admin.ModelAdmin):
    list_display = ("id_centro", "nombre", "propietario", "rut", "created_at")
    list_filter = ("created_at", "propietario")
    search_fields = ("nombre", "rut", "propietario__username")
    ordering = ("-created_at",)