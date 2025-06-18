from rest_framework import serializers
from .models import Reporte
from centros_deportivos.models import CentroDeportivo # Para el StringRelatedField de centro

class ReporteSerializer(serializers.ModelSerializer):
    id_centro_nombre = serializers.StringRelatedField(source='id_centro.nombre', read_only=True)

    # Campo para escribir la FK
    id_centro_id = serializers.PrimaryKeyRelatedField(
        queryset=CentroDeportivo.objects.all(), source='id_centro', write_only=True
    )

    class Meta:
        model = Reporte
        fields = '__all__'
        read_only_fields = ['fecha'] # La fecha se genera automáticamente