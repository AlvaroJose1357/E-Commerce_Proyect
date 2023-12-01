import { useState, useEffect } from "react";
import { obtenerProducto } from "../api/productos.api";
import { borrarProductoCarrito } from "../api/carrito.api";
import { Link } from "react-router-dom";
import { borrarFavoritoUsuario } from "../api/usuarios";

export default function CardProductoFavorito({ idProducto, usuarioID }) {
  const [producto, setProducto] = useState({});

  useEffect(() => {
    async function cargarProducto() {
      const response = await obtenerProducto(idProducto);
      if (response.data) {
        setProducto(response.data);
      }
    }
    cargarProducto();
  }, [idProducto]);

  const handleClickEliminar = async () => {
    await borrarFavoritoUsuario(usuarioID, idProducto);
    window.location.reload();
  };

  return producto ? (
    <>
      <div className="border relative flex flex-col md:flex-row justify-between items-center rounded-md max-w-[50rem]  py-8 gap-x-10 w-[80%] md:w-full gap-y-4 px-12">
        <div className="absolute top-0 left-0 h-2 rounded-full w-full bg-gradient-to-l from-violet-700 to-pink-700" />
        <button
          className="absolute top-0 translate-y-[-50%] left-0 translate-x-[-50%]  rounded-full bg-pink-700"
          onClick={handleClickEliminar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <div className="">
          <img src={producto.imagen} alt="" className="max-w-[15rem]" />
        </div>
        <div className="">
          <Link to={`/producto/${producto.id}`}>
            <h3 className="text-violet-700 text-lg font-bold text-center md:text-left mb-5">
              {producto.nombre}
            </h3>
          </Link>
          <p className="text-sm text-justify">{producto.detalles}</p>
        </div>

        <div className="px-4 flex gap-2 shrink-0">
          <p className="text-violet-700 font-medium text-lg">
            {`$${
              producto.precio
                ? producto.precio.toLocaleString()
                : producto.precio
            }`}
          </p>
        </div>
      </div>
    </>
  ) : (
    <h2>Cargando...</h2>
  );
}

function Button({ signo, handleClick }) {
  return (
    <button
      className="bg-clr-two text-white px-3 rounded-lg "
      onClick={handleClick}
    >
      {signo}
    </button>
  );
}
