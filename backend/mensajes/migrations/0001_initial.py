# Generated by Django 5.2.1 on 2025-06-04 04:39

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Mensaje',
            fields=[
                ('id_mensaje', models.AutoField(primary_key=True, serialize=False)),
                ('asunto', models.CharField(max_length=255)),
                ('contenido', models.TextField()),
                ('fecha_envio', models.DateTimeField(auto_now_add=True)),
                ('id_emisor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mensajes_enviados', to=settings.AUTH_USER_MODEL)),
                ('id_receptor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mensajes_recibidos', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Mensaje',
                'verbose_name_plural': 'Mensajes',
                'db_table': 'Mensaje',
                'ordering': ['-fecha_envio'],
            },
        ),
    ]
