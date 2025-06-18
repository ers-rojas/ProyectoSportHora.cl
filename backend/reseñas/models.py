# backend/reseñas/models.py
from django.db import models
from users.models import Usuario # Importa el modelo Usuario

class Resena(models.Model):
    id_resena = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='reseñas_creadas')
    puntuacion = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)]) # Puntuación de 1 a 5
    comentario = models.TextField(blank=True, null=True)
    fecha = models.DateField(auto_now_add=True) # Establece la fecha automáticamente al crear

    class Meta:
        db_table = 'Resena'
        verbose_name = 'Reseña'
        verbose_name_plural = 'Reseñas'
        # Opcional: Asegura que un usuario solo pueda dejar una reseña por alguna entidad específica (ej. por CentroDeportivo)
        # Si las reseñas son para CentrosDeportivos, necesitarías una FK a CentroDeportivo aquí.
        # Por ahora, se asume una reseña general o para algún otro propósito no especificado.

    def __str__(self):
        return f"Reseña de {self.id_usuario.username} - Puntuación: {self.puntuacion} ({self.fecha})"