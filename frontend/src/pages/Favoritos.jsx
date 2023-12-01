import { FaRegHeart, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { obtenerFavoritosUsuario } from "../api/usuarios";
import CardProductoFavorito from "../components/CardProductoFavoritos";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [usuarioID, setUsuarioID] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("tokenUser");
    async function cargarFavoritos() {
      try {
        const response = await obtenerFavoritosUsuario(token);
        setFavoritos(response.data[0].favoritos);
        setUsuarioID(response.data[0].id);
      } catch (error) {
        console.log(error);
      }
    }
    cargarFavoritos();
  }, []);

  return favoritos.length > 0 ? (
    <section className="min-h-[30rem] py-12 flex flex-col justify-center items-center px-4">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br group from-clr-one via-clr-two to-clr-three mb-10">
        Tus favoritos
      </h2>

      <div className="flex flex-col items-center gap-y-16">
        {favoritos.map((productoID) => (
          <CardProductoFavorito
            key={productoID}
            usuarioID={usuarioID}
            idProducto={productoID}
          ></CardProductoFavorito>
        ))}
      </div>
    </section>
  ) : (
    <section className="py-16 px-8 min-h-[80vh] flex justify-center items-center">
      <div className="  flex flex-col md:flex-row gap-x-6 w-[85%] md:w-[70%] lg:w-[60%] h-min items-center justify-center px-16 py-8 rounded-lg shadow-lg">
        <FaRegHeart className="text-9xl text-violet-700 flex-shrink-0 hover:scale-110 transition duration-300 ease-out" />
        <div className=" flex flex-col gap-y-[0.2rem] text-center">
          <h3 className="bg-clip-text text-transparent bg-gradient-to-br group from-clr-one via-clr-two to-clr-three text-2xl md:text-3xl font-bold text-[#6A61D9] px-3 py-3">
            No tienes ningun articulo
          </h3>

          <p className="px-3 py-5 pb-10 text-sm md:text-base ">
            En este momento no tienes ningún artículo en favoritos, cuando
            agregues o quieras recordar un artículo de tu interés, aparecerá
            aquí.
          </p>

          <Link
            to={"/"}
            className=" flex justify-center items-center gap-x-2 self-center md:self-end px-2 md:px-3 py-1.5 rounded-lg text-white bg-clr-two hover:bg-gradient-to-br group from-clr-one via-clr-two to-clr-three font-semibold w-fit"
          >
            Añadir a favoritos <FaPlus />
          </Link>
        </div>
      </div>
    </section>
  );
}
