from django.db import models
from centros_deportivos.models import CentroDeportivo # Importa el modelo CentroDeportivo

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    precio = models.FloatField()
    stock = models.IntegerField()
    id_centro = models.ForeignKey(CentroDeportivo, on_delete=models.CASCADE, related_name='productos')

    class Meta:
        db_table = 'Producto'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return f"{self.nombre} (Centro: {self.id_centro.nombre})"