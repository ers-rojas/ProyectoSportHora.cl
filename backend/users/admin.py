from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Cliente

# Registramos nuestro modelo Usuario usando UserAdmin para mantener su funcionalidad de Django
admin.site.register(Usuario, UserAdmin)

# Registramos el modelo Cliente
admin.site.register(Cliente)