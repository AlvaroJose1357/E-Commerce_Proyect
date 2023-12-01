import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ModificarMPago = () => {
  const [metodoPago, setMetodoPago] = useState({
    nombre: "",
    descripcion: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleModificarMPago = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/metodo-pago/${params.id}/`,
        metodoPago
      );
      navigate("/registro8");
      console.log("Método de pago modificado:", response.data);
    } catch (error) {
      console.error(
        "Error al modificar el método de pago:",
        error.response.data
      );
    }
  };

  const handleInput = (event) => {
    setMetodoPago({
      ...metodoPago,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const obtenerMetodoPago = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/metodo-pago/${params.id}/`
        );

        setMetodoPago(response.data);
      } catch (error) {
        console.error("Error al obtener el método de pago:", error);
      }
    };

    obtenerMetodoPago();
  }, [params.id]);

  console.log(metodoPago);

  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-y-10 md:gap-x-12 items-center">
      <div className="bg-clr-one text-[#8D8A8A] w-full md:w-[40vw] h-full md:h-[80vh] pt-4 pb-8 px-6 md:pt-8 mt-4 mb-4">
        <div className="flex items-center justify-center h-full">
          <form
            onSubmit={handleModificarMPago}
            className="flex flex-col w-full md:w-[30vw] h-full md:h-[70vh] bg-white items-center"
          >
            <h1 className="text-clr-two font-bold text-3xl text-center pt-14">
              ¡Modifica el método de pago registrado!
            </h1>{" "}
            <br />
            <label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={metodoPago.nombre}
                onChange={handleInput}
                placeholder="Tipo de producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={metodoPago.descripcion}
                onChange={handleInput}
                placeholder="Descripcion"
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

export default ModificarMPago;
