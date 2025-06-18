# backend/mensajes/models.py
from django.db import models
from users.models import Usuario # Importa el modelo Usuario

class Mensaje(models.Model):
    id_mensaje = models.AutoField(primary_key=True)
    id_emisor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='mensajes_enviados')
    id_receptor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='mensajes_recibidos')
    asunto = models.CharField(max_length=255)
    contenido = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True) # Usa DateTimeField para incluir hora y fecha

    class Meta:
        db_table = 'Mensaje'
        verbose_name = 'Mensaje'
        verbose_name_plural = 'Mensajes'
        ordering = ['-fecha_envio'] # Ordenar mensajes por fecha de envío descendente

    def __str__(self):
        return f"Mensaje de {self.id_emisor.username} a {self.id_receptor.username}: {self.asunto}"