from django.db import models
from centros_deportivos.models import CentroDeportivo # Importa el modelo CentroDeportivo

# Choices para tipo_plan y estado de suscripción
class TipoPlanSuscripcion(models.TextChoices):
    BASICO = 'BASICO', 'Básico'
    PREMIUM = 'PREMIUM', 'Premium'
    EMPRESARIAL = 'EMPRESARIAL', 'Empresarial'
    # Agrega más tipos de plan según necesites

class EstadoSuscripcion(models.TextChoices):
    ACTIVA = 'ACTIVA', 'Activa'
    INACTIVA = 'INACTIVA', 'Inactiva'
    PENDIENTE = 'PENDIENTE', 'Pendiente'
    CANCELADA = 'CANCELADA', 'Cancelada'

class Suscripcion(models.Model):
    id_suscripcion = models.AutoField(primary_key=True)
    tipo_plan = models.CharField(max_length=50, choices=TipoPlanSuscripcion.choices)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado = models.CharField(max_length=50, choices=EstadoSuscripcion.choices, default=EstadoSuscripcion.ACTIVA)
    id_centro = models.ForeignKey(CentroDeportivo, on_delete=models.CASCADE, related_name='suscripciones')

    class Meta:
        db_table = 'Suscripcion'
        verbose_name = 'Suscripción'
        verbose_name_plural = 'Suscripciones'

    def __str__(self):
        return f"Suscripción {self.tipo_plan} para {self.id_centro.nombre} ({self.estado})"