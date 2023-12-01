import { useState, useEffect } from "react";
import Card from "./Card";
import { obtenerProductosTipo } from "../api/productos.api";
import { obtenerTipoProducto } from "../api/tipos_producto.api";
import { agregarProductoCarrito } from "../api/carrito.api";
import { useNavigate } from "react-router-dom";
import { agregarFavoritosUsuario } from "../api/usuarios";

function Button({ signo, handleClick }) {
  return (
    <button className="bg-clr-three px-3 rounded-lg " onClick={handleClick}>
      {signo}
    </button>
  );
}

export default function InfoProduct({ producto }) {
  const [cantidad, setCantidad] = useState(0);
  const [productosRelacionados, setProductosRelacionados] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarProductosRelacionados() {
      // obtiene el tipo de producto correspondiente, esto para luego mostrar los productos con el mismo tipo
      const tipoProductoRes = await obtenerTipoProducto(producto.tipoProducto);

      if (tipoProductoRes && tipoProductoRes.data) {
        const productosRelacionadosRes = await obtenerProductosTipo(
          tipoProductoRes.data.tipoProducto,
          10
        );
        setProductosRelacionados(productosRelacionadosRes.data.results);
      }
    }

    cargarProductosRelacionados();
  }, []);

  const handleClickAgregarCarrito = async () => {
    let token = localStorage.getItem("tokenUser");
    if (token) {
      try {
        const response = await agregarProductoCarrito(token, producto.id);
        if (response.data) {
          alert("Producto agregado correctamente");
          navigate("/carrito");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/user");
    }
  };

  const handleClickAgregarFavorito = async () => {
    let token = localStorage.getItem("tokenUser");
    if (token) {
      try {
        const response = await agregarFavoritosUsuario(token, producto.id);
        if (response.data) {
          alert("Agregado a lista de favoritos correctamente");
          navigate("/favoritos");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="flex justify-center items-center  py-32">
      {producto ? (
        <article className="bg-clr-one text-[#FFFFFF] w-[80vw]  pt-4 pb-12 px-10 md:pt-12">
          <section className="flex flex-col md:flex-row justify-evenly gap-y-10 md:gap-x-12 items-center">
            <img
              className="w-[60%] md:w-[40%] self-center drop-shadow-3xl "
              src={producto.imagen}
              alt={producto.nombre}
            />
            <div className="flex flex-col  gap-y-6  text-center md:text-right">
              <h2 className="text-2xl font-bold uppercase">
                {producto.nombre}
              </h2>
              <h3 className="text-2xl font-bold">
                ${producto.precio.toLocaleString()}
              </h3>
              <p className="text-center md:text-right ">
                &ldquo;{producto.detalles}&rdquo;
              </p>
              <p className="font-semibold">{producto.cantidad} disponibles</p>
              <div className="flex justify-end gap-x-5">
                <button
                  className="bg-clr-three self-center md:self-end  w-fit px-6 py-1 rounded-lg hover:bg-[#F056D0] "
                  onClick={handleClickAgregarFavorito}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
                <button
                  className="bg-clr-three self-center md:self-end  w-fit px-6 py-1 rounded-lg hover:bg-[#F056D0]"
                  onClick={handleClickAgregarCarrito}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-shopping-cart-plus w-6 h-6 "
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M12.5 17h-6.5v-14h-2" />
                    <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
          <hr className="my-8" />
          <section className="text-center md:text-left">
            <h2 className="font-bold text-2xl mb-4">Características </h2>
            <p className="text-justify">{producto.caracteristicas}</p>
          </section>
          <hr className="my-8" />
          <section className="text-center md:text-left">
            <h2 className="font-bold text-2xl mb-4">Productos relaciones </h2>
            <div className="pb-6 flex  overflow-x-auto gap-6">
              {productosRelacionados &&
                productosRelacionados.map((producto) => (
                  <Card key={producto.id} infoCard={true} item={producto} />
                ))}
            </div>
          </section>
        </article>
      ) : (
        <article>
          <h2>No se encontro el producto</h2>
        </article>
      )}
    </div>
  );
}
