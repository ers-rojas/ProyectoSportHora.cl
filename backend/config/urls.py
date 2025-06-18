"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import api_root_view # Importa la nueva vista para la raíz

urlpatterns = [
    path('', api_root_view, name='api_root'), # Vista para la URL raíz (/)
    path('admin/', admin.site.urls),
    # Incluye las URLs de tus APIs aquí
    path('api/', include('users.urls')),
    path('api/', include('centros_deportivos.urls')), # Incluye las URLs de la app 'centros_deportivos'
    path('api/', include('reservas.urls')), 
    path('api/', include('reseñas.urls')), 
    path('api/', include('mensajes.urls')), 
    path('api/', include('auditorias.urls')), 
    path('api/', include('productos.urls')), 
    path('api/', include('suscripciones.urls')), 
    path('api/', include('pagos.urls')), 
    path('api/', include('reportes.urls')), 

]