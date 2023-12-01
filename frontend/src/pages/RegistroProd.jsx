import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegistroProd = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    marca: "",
    detalles: "",
    caracteristicas: "",
    precio: "",
    oferta: null,
    cantidad: "",
    imagen: null,
    tipoProducto: "",
  });
  const [image, setImagen] = useState("");
  const navigate = useNavigate();

  const handleInput = (event) => {
    setProducto({ ...producto, [event.target.name]: event.target.value });
  };

  const isDisabled = true;

  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  function handleImage(e) {
    console.log(e.target.files);
    setImagen(e.target.files[0]);
  }

  function handleApi() {
    const producto = new producto();
    producto.append("image", image);
    axios.post("url", producto).then((res) => {
      console.log(res);
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/productos/",
        producto
      );
      if (response.data) {
        navigate("/registro7");
      }
    } catch (error) {
      console.error("Error al registrar producto:", error.response.data);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-y-10 md:gap-x-12 items-center">
      <div className="bg-clr-one text-[#8D8A8A] w-full md:w-[40vw] h-full md:h-[120vh] pt-4 pb-8 px-6 md:pt-8 mt-4 mb-4">
        <div className="flex items-center justify-center h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full md:w-[30vw] h-full md:h-[110vh] bg-white items-center"
          >
            <h1 className="text-clr-two font-bold text-3xl text-center pt-6">
              ¡Registra tu producto!
            </h1>{" "}
            <br />
            <label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                onChange={handleInput}
                placeholder="Nombre del producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="text"
                id="marca"
                name="marca"
                onChange={handleInput}
                placeholder="Marca"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="text"
                id="detalles"
                name="detalles"
                onChange={handleInput}
                placeholder="Detalles del producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="text"
                id="caracteristicas"
                name="caracteristicas"
                onChange={handleInput}
                placeholder="Características del producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="number"
                id="precio"
                name="precio"
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
                disabled={isDisabled}
                placeholder="Oferta del producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                onChange={handleInput}
                placeholder="Cantidad disponible"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="number"
                id="tipoProducto"
                name="tipoProducto"
                onChange={handleInput}
                placeholder="Tipo de producto"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleImage}
                placeholder="Link de la imagen imagen"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
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

export default RegistroProd;
