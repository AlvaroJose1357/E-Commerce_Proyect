import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ModificarU = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleModificarUsuario = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/usuarios/${params.id}/`,
        user
      );
      navigate("/registro5");
      console.log("Usuario modificado:", response.data);
    } catch (error) {
      console.error("Error al modificar usuario:", error.response.data);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInput = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/usuarios/${params.id}/`
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    obtenerUsuario();
  }, [params.id]);

  console.log(user);

  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-y-10 md:gap-x-12 items-center">
      <div className="bg-clr-one text-[#8D8A8A] w-full md:w-[40vw] h-full md:h-[80vh] pt-4 pb-8 px-6 md:pt-8 mt-4 mb-4">
        <div className="flex items-center justify-center h-full">
          <form
            onSubmit={handleModificarUsuario}
            className="flex flex-col w-full md:w-[30vw] h-full md:h-[70vh] bg-white items-center"
          >
            <h1 className="text-clr-two font-bold text-3xl text-center pt-14">
              ¡Modifica el usuario previamente registrado!
            </h1>{" "}
            <br />
            <label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={user.first_name}
                onChange={handleInput}
                placeholder="Nombre"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={user.last_name}
                onChange={handleInput}
                placeholder="Apellido"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="text"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Correo electrónico"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-4"
              />
            </label>
            <label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Contraseña"
                className="bg-[#DCDCDC] p-2 focus:outline-none mb-6"
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

export default ModificarU;
