import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ModificarProd = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    oferta: null,
    cantidad: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleModificarProducto = async (event) => {
    event.preventDefault();

    try {
      console.log("Datos a enviar:", producto);
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/productos/${params.id}/`,
        producto
      );
      navigate("/registro7");
      console.log("Producto modificado:", response.data);
    } catch (error) {
      console.error("Error al modificar el producto:", error.response.data);
    }
  };

  const handleInput = (event) => {
    setProducto({
      ...producto,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/productos/${params.id}/`
        );
        delete response.data.imagen;
        console.log(response.data);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    obtenerProducto();
  }, [params.id]);

  console.log(producto);

  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-y-10 md:gap-x-12 items-center">
      <div className="bg-clr-one text-[#8D8A8A] w-full md:w-[40vw] h-full md:h-[80vh] pt-4 pb-8 px-6 md:pt-8 mt-4 mb-4">
        <div className="flex items-center justify-center h-full">
          <form
            onSubmit={handleModificarProducto}
            className="flex flex-col w-full md:w-[30vw] h-full md:h-[70vh] bg-white items-center"
            encType="multipart/form-data"
          >
            <h1 className="text-clr-two font-bold text-3xl text-center pt-14">
              ¡Modifica el producto registrado previamente!
            </h1>{" "}
            <br />
            <label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={producto.nombre}
                onChange={handleInput}
                placeholder="Nombre del producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={producto.precio}
                onChange={handleInput}
                placeholder="Precio del producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="text"
                id="oferta"
                name="oferta"
                value={producto.oferta}
                onChange={handleInput}
                placeholder="Oferta del producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={producto.cantidad}
                onChange={handleInput}
                placeholder="Cantidad disponible"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <button
              type="submit"
              className="bg-clr-three text-white p-1 rounded-md mr-2"
            >
              Modificar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModificarProd;
