from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root_view(request):
    """
    API Root endpoint to confirm the backend is running.
    """
    return JsonResponse({
        "message": "Bienvenido a la API de SportHora!",
        "api_endpoints": {
            "admin": "/admin/",
            "usuarios": "/api/usuarios/",
            "clientes": "/api/clientes/",
            "centros_deportivos": "/api/centros_deportivos/"
        }
    })