# backend/auditorias/models.py
from django.db import models
from users.models import Usuario # Importa el modelo Usuario

class Auditoria(models.Model):
    id_auditoria = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='registros_auditoria') # SET_NULL si el usuario se borra, para no perder el registro de auditoría
    accion = models.CharField(max_length=255) # Descripción de la acción realizada (ej. "Crear usuario", "Actualizar centro")
    fecha_hora = models.DateTimeField(auto_now_add=True) # Fecha y hora de la acción
    modulo_afectado = models.CharField(max_length=100) # Módulo o tabla afectada (ej. "Usuarios", "CentrosDeportivos")

    class Meta:
        db_table = 'Auditoria'
        verbose_name = 'Auditoría'
        verbose_name_plural = 'Auditorías'
        ordering = ['-fecha_hora'] # Ordenar por fecha y hora descendente

    def __str__(self):
        return f"[{self.fecha_hora}] Usuario: {self.id_usuario.username if self.id_usuario else 'N/A'} - Acción: {self.accion} en {self.modulo_afectado}"