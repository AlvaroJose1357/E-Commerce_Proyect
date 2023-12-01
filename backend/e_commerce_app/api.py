from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from . import models
from . import serializers
import mercadopago


class TipoProductoViewSet(viewsets.ModelViewSet):
    queryset = models.TipoProducto.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.TipoProductoSerializer


class CarritoViewSet(viewsets.ModelViewSet):
    queryset = models.Carrito.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.CarritoSerializer

    def get_queryset(self):
        queryset = models.Carrito.objects.all()
        productos = self.request.query_params.get("productos")

        if productos is not None:
            key = self.request.headers.get("Authorization")
            userId = Token.objects.get(key=key).user_id
            queryset = queryset.filter(usuario=userId, finalizado=False)

        return queryset

    @action(detail=True, methods=["delete"])
    def eliminar_producto(self, request, pk=None):
        carrito = self.get_object()
        producto_id = request.query_params.get("producto_id")

        if producto_id:
            try:
                carrito.productos.remove(producto_id)
                print("entro")
                return Response(
                    {"message": "Producto eliminado del carrito correctamente."},
                    status=204,
                )
            except Exception as e:
                return Response({"error": str(e)}, status=400)
        else:
            return Response({"error": "ID del producto no proporcionado."}, status=400)

    @action(detail=False, methods=["post"])
    def agregar_producto(self, request, pk=None):
        key = self.request.headers.get("Authorization")
        producto_id = request.query_params.get("producto_id")
        try:
            producto = models.Producto.objects.get(pk=producto_id)
        except models.Producto.DoesNotExist:
            return Response({"error": "El producto no existe."}, status=400)

        if key:
            userID = Token.objects.get(key=key).user_id
            try:
                carrito = models.Carrito.objects.get(
                    usuario_id=userID, finalizado=False
                )
                carrito.productos.add(producto)
                return Response(
                    {"message": "Producto agregado al carrito correctamente."},
                    status=201,
                )
            except models.Carrito.DoesNotExist:
                carritoNuevo = models.Carrito.objects.create(usuario_id=userID)
                models.Producto.objects.get(pk=producto_id)
                carritoNuevo.productos.add(producto)
                return Response(
                    {"message": "Producto agregado al carrito correctamente."},
                    status=201,
                )
        else:
            return Response({"error": "No autorizado"}, status=400)


class ProductoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.ProductoSerializer
    queryset = models.Producto.objects.all()

    # Se modifica la siguiente funcion, esto para personalizar las respuestas a la hora de hacer una consulta
    def get_queryset(self):
        queryset = models.Producto.objects.all()
        # pageSize almacena un argumento que viene desde la url y servira para definir cuantos registros se devolveran como respuesta
        pageSize = self.request.query_params.get("page-size")
        if pageSize is not None and pageSize != "0":
            # el atributo pagination_class por defecto viene vacio, pero en este caso se le define una clase para manejar la paginacion
            self.pagination_class = PageNumberPagination
            self.pagination_class.page_size = pageSize
        tipoProducto = self.request.query_params.get("tipo-producto")
        id = self.request.query_params.get("id")
        params = {
            "marca__icontains": self.request.query_params.get("marca"),
            "tipoProducto_id": models.TipoProducto.objects.get(
                tipoProducto=tipoProducto
            ).id
            if tipoProducto is not None
            else None,
            "oferta__gt": self.request.query_params.get("oferta"),
            "carrito__user": self.request.query_params.get("usuario"),
        }
        paramsValue = {}

        for clave, valor in params.items():
            if params[clave] is not None:
                paramsValue[clave] = valor

        if paramsValue:
            queryset = (
                queryset.filter(**paramsValue).exclude(id=id)
                if id is not None
                else queryset.filter(**paramsValue)
            )

        return queryset


class RolViewSet(viewsets.ModelViewSet):
    queryset = models.Rol.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.RolSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.UsuarioSerializer

    def get_queryset(self):
        queryset = models.User.objects.all()
        favoritos = self.request.query_params.get("favoritos")

        if favoritos is not None:
            key = self.request.headers.get("Authorization")
            userId = Token.objects.get(key=key).user_id
            queryset = queryset.filter(pk=userId)
        return queryset

    def create(self, request, *args, **kwargs):
        password = request.data.get("password")
        hashed_password = make_password(password)
        request.data["password"] = hashed_password
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(request.data)
        self.perform_create(serializer)
        user = serializer.instance

        # Generar o recuperar el token asociado al usuario
        token = Token.objects.create(user=user)

        headers = self.get_success_headers(serializer.data)
        return Response(
            {"token": token.key},  # Devuelve el token al cliente
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    @action(detail=False, methods=["post"])
    def agregar_producto(self, request, pk=None):
        key = self.request.headers.get("Authorization")
        producto_id = request.query_params.get("producto_id")
        try:
            producto = models.Producto.objects.get(pk=producto_id)
        except models.Producto.DoesNotExist:
            return Response({"error": "El producto no existe."}, status=400)

        if key:
            userID = Token.objects.get(key=key).user_id
            usuario = models.User.objects.get(pk=userID)
            usuario.favoritos.add(producto)
            return Response(
                {"message": "Producto agregado al usuario correctamente."},
                status=201,
            )
        else:
            return Response({"error": "No autorizado"}, status=400)

    @action(detail=True, methods=["delete"])
    def eliminar_producto(self, request, pk=None):
        usuario = self.get_object()
        producto_id = request.query_params.get("producto_id")

        if producto_id:
            try:
                usuario.favoritos.remove(producto_id)
                return Response(
                    {"message": "Producto eliminado del usuario correctamente."},
                    status=204,
                )
            except Exception as e:
                return Response({"error": str(e)}, status=400)
        else:
            return Response({"error": "ID del producto no proporcionado."}, status=400)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        print(password, email)
        user = authenticate(request, email=email, password=password)
        print(user)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    def post(self, request):
        try:
            # Obtener el token del encabezado de autorización
            token_key = request.headers.get("Authorization")
            token = Token.objects.get(key=token_key)
            token.delete()
            return Response(
                {"message": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK
            )
        except Token.DoesNotExist:
            return Response(
                {"error": "Token inválido"}, status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class MetodoPagoViewSet(viewsets.ModelViewSet):
    queryset = models.MetodoPago.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.MetodoPagoSerializer


class VentaViewSet(viewsets.ModelViewSet):
    queryset = models.Venta.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.VentaSerializer


class PaymentView(APIView):
    def post(
        self, request
    ):  # aqui se manejan las sollicitudes HTTP POS a la ruta de pago
        # se integra con  la instacia la llave de acceso que nos da la pagina
        sdk = mercadopago.SDK(
            "TEST-416579947128865-112820-0118d8a35783cd83ababcb2e9ee7838c-1570676804"
        )
        
        # se crea una lista vacia para almacenar los productos que se van a comprar
        # items = []        
        # # Obtener los productos enviados desde el front
        # for x in request.data.get("productos", None ):
        #     items.append(
        #         {
        #             "title": x.get("nombre"),
        #             "unit_price": x.get("precio"),
        #             "currency_id": "COP",
        #             "quantity": x.get("cantidad", 1), 
        #         }
        #     )
        # # se almacena la informacion de la compra
        # preference_data = {"items": items}
        #informacion sobre los productos
        preference_data = {
            "items": [
                {
                    "title": "Portátil HP 15-dw3505la",
                    "unit_price": 5000,
                    "currency_id": "COP",
                    "quantity": 1,
                },
                {
                    "title": "Portátil HP 15-dw3505la",
                    "unit_price": 20000,
                    "currency_id": "COP",
                    "quantity": 1,
                },
                
            ]
        }
        # se almacena la respuesta, se imprime y se devuelve al cliente con una respuesta HTTP_200_OK
        preference_response = sdk.preference().create(preference_data)
        preference = preference_response["response"]
        print(preference)
        return Response(
            preference, status=status.HTTP_200_OK
        )  # HTTP_200_OK signifca que esta bieeen
