import axios from "axios";

// Se crear una instancia de axios, esto para configurar la ruta a la cual le va hacer la peticion
const usuariosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/usuarios/",
});

export const obtenerUsuarios = () => usuariosApi.get("/");

export const crearUsuario = (usuario) => usuariosApi.post("/", usuario);

export const autenticarUsuario = (usuario) =>
  usuariosApi.post("/autenticacion/", usuario);

export const cerrarUsuario = (token) =>
  usuariosApi.post("/cerrar-sesion/", null, {
    headers: { Authorization: `${token}` },
  });

export const obtenerFavoritosUsuario = (token) =>
  usuariosApi.get("/?favoritos=true", {
    headers: { Authorization: `${token}` },
  });

export const borrarFavoritoUsuario = (usuarioID, productoID) =>
  usuariosApi.delete(
    `/${usuarioID}/eliminar_producto/?producto_id=${productoID}`
  );

export const agregarFavoritosUsuario = (token, productoID) =>
  usuariosApi.post(`/agregar_producto/?producto_id=${productoID}`, null, {
    headers: { Authorization: `${token}` },
  });
