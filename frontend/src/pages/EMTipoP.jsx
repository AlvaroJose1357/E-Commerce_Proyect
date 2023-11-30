import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EMTipoP = () => {
  const [tipoProducto, setTipoProducto] = useState([]);

  useEffect(() => {
    const obtenerTipoProducto = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/tipo-productos/"
        );
        setTipoProducto(response.data);
      } catch (error) {
        console.error("Error al obtener tipo de producto:", error);
      }
    };
    obtenerTipoProducto();
  }, []);

  const handleEliminarTipoProducto = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tipo-productos/${id}/`);
      setTipoProducto((tipoProducto) =>
        tipoProducto.filter((tipoProducto) => tipoProducto.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar tipo de producto:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mt-4 ml-4">
        <Link to="/registro2">
          <button className="bg-clr-three text-white p-1 rounded-md mr-2 mb-6 ">
            Agregar +
          </button>
        </Link>

        <div className="bg-gray-300 rounded-xl py-6">
          <table className="ml-4 mr-4">
            <thead className="bg-clr-one text-white">
              <tr>
                <th className="text-start rounded">Tipo de Producto</th>
                <th className="text-start rounded">Descripcion</th>
                <th className="text-start rounded">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tipoProducto.map((tipoProducto) => (
                <tr key={tipoProducto.id}>
                  <td>{tipoProducto.tipoProducto}</td>
                  <td>{tipoProducto.descripcion}</td>
                  <td className="flex items-center py-2">
                    <button
                      onClick={() =>
                        handleEliminarTipoProducto(tipoProducto.id)
                      }
                      className="bg-clr-three text-white p-1 rounded-md mr-2"
                    >
                      Eliminar
                    </button>
                    <Link to={`/modificar1/${tipoProducto.id}`}>
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

export default EMTipoP;
