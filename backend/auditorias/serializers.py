# backend/auditorias/serializers.py
from rest_framework import serializers
from .models import Auditoria
from users.models import Usuario # Para el StringRelatedField de usuario

class AuditoriaSerializer(serializers.ModelSerializer):
    id_usuario_username = serializers.StringRelatedField(source='id_usuario.username', read_only=True)

    # Campo para escribir la FK
    id_usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='id_usuario', write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Auditoria
        fields = '__all__'
        read_only_fields = ['fecha_hora'] # La fecha_hora se genera automáticamente