# backend/centros_deportivos/models.py
from django.db import models
from users.models import Usuario # Asegúrate de importar tu modelo Usuario personalizado

# Definiciones de Choices
class TipoCancha(models.TextChoices):
    FUTBOL = 'FUTBOL', 'Fútbol'
    TENIS = 'TENIS', 'Tenis'
    BALONCESTO = 'BALONCESTO', 'Baloncesto'
    PADEL = 'PADEL', 'Pádel'
    VOLEIBOL = 'VOLEIBOL', 'Voleibol'
    # Agrega más tipos según necesites

class EstadoCancha(models.TextChoices):
    DISPONIBLE = 'DISPONIBLE', 'Disponible'
    OCUPADA = 'OCUPADA', 'Ocupada'
    MANTENIMIENTO = 'MANTENIMIENTO', 'En Mantenimiento'
    INACTIVA = 'INACTIVA', 'Inactiva'

class CentroDeportivo(models.Model):
    id_centro = models.AutoField(primary_key=True) # Añadido el PK AutoField
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    rut = models.CharField(max_length=12, blank=True, null=True)
    latitud = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True) # Para coordenadas GPS
    longitud = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True) # Para coordenadas GPS
    propietario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='centros_propietario')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'CentroDeportivo' # Nombre de la tabla explícito
        verbose_name = "Centro Deportivo"
        verbose_name_plural = "Centros Deportivos"

    def __str__(self):
        return self.nombre

class Cancha(models.Model):
    id_cancha = models.AutoField(primary_key=True)
    numero = models.IntegerField()
    tipo = models.CharField(max_length=50, choices=TipoCancha.choices)
    estado = models.CharField(max_length=50, choices=EstadoCancha.choices, default=EstadoCancha.DISPONIBLE)
    # Foreign Key a CentroDeportivo
    id_centro = models.ForeignKey(CentroDeportivo, on_delete=models.CASCADE, related_name='canchas')

    class Meta:
        db_table = 'Cancha' # Asegúrate de que el nombre de la tabla sea 'Cancha'
        verbose_name = 'Cancha'
        verbose_name_plural = 'Canchas'

    def __str__(self):
        return f"Cancha {self.numero} ({self.tipo}) - Centro: {self.id_centro.nombre}"
    
    
class TipoEvento(models.TextChoices):
    TORNEO = 'TORNEO', 'Torneo'
    CLASE = 'CLASE', 'Clase'
    PARTIDO = 'PARTIDO', 'Partido Abierto'
    MANTENIMIENTO = 'MANTENIMIENTO', 'Mantenimiento'
    # Agrega más tipos según necesites

class EstadoEvento(models.TextChoices):
    ACTIVO = 'ACTIVO', 'Activo'
    CANCELADO = 'CANCELADO', 'Cancelado'
    FINALIZADO = 'FINALIZADO', 'Finalizado'
    PROXIMO = 'PROXIMO', 'Próximo'


class Evento(models.Model):
    id_evento = models.AutoField(primary_key=True)
    tipo_evento = models.CharField(max_length=50, choices=TipoEvento.choices)
    nombre = models.CharField(max_length=255)
    hora = models.TimeField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado = models.CharField(max_length=50, choices=EstadoEvento.choices, default=EstadoEvento.PROXIMO)
    id_centro = models.ForeignKey(CentroDeportivo, on_delete=models.CASCADE, related_name='eventos')

    class Meta:
        db_table = 'Evento'
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'

    def __str__(self):
        return f"{self.nombre} ({self.tipo_evento}) en {self.id_centro.nombre}"