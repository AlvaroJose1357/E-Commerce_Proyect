import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductosCarrito } from "../api/carrito.api";
import CardProductoCarrito from "../components/CardProductoCarrito";
import axios from "axios";

{
  /*Metodo de pago*/
}
export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [carritoID, setCarritoID] = useState();
  const [paymentLink, setPaymentLink] = useState("");

  useEffect(() => {
    async function cargarProductosCarrito() {
      try {
        const response = await obtenerProductosCarrito(
          localStorage.getItem("tokenUser")
        );
        if (response.data.length > 0) {
          setCarrito(response.data[0].productos);
          setCarritoID(response.data[0].id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    cargarProductosCarrito();
  }, []);

  const handleRequest = async () => {
    const response = await axios.post("http://127.0.0.1:8000/payment");
    /*La función handleRequest realiza una solicitud HTTP POST a la URL utilizando la biblioteca Axios*/

    console.log(response);

    setPaymentLink(response.data.init_point);
  };
  /*aqui es para cuando  la solicitud HTTP se completa con éxito, la función handleRequest establece el valor de paymentLink con el valor de init_point obtenido en la respuesta del servidor */

  useEffect(() => {
    try {
      handleRequest();
    } catch (error) {
      console.log(error);
      /*pos por si sale algun error*/
    }
  }, []);
  /*useEffect se utiliza para llamar a la función handleRequest Esto permite que el pago se realice automáticamente*/

  return (
    <div className="font-sans flex flex-col items-center gap-y-10 py-8 ">
      {/* Encabezado de articulos */}
      {carrito.length > 0 ? (
        <section className="w-[90vw] flex flex-col md:flex-row justify-center gap-x-8 items-center justify-self-center">
          {/* <div className="flex items-center justify-center p-5 md:w-1/2"> */}
          <section className="w-[85%] md:w-[62%]  flex flex-col gap-y-3">
            <h1 className="p-3 text-2xl font-bold text-[#6A61D9] mt-4  text-center md:text-start">
              Carro {`(${carrito.length})`}
            </h1>
            {carrito.map((idProducto) => (
              <CardProductoCarrito
                key={idProducto}
                idProducto={idProducto}
                carritoID={carritoID}
              />
            ))}
          </section>

          {/*Resumen de compra*/}

          <section className="w-[75%] md:w-[30%] rounded-lg shadow-lg flex md:self-start justify-center p-5 my-16">
            <div className=" ">
              <div className="text-center">
                <h1 className="p-3 text-2xl font-bold text-[#6A61D9] mt-4">
                  Resumen de Compra
                </h1>
                <div className="rounded-2xl  h-2 bg-gradient-to-r from-[#6A61D9] via-[#824EA3] to-[#F46ED8]"></div>
              </div>

              <div className="mt-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[#824EA3] text-sm font-bold ">
                      <b>Productos (0)</b>
                    </p>
                    <p className="text-[#824EA3] text-sm font-semibold">
                      <b>Total:</b>
                    </p>
                  </div>

                  <p className=" text-right text-[#824EA3] font-medium">
                    <b>$0</b>
                  </p>
                </div>
              </div>

              <Link
                to={"/"}
                className="w-full text-white py-2 px-4 rounded-lg bg-clr-two hover:bg-gradient-to-br group from-clr-one via-clr-two to-clr-three font-semibold"
              >
                Continuar compra
              </Link>
              <Link
                to={paymentLink}
                target="_blank"
                className="w-full text-white py-2 px-4 rounded-lg bg-clr-two hover:bg-gradient-to-br group from-clr-one via-clr-two to-clr-three font-semibold"
              >
                finalizar compra
              </Link>
            </div>
          </section>
        </section>
      ) : (
        <section className=" h-[80vh] justify-self-center flex justify-center items-center">
          <div className="  flex flex-col md:flex-row gap-x-6 w-[85%] md:w-[70%] lg:w-[60%] h-min items-center justify-center px-16 py-8 rounded-lg shadow-lg">
            {/* <div className="flex flex-col md:flex-row items-center md:px-5 lg:px-10 xl:px-20 2xl:px-32 md:pt-10 md:pb-20 text-center overflow-hidden border-b-2 rounded-lg border-slate-400"> */}
            {/* <div className="pl-5 md:pl-20 pr-5"> */}
            <div className="bg-gradient-to-br group from-clr-one via-clr-two to-clr-three flex justify-center items-center w-[8rem] md:w-[100%] max-w-[10rem] p-5 rounded-[50%] overflow-hidden drop-shadow-xl hover:drop-shadow-2xl">
              <img
                className="invert group-hover:scale-110 transition duration-300 ease-out"
                src="https://media.discordapp.net/attachments/885630750244868136/1172248051361005718/1699556085973.png?ex=655fa012&is=654d2b12&hm=f7484016699701d924f64d5b9ec47223a83f8bc4980c9f9fb65bb42ce5fc4360&="
                alt="Un carrito de compras."
              />
            </div>
            {/* </div> */}

            <div className="text-center text-clip">
              <h2 className="bg-clip-text text-transparent bg-gradient-to-br group from-clr-one via-clr-two to-clr-three text-2xl md:text-3xl font-bold text-[#6A61D9] px-3 py-3">
                No tienes ningún artículo
              </h2>
              <p className="px-3 py-5 pb-10 text-sm md:text-base">
                En este momento no tienes ningún artículo en el carrito, cuando
                agregues o quieras comprar un artículo de tu interés, aparecerá
                aquí.
              </p>
              <Link
                to={"/"}
                className="px-2 md:px-3 py-1.5 rounded-lg text-white bg-clr-two hover:bg-gradient-to-br group from-clr-one via-clr-two to-clr-three font-semibold"
              >
                Ver artículos
              </Link>
            </div>
            {/* </div> */}
          </div>
        </section>
      )}
    </div>
  );
}