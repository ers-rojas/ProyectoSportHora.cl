# backend/reseñas/serializers.py
from rest_framework import serializers
from .models import Resena
from users.models import Usuario # Para el StringRelatedField de usuario

class ResenaSerializer(serializers.ModelSerializer):
    id_usuario_username = serializers.StringRelatedField(source='id_usuario.username', read_only=True)
    id_usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='id_usuario', write_only=True
    )

    class Meta:
        model = Resena
        fields = '__all__'
        # Puedes especificar los campos que quieres que sean de solo lectura si es necesario
        # read_only_fields = ['fecha']