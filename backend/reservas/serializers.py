from rest_framework import serializers
from .models import Reserva
from users.models import Usuario # Para el StringRelatedField de usuario
from centros_deportivos.models import Cancha # Para el StringRelatedField de cancha
from pagos.models import Pago

class ReservaSerializer(serializers.ModelSerializer):
    # Campos de solo lectura para mostrar información relacionada
    id_usuario_nombre = serializers.StringRelatedField(source='id_usuario.username', read_only=True)
    id_cancha_info = serializers.StringRelatedField(source='id_cancha.__str__', read_only=True) # Muestra el __str__ de Cancha
    id_pago_info = serializers.StringRelatedField(source='id_pago.__str__', read_only=True) # Para ver info del pago

    # Campos para escribir las FKs
    id_usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='id_usuario', write_only=True
    )
    id_cancha_id = serializers.PrimaryKeyRelatedField(
        queryset=Cancha.objects.all(), source='id_cancha', write_only=True
    )
    id_pago_id = serializers.PrimaryKeyRelatedField( # ¡Añade este campo!
        queryset=Pago.objects.all(), source='id_pago', write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Reserva
        fields = '__all__' # Incluye todos los campos de Reserva
        # Opcional: Si quieres control más fino sobre los campos
        # fields = ['id_reserva', 'fecha', 'hora', 'estado', 'id_usuario_nombre', 'id_cancha_info', 'id_usuario_id', 'id_cancha_id']