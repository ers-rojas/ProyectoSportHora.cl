from rest_framework import serializers
from .models import Usuario, Cliente

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        # Incluye los campos que quieras exponer de Usuario.
        # password debe ser solo para escritura y no debe mostrarse en GET
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined', 'password']
        extra_kwargs = {'password': {'write_only': True}} # Hace que la contraseña sea solo de escritura

    def create(self, validated_data):
        # Método para crear un usuario, importante para manejar la contraseña de forma segura
        user = Usuario.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        # Método para actualizar un usuario, maneja la contraseña si se proporciona
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password) # Usa set_password para hashear la contraseña
        return super().update(instance, validated_data)


class ClienteSerializer(serializers.ModelSerializer):
    # Para incluir la información del usuario relacionado directamente en el serializer del cliente
    # Asegúrate de que este 'usuario' se refiere al campo OneToOneField en el modelo Cliente
    usuario = UsuarioSerializer(read_only=True) # read_only=True para no intentar crear/actualizar el usuario desde el cliente directamente

    class Meta:
        model = Cliente
        fields = '__all__' # Incluye todos los campos del modelo Cliente (id, usuario, fecha_nacimiento, genero)

# Puedes crear otros serializers aquí si los necesitas para otras operaciones