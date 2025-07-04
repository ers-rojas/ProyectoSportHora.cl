# Generated by Django 5.2.1 on 2025-06-04 05:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('centros_deportivos', '0003_evento'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reporte',
            fields=[
                ('id_reporte', models.AutoField(primary_key=True, serialize=False)),
                ('tipo_reporte', models.CharField(choices=[('VENTAS', 'Reporte de Ventas'), ('OCUPACION', 'Reporte de Ocupación de Canchas'), ('CLIENTES', 'Reporte de Clientes'), ('PRODUCTOS', 'Reporte de Productos')], max_length=100)),
                ('nombre', models.CharField(max_length=255)),
                ('fecha', models.DateField(auto_now_add=True)),
                ('id_centro', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reportes', to='centros_deportivos.centrodeportivo')),
            ],
            options={
                'verbose_name': 'Reporte',
                'verbose_name_plural': 'Reportes',
                'db_table': 'Reporte',
                'ordering': ['-fecha'],
            },
        ),
    ]
