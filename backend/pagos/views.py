# backend/pagos/views.py

from rest_framework import viewsets
from .models import Pago
from .serializers import PagoSerializer
from rest_framework.permissions import IsAdminUser # ¡CAMBIADO: Ahora solo importamos IsAdminUser!
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from uuid import uuid4
from transbank.webpay.webpay_plus.transaction import Transaction
from transbank.common.options import WebpayOptions
from transbank.common.integration_type import IntegrationType

class PagoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows payments to be viewed or edited.
    """
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    permission_classes = [IsAdminUser] # ¡CAMBIADO: Solo Superusuarios!

class WebpayInitMembresiaView(APIView):
    """Inicia una transacción Webpay Plus por la membresía mensual"""
    def post(self, request):
        # Datos frontend: monto fijo 50000 CLP, session_id = correo
        amount = 50000
        session_id = request.data.get('telefono', str(uuid4()))
        buy_order = str(uuid4())[:26]
        return_url = request.build_absolute_uri('/api/webpay/commit/')

        # Credenciales oficiales de integración (Webpay Plus)
        options = WebpayOptions(
            commerce_code='597055555532',
            api_key='579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
            integration_type=IntegrationType.TEST
        )
        tx = Transaction(options)
        try:
            response = tx.create(buy_order, session_id, amount, return_url)
            return Response({
                'url': response.get('url'),
                'token': response.get('token')
            })
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class WebpayCommitView(APIView):
    """Confirma la transacción Webpay Plus"""
    FRONTEND_BASE = 'http://localhost:4200'  # Ajusta a tu dominio cuando esté en prod

    def _redirect_front(self, path, params=None):
        """Devuelve una redirección 302 al frontend con parámetros opcionales"""
        from django.http import HttpResponseRedirect
        query = ''
        if params:
            import urllib.parse
            query = '?' + urllib.parse.urlencode(params)
        return HttpResponseRedirect(f"{self.FRONTEND_BASE}{path}{query}")

    def get(self, request):
        """Webpay retorna por GET una vez finalizado o anulado el pago."""
        token = request.query_params.get('token_ws') or request.query_params.get('TBK_TOKEN')

        # Si no viene token_ws significa que el usuario anuló la compra
        if not token or token == 'null':
            return self._redirect_front('/cliente-registro', {'pago': 'cancelado'})

        # Existe token: intentar confirmar transacción
        options = WebpayOptions(
            commerce_code='597055555532',
            api_key='579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
            integration_type=IntegrationType.TEST
        )
        tx = Transaction(options)
        try:
            result = tx.commit(token)
            # Enviar SMS al cliente
            self._enviar_sms(result.get('session_id'), '¡Bienvenido a SportHora! Su cuenta está habilitada para su ingreso.')
            return self._redirect_front('/cliente', {'pago': 'exitoso', 'monto': result.get('amount', 0)})
        except Exception:
            # Falló la confirmación
            return self._redirect_front('/cliente', {'pago': 'error'})

    def post(self, request):
        """Permite confirmar vía POST cuando el frontend envía el token manualmente."""
        token = request.data.get('token_ws')
        if not token:
            return Response({'detail': 'token_ws requerido'}, status=status.HTTP_400_BAD_REQUEST)

        options = WebpayOptions(
            commerce_code='597055555532',
            api_key='579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
            integration_type=IntegrationType.TEST
        )
        tx = Transaction(options)
        try:
            result = tx.commit(token)
            self._enviar_sms(result.get('session_id'), '¡Bienvenido a SportHora! Su cuenta está habilitada para su ingreso.')
            return Response(result)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _enviar_sms(self, numero: str, mensaje: str):
        """Envía SMS usando Twilio. Requiere variables de entorno TWILIO_* configuradas"""
        if not numero:
            return
        try:
            from os import getenv
            from twilio.rest import Client
            # Normaliza número chileno
            numero = numero.strip()
            if numero.startswith('0'):
                numero = numero[1:]
            if not numero.startswith('+56'):
                numero = f'+56{numero}'

            sid = getenv('TWILIO_ACCOUNT_SID')
            token = getenv('TWILIO_AUTH_TOKEN')
            desde = getenv('TWILIO_PHONE_FROM')
            if not (sid and token and desde):
                print('Twilio no configurado: variables de entorno faltantes')
                return
            client = Client(sid, token)
            msg = client.messages.create(body=mensaje, from_=desde, to=numero)
            print(f'SMS enviado a {numero} – SID {msg.sid}')
        except Exception as e:
            print('Error enviando SMS:', e)