import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistroTP = () => {
  const [tipoProducto, setTipoProducto] = useState({
    tipoProducto: "",
    descripcion: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setTipoProducto({
      ...tipoProducto,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tipo-productos/",
        tipoProducto
      );
      if (response.data) {
        console.log("Tipo de producto registrado:", response.data);
        navigate("/registros6");
      }
    } catch (error) {
      console.error("Error al registrar el tipo:", error.response.data);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-y-10 md:gap-x-12 items-center">
      <div className="bg-clr-one text-[#8D8A8A] w-full md:w-[40vw] h-full md:h-[80vh] pt-4 pb-8 px-6 md:pt-8 mt-4 mb-4">
        <div className="flex items-center justify-center h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full md:w-[30vw] h-full md:h-[70vh] bg-white items-center"
          >
            <h1 className="text-clr-two font-bold text-3xl text-center pt-14 mb-12">
              ¡Registra el tipo de producto!
            </h1>{" "}
            <label>
              <input
                type="text"
                id="tipoProducto"
                name="tipoProducto"
                onChange={handleInput}
                placeholder="Tipo de producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-6"
              />
            </label>
            <label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                onChange={handleInput}
                placeholder="Descripcion"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-12"
              />
            </label>
            <div className="flex">
              <button
                type="submit"
                className="bg-clr-three text-white p-1 rounded-md mr-2"
              >
                Registrar
              </button>
              <button className="bg-clr-three text-white p-1 rounded-md mr-2">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroTP;
