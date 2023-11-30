import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EMProd = () => {
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/productos/"
        );
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };
    obtenerProducto();
  }, []);

  const handleEliminarProducto = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/productos/${id}`);
      setProducto((producto) =>
        producto.filter((producto) => producto.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mt-4 ml-4 ">
        <Link to="/registro3">
          <button className="bg-clr-three text-white p-1 rounded-md mr-2 mb-6 ">
            Agregar +
          </button>
        </Link>

        <div
          style={{ overflowY: "auto", maxHeight: "400px" }}
          className="bg-gray-300 rounded-xl py-6"
        >
          <table className="ml-4 mr-4">
            <thead className="bg-clr-one text-white">
              <tr>
                <th className="text-start rounded">Nombre</th>
                <th className="text-start rounded">Precio</th>
                <th className="text-start rounded">Oferta</th>
                <th className="text-start rounded">Cantidad</th>
                <th className="text-start rounded">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {producto.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.oferta}</td>
                  <td>{producto.cantidad}</td>
                  <td className="flex items-center py-2">
                    <button
                      onClick={() => handleEliminarProducto(producto.id)}
                      className=" bg-clr-three text-white p-1 rounded-md mr-2 "
                    >
                      Eliminar
                    </button>
                    <Link to={`/modificar2/${producto.id}`}>
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

export default EMProd;
