import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import Destacado from "../components/Navbar/Destacado";
import { cerrarUsuario } from "../api/usuarios";

export default function Header() {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showUsergroupOptions, setShowUsergroupOptions] = useState(false);

  const navigate = useNavigate();

  function handleClick(option) {
    setShowProfileOptions(false);
    setShowUsergroupOptions(false);

    if (option === "profile") {
      setShowProfileOptions(!showProfileOptions);
    } else if (option === "usergroup") {
      setShowUsergroupOptions(!showUsergroupOptions);
    }
  }

  const cerrarSesion = async () => {
    const token = localStorage.getItem("tokenUser");
    try {
      const response = await cerrarUsuario(token);
      alert(response.data.message);
      if (response.data) {
        localStorage.removeItem("tokenUser");
        navigate("/");
      }
    } catch (error) {
      alert("Error al cerrar sesion");
    }
  };

  return (
    <header>
      <section className="flex justify-end gap-x-4 py-2 px-5">
        <Link to="/">
          <Destacado />
        </Link>
        <p className="border-l-2 border-black"></p>
        <button onClick={() => handleClick("usergroup")} className="relative">
          <AiOutlineUsergroupAdd className="w-7 h-7"></AiOutlineUsergroupAdd>
          <div
            className={`${showUsergroupOptions ? "flex" : "hidden"} 
            absolute right-0 z-10 bg-clr-one border-2 border-black flex-col py-4 mt-2 text-center   font-medium rounded-md whitespace-nowrap `}
          >
            <div className="absolute top-[-12px] right-[6px] w-0 h-0  border-l-[8px] border-r-[8px] border-b-[12px] border-transparent  border-b-black"></div>
            <Link
              to={"/registro5"}
              className="px-6 py-2 hover:bg-black/25 transition-colors duration-200 ease-in-out"
            >
              Usuarios
            </Link>
            <Link
              to={"/registro6"}
              className="px-6 py-2 hover:bg-black/25 transition-colors duration-200 ease-in-out"
            >
              Tipo producto
            </Link>
            <Link
              to={"/registro7"}
              className="px-6 py-2 hover:bg-black/25 transition-colors duration-200 ease-in-out"
            >
              Producto
            </Link>
            <Link
              to={"/registro8"}
              className="px-6 py-2 hover:bg-black/25 transition-colors duration-200 ease-in-out"
            >
              Metodo Pago
            </Link>
          </div>
        </button>
        <p className="border-l-2 border-black"></p>
        <Link to="favoritos">
          <AiFillHeart className="w-7 h-7 my-2"></AiFillHeart>
        </Link>
        <p className="border-l-2 border-black"></p>
        <Link to="carrito">
          <AiOutlineShoppingCart className="w-7 h-7 my-2"></AiOutlineShoppingCart>
        </Link>
        <p className="border-l-2 border-black"></p>
        <button onClick={() => handleClick("profile")} className="relative">
          <BsFillPersonFill className="w-7 h-7"></BsFillPersonFill>
          <div
            className={`${showProfileOptions ? "flex" : "hidden"} 
            absolute right-0 z-10 bg-clr-one border-2 border-black flex-col py-4 mt-2 text-center   font-medium rounded-md whitespace-nowrap `}
          >
            <div className="absolute top-[-12px] right-[6px] w-0 h-0  border-l-[8px] border-r-[8px] border-b-[12px] border-transparent  border-b-black"></div>
            <Link
            //to={"/iniciar sesion"}
            //className="px-6 py-2 w-full hover:bg-black/25 transition-colors duration-200 ease-in-out"
            ></Link>
            {localStorage.getItem("tokenUser") && (
              <button
                className="px-6 py-2 hover:bg-black/25 transition-colors duration-200 ease-in-out"
                onClick={cerrarSesion}
              >
                Cerrar Sesion
              </button>
            )}

            {!localStorage.getItem("tokenUser") && (
              <Link
                to={"/user"}
                className="px-6 py-2 hover:bg-black/25 transition-colors duration-200 ease-in-out"
              >
                Acceder
              </Link>
            )}
          </div>
          <div></div>
        </button>
      </section>
      <Navbar />
    </header>
  );
}

// import { NavLink, Link } from "react-router-dom";
// import { FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";
//hasta aqui es provicional

// <header className="px-8 py-4 bg-gradient-to-l to-violet-700 from-pink-700 text-white">
//   <div className="flex items-center">
//     <Link to="/">Logo</Link>

//     <div className="w-8" />

//     <nav className="font-medium">
//       <NavLink to={"/"} className="hover:underline">
//         Inicio
//       </NavLink>
//     </nav>

//     <div className="mx-auto relative items-center hidden md:flex">
//       <input
//         type="text"
//         placeholder="Buscar"
//         className="rounded-full px-2 py-1"
//       />

//       <FaMagnifyingGlass className="absolute right-2 text-black opacity-50" />
//     </div>

//     <div className="flex-grow md:hidden" />

//     <Link to={"/carrito"} className="text-2xl hover:opacity-90">
//       <FaCartShopping />
//     </Link>

//     <div className="w-4" />

//     <div className="flex justify-center relative">
//       <button
//         onClick={handleClick}
//         className="w-10 h-10 rounded-full bg-white"
//       ></button>

//       <div
//         className={`absolute ${
//           showProfileOptions ? "flex" : "hidden"
//         } z-10 text-center bg-gradient-to-br to-violet-700 from-pink-700 flex-col font-medium rounded-md -bottom-32 overflow-hidden`}
//       >
//         <Link
//           to={"/favoritos"}
//           className="px-4 py-2 hover:bg-black/25 transition-colors duration-200 ease-in-out"
//         >
//           Favoritos
//         </Link>
//         <Link
//           to={"/User"}
//           className="px-4 py-2 hover:bg-black/25 transition-colors duration-200 ease-in-out"
//         >
//           Perfil
//         </Link>
//         <button className="px-4 py-2 hover:bg-black/25 transition-colors duration-200 ease-in-out">
//           Salir
//         </button>
//       </div>
//     </div>
//   </div>
// </header>
