# Generated by Django 4.2.5 on 2023-11-14 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce_app', '0006_user_direccion_user_telefonouser'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='marca',
            field=models.CharField(default='universal', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=models.ImageField(blank=True, max_length=255, null=True, upload_to='productos/img'),
        ),
    ]
