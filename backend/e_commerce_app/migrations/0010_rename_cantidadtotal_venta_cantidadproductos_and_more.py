# Generated by Django 4.2.5 on 2023-11-24 17:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce_app', '0009_producto_oferta'),
    ]

    operations = [
        migrations.RenameField(
            model_name='venta',
            old_name='cantidadTotal',
            new_name='cantidadProductos',
        ),
        migrations.RemoveField(
            model_name='venta',
            name='producto',
        ),
        migrations.CreateModel(
            name='Carrito',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(auto_now_add=True)),
                ('finalizado', models.BooleanField(default=False)),
                ('productos', models.ManyToManyField(to='e_commerce_app.producto')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='venta',
            name='carrito',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='e_commerce_app.carrito'),
            preserve_default=False,
        ),
    ]