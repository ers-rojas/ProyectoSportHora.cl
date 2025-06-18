from django.db import models
from django.contrib.auth.models import AbstractUser # Importa AbstractUser para extenderlo

# Modelo Usuario (Extensión del Usuario de Django)
# Esto nos permite añadir campos adicionales si los necesitamos en el futuro
# y usar el sistema de autenticación de Django.
class Usuario(AbstractUser):
    # Puedes añadir campos específicos aquí si los necesitas para todos los usuarios.
    # Por ahora, usamos los campos por defecto de AbstractUser (username, email, password, etc.)
    # Por ejemplo:
    # telefono = models.CharField(max_length=15, blank=True, null=True)
    # direccion = models.CharField(max_length=255, blank=True, null=True)

    # Si quieres usar el email como nombre de usuario (login), puedes configurarlo en settings.py
    # Pero por ahora, mantenemos el username como campo de login principal.

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return self.username

# Modelo Cliente
class Cliente(models.Model):
    # Un cliente SIEMPRE está asociado a un Usuario del sistema
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

    # Campos específicos del Cliente
    fecha_nacimiento = models.DateField(blank=True, null=True)
    genero = models.CharField(max_length=1, choices=[('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro')], blank=True, null=True)
    # Otros campos del cliente si los defines en tu DAS que no estén en AbstractUser
    # Por ejemplo, si el cliente tiene un campo rut, dirección física, etc.

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"

    def __str__(self):
        return f"Cliente: {self.usuario.username}"

# Aquí podríamos añadir otros modelos relacionados con el usuario, como Perfil (si se separa más)