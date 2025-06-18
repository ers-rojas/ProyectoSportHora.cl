from rest_framework import serializers
from .models import Mensaje
from users.models import Usuario # Para el StringRelatedField de usuario

class MensajeSerializer(serializers.ModelSerializer):
    id_emisor_username = serializers.StringRelatedField(source='id_emisor.username', read_only=True)
    id_receptor_username = serializers.StringRelatedField(source='id_receptor.username', read_only=True)

    # Campos para escribir las FKs
    id_emisor_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='id_emisor', write_only=True
    )
    id_receptor_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='id_receptor', write_only=True
    )

    class Meta:
        model = Mensaje
        fields = '__all__'
        # read_only_fields = ['fecha_envio'] # La fecha se establece automáticamente