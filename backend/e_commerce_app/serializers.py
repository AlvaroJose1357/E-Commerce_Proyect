from rest_framework import serializers
from . import models
from django.contrib.auth.models import User


class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TipoProducto
        fields = ("id", "tipoProducto", "descripcion")


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Producto
        fields = (
            "id",
            "nombre",
            "marca",
            "detalles",
            "caracteristicas",
            "precio",
            "oferta",
            "cantidad",
            "imagen",
            "tipoProducto",
        )


class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Carrito
        fields = "__all__"


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rol
        fields = ("id", "tipoDeUsuario")


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = (
            "id",
            "first_name",
            "last_name",
            "username",
            "direccion",
            "email",
            "password",
            "favoritos",
        )


class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MetodoPago
        fields = ("id", "nombre", "descripcion")


class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Venta
        fields = (
            "id",
            "usuario",
            "producto",
            "cantidadTotal",
            "direccionEntrega",
            "precioTotal",
            "metodoPago",
        )
        read_only_fields = ("fecha",)
