# backend/reportes/models.py
from django.db import models
from centros_deportivos.models import CentroDeportivo # Importa el modelo CentroDeportivo

# Choices para tipo_reporte (ejemplo)
class TipoReporte(models.TextChoices):
    VENTAS = 'VENTAS', 'Reporte de Ventas'
    OCUPACION = 'OCUPACION', 'Reporte de Ocupación de Canchas'
    CLIENTES = 'CLIENTES', 'Reporte de Clientes'
    PRODUCTOS = 'PRODUCTOS', 'Reporte de Productos'
    # Agrega más tipos de reporte según necesites

class Reporte(models.Model):
    id_reporte = models.AutoField(primary_key=True)
    tipo_reporte = models.CharField(max_length=100, choices=TipoReporte.choices)
    nombre = models.CharField(max_length=255) # Nombre descriptivo del reporte
    fecha = models.DateField(auto_now_add=True) # Fecha de creación del reporte
    id_centro = models.ForeignKey(CentroDeportivo, on_delete=models.CASCADE, related_name='reportes')

    class Meta:
        db_table = 'Reporte'
        verbose_name = 'Reporte'
        verbose_name_plural = 'Reportes'
        ordering = ['-fecha'] # Ordenar por fecha descendente

    def __str__(self):
        return f"{self.nombre} ({self.tipo_reporte}) - Centro: {self.id_centro.nombre}"