import { useState, useEffect } from "react";
import { obtenerProducto } from "../api/productos.api";
import { borrarProductoCarrito } from "../api/carrito.api";

export default function CardProductoCarrito({ idProducto, carritoID }) {
  const [producto, setProducto] = useState({});
  const [cantidad, setCantidad] = useState(1);
  const [totalProductos, settotalProductos] = useState(0);

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
    await borrarProductoCarrito(carritoID, idProducto);
    window.location.reload();
  };

  return producto ? (
    <>
      <div className="rounded-2xl w-full h-2 bg-gradient-to-r from-[#6A61D9] via-[#824EA3] to-[#F46ED8]" />
      <div className="flex flex-col gap-y-2 rounded-lg shadow-lg md:flex-row justify-center gap-x-[5%] p-4 text-clr-two relative">
        <button
          className="absolute top-0 translate-y-[-50%] left-0 translate-x-[-50%]  "
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
        <div className="flex flex-col items-center justify-center md:flex-row  gap-x-[5%] text-center">
          <img className="p-1 w-[10rem] h-auto " src={producto.imagen} />
          <p className="self-center  text-base font-bold">{producto.nombre}</p>
        </div>

        <p className="self-center  text-lg font-bold">
          {`$${producto.oferta || producto.precio}`}
        </p>
        <div className="self-center flex justify-center items-center gap-x-2">
          <Button
            signo="-"
            handleClick={() => {
              if (cantidad > 1) {
                setCantidad(cantidad - 1);
              }
            }}
          />
          <p>{cantidad}</p>
          <Button
            signo="+"
            handleClick={() => {
              if (cantidad < producto.cantidad) {
                setCantidad(cantidad + 1);
              }
            }}
          />
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
