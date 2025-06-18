from django.db import models
from users.models import Usuario # Importa el modelo Usuario desde la app 'users'
from centros_deportivos.models import Cancha # Importa el modelo Cancha desde la app 'centros_deportivos'
from pagos.models import Pago

# Choices para el estado de la reserva
class EstadoReserva(models.TextChoices):
    PENDIENTE = 'PENDIENTE', 'Pendiente'
    CONFIRMADA = 'CONFIRMADA', 'Confirmada'
    CANCELADA = 'CANCELADA', 'Cancelada'
    COMPLETADA = 'COMPLETADA', 'Completada'

class Reserva(models.Model):
    id_reserva = models.AutoField(primary_key=True)
    fecha = models.DateField()
    hora = models.TimeField()
    estado = models.CharField(max_length=50, choices=EstadoReserva.choices, default=EstadoReserva.PENDIENTE)

    # Claves Foráneas
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='reservas_hechas')
    id_cancha = models.ForeignKey(Cancha, on_delete=models.CASCADE, related_name='reservas_cancha')
    id_pago = models.OneToOneField(Pago, on_delete=models.SET_NULL, null=True, blank=True, related_name='reserva_asociada')

    class Meta:
        db_table = 'Reserva'
        verbose_name = 'Reserva'
        verbose_name_plural = 'Reservas'
        # Opcional: Asegura que un usuario solo pueda reservar una cancha en una fecha y hora específicas una vez
        unique_together = ('fecha', 'hora', 'id_cancha')

    def __str__(self):
        return f"Reserva {self.id_reserva} - {self.id_cancha.numero} ({self.id_cancha.tipo}) - {self.fecha} {self.hora}"