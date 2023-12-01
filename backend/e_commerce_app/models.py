from django.db import models
from django.contrib.auth.models import AbstractUser
import os


class Rol(models.Model):
    tipoDeUsuario = models.CharField(max_length=100)

    def __str__(self):
        return self.tipoDeUsuario


class TipoProducto(models.Model):
    tipoProducto = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)

    def __str__(self):
        return self.tipoProducto


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    detalles = models.CharField(max_length=300)
    caracteristicas = models.TextField(max_length=500)
    precio = models.IntegerField()
    oferta = models.IntegerField(null=True)
    cantidad = models.IntegerField()
    imagen = models.ImageField(
        upload_to="productos/img", max_length=255, null=True, blank=True
    )
    tipoProducto = models.ForeignKey(TipoProducto, on_delete=models.CASCADE)

    def delete(self, *args, **kwargs):
        if self.imagen != "":
            if os.path.isfile(self.imagen.path):
                os.remove(self.imagen.path)
        super(Producto, self).delete(*args, **kwargs)

    def __str__(self):
        return self.nombre


class User(AbstractUser):
    telefonoUser = models.CharField(max_length=100)
    direccion = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=151, unique=True)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, null=True)
    favoritos = models.ManyToManyField(Producto, blank=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password"]

    def __str__(self):
        return self.first_name + "" + self.last_name or ""


class MetodoPago(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre + " " + self.descripcion


class Carrito(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    productos = models.ManyToManyField(Producto)
    finalizado = models.BooleanField(default=False)

    def __str__(self):
        return self.usuario.username + " " + self.finalizado


class Venta(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    cantidadProductos = models.IntegerField()
    fecha = models.DateField()
    direccionEntrega = models.CharField(max_length=100)
    precioTotal = models.IntegerField()
    metodoPago = models.ForeignKey(MetodoPago, on_delete=models.CASCADE)

    def __str__(self):
        return (
            self.usuario.username
            + " "
            + self.cantidadProductos
            + " "
            + self.fecha
            + ""
            + self.metodoPago.nombre
            + " "
            + self.precioTotal
        )
