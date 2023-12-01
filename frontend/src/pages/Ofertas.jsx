import { useEffect, useState } from "react";
import { obtenerProductosOferta } from "../api/productos.api";
import Card from "../components/Card";

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function cargarOfertas() {
      try {
        const response = await obtenerProductosOferta();
        if (response.data) {
          setOfertas(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    cargarOfertas();
  }, []);

  return (
    <article>
      <section className="w-full h-[25rem] mt-5 bg-clr-one object">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/331/987/non_2x/special-offer-sale-banner-design-template-vector.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </section>
      <section className="min-h-[30rem] flex justify-center items-center p-8">
        {ofertas.length === 0 ? (
          <div className="bg-clr-one p-[10%]  text-center rounded-lg text-white">
            <h2 className=" md:text-xl">
              En estos momentos no hay ofertas, seguramente muy pronto
            </h2>
          </div>
        ) : ofertas.length > 0 ? (
          <div className="flex flex-wrap gap-x-5 gap-y-9 justify-center">
            {ofertas.map((oferta) => (
              <Card key={oferta.id} item={oferta} />
            ))}
          </div>
        ) : (
          <div className="bg-clr-one p-[10%]  text-center rounded-lg text-white">
            <h2 className=" md:text-xl">Cargando...</h2>
          </div>
        )}
      </section>
    </article>
  );
}
