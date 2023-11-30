import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EMUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/usuarios/");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    obtenerUsuarios();
  }, []);

  const handleEliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/usuarios/${id}/`);
      setUsuarios((usuarios) =>
        usuarios.filter((usuario) => usuario.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mt-4 ml-4">
        <Link to="/registro">
          <button className="bg-clr-three text-white p-1 rounded-md mr-2 mb-6 ">
            Agregar +
          </button>
        </Link>

        <div className="bg-gray-300 rounded-xl py-6">
          <table className="ml-4 mr-4">
            <thead className="bg-clr-one text-white">
              <tr>
                <th className="text-start rounded">First Name</th>
                <th className="text-start rounded">Last Name</th>
                <th className="text-start rounded">Username</th>
                <th className="text-start rounded">Email</th>
                <th className="text-start rounded">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.first_name}</td>
                  <td>{usuario.last_name}</td>
                  <td>{usuario.username}</td>
                  <td>{usuario.email}</td>
                  <td className="flex items-center py-2">
                    <button
                      onClick={() => handleEliminarUsuario(usuario.id)}
                      className="bg-clr-three text-white p-1 rounded-md mr-2 "
                    >
                      Eliminar
                    </button>
                    <Link to={`/modificar/${usuario.id}`}>
                      <button className="bg-clr-three text-white p-1 rounded-md mr-2">
                        Modificar
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EMUsuarios;
