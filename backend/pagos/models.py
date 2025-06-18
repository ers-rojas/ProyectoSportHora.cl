# backend/pagos/models.py
from django.db import models
# from users.models import Usuario # Si Pago tuviera una FK directa a Usuario, la importaríamos aquí

# Choices para método de pago (ejemplo)
class MetodoPago(models.TextChoices):
    TARJETA_CREDITO = 'TARJETA_CREDITO', 'Tarjeta de Crédito'
    TARJETA_DEBITO = 'TARJETA_DEBITO', 'Tarjeta de Débito'
    PAYPAL = 'PAYPAL', 'PayPal'
    TRANSFERENCIA_BANCARIA = 'TRANSFERENCIA_BANCARIA', 'Transferencia Bancaria'
    EFECTIVO = 'EFECTIVO', 'Efectivo'

class Pago(models.Model):
    id_pago = models.AutoField(primary_key=True)
    metodo = models.CharField(max_length=50, choices=MetodoPago.choices)
    monto = models.FloatField()
    fecha = models.DateField(auto_now_add=True) # La fecha se establece automáticamente al crear

    # Si hubiera una relación directa con el usuario que hizo el pago, la añadiríamos aquí:
    # id_usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='pagos_realizados')

    class Meta:
        db_table = 'Pago'
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'
        ordering = ['-fecha'] # Ordenar por fecha descendente

    def __str__(self):
        return f"Pago {self.id_pago} - {self.metodo} - ${self.monto} ({self.fecha})"