# Asegúrate de que ya tienes las importaciones necesarias
from rest_framework import serializers
from .models import CentroDeportivo, Cancha, Evento # ¡Importa Evento!


class CentroDeportivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CentroDeportivo
        fields = '__all__'
        read_only_fields = ("created_at",)

# Nuevo Serializer para Cancha
class CanchaSerializer(serializers.ModelSerializer):
    # Para mostrar el nombre del centro deportivo en lugar del ID
    id_centro = serializers.StringRelatedField(source='id_centro.nombre', read_only=True)
    id_centro_id = serializers.PrimaryKeyRelatedField(
        queryset=CentroDeportivo.objects.all(), source='id_centro', write_only=True
    )

    class Meta:
        model = Cancha
        fields = '__all__' # Incluye todos los campos de Cancha
        # Puedes especificar los campos que quieres que sean de solo lectura si es necesario
        # read_only_fields = ['id_cancha']

# Nuevo Serializer para Evento
class EventoSerializer(serializers.ModelSerializer):
    # Para mostrar el nombre del centro deportivo en lugar del ID
    id_centro = serializers.StringRelatedField(source='id_centro.nombre', read_only=True)
    id_centro_id = serializers.PrimaryKeyRelatedField(
        queryset=CentroDeportivo.objects.all(), source='id_centro', write_only=True
    )

    class Meta:
        model = Evento
        fields = '__all__'
