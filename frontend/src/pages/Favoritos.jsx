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
    <section className="py-16 px-8">
      <div className="border max-w-xl mx-auto text-center p-4 flex flex-col rounded-md">
        <p className="text-violet-700 text-2xl font-medium">
          No tienes ningun articulo
        </p>

        <div className="h-8" />

        <div className="flex gap-8">
          <FaRegHeart className="text-7xl text-violet-700 flex-shrink-0" />

          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed natus
            quam adipisci maiores dolorem culpa vero! Quibusdam fugiat illum rem
            est reiciendis natus error possimus eveniet beatae voluptatibus.
          </p>
        </div>

        <div className="h-8" />

        <Link
          to={"/"}
          className="ml-auto bg-violet-700 text-white px-2 py-1 rounded-md flex items-center gap-1 font-medium"
        >
          Añadir a favoritos <FaPlus />
        </Link>
      </div>
    </section>
  );
}
