import { useState, useEffect } from "react";
import Monitor from "../img/LogoMonitorMsi.png";
import MonitorLogoImg from "../img/Componentes.jpg";
import Slider from "../components/Slider";
import { obtenerProductosTipo } from "../api/productos.api";

export default function SeccionMonitores() {
  const [zonaGamerMonitores, setZonaGamerMonitores] = useState([]);

  //El siguiente hook funcion para hacer consultas a un sistema externo, como en este caso una API
  useEffect(() => {
    //Esto se debe hacer de manera asincrona para que no hayan errores o se frene el sitio web, por esto creamos una funcion asincrona
    const obtenerProductos = async () => {
      //Como se divide por secciones, se debe dividir por partes los registros, en este caso se van a dividir por paginas de a 8 registros, y el siguiente arreglo nos servira para almacenar cada una de esas divisiones
      const productosPorPagina = [];
      // la siguiente constante es la encargadar de obtener la respuesta de la api, la palabra reservada await signifita que para definir esa consonante se debe esperar a que la funcion obtenerProduc.... responda
      const response = await obtenerProductosTipo("monitor", 8);
      //Se guardar los datos de la primer pagina que devuelve 8 registros
      const zonaGamerPaginaActual = response.data;
      //Se agrega al arreglo que contendra las divisiones
      productosPorPagina.push(zonaGamerPaginaActual.results);

      //Haremos uso de un bucle, para esto nos servira la variable flag y el index, el index empezara en 2 porque es la siguiente pagina a consultar
      let flag,
        index = 2;
      //Se hace uso de una condicion la cual se maneja si tiene o no tiene mas paginas para consultar, es decir si hay mas de 8 resgistros
      zonaGamerPaginaActual.next === null ? (flag = false) : (flag = true);

      //Si flag es true entonces entra al bucle de lo contario no
      while (flag) {
        //Se vuelve hacer lo mismo que lo anterior, lo unico que cambia es el indice , el cual indica que pagina sigue a consultar
        const response = await obtenerProductosTipo("monitor", 8, index);
        const zonaGamerPaginaActual = response.data;
        productosPorPagina.push(zonaGamerPaginaActual.results);

        zonaGamerPaginaActual.next === null ? (flag = false) : (flag = true);
        index++;
      }

      //Se almacena el arreglo en el estado del componenete para luego darle manejo
      setZonaGamerMonitores(productosPorPagina);
    };

    //Se llama la funcion para poder que ejecute todo lo anterior
    obtenerProductos();
  }, []);

  //Las consultas pueden tardar, porque se hace un condicion, que si portatilesAsus ya tienen datos entonces muestre la interfaz, de lo contrario dira cargando
  return zonaGamerMonitores ? (
    <main className="pt-8 pb-16 ">
      <section className="relative flex justify-center items-center">
        <div className="bg-clr-two w-full h-96" />
        <img src={Monitor} alt="" className="absolute max-w-auto w-1/2" />
      </section>

      <div className="h-8" />

      <section className="">
        {/* Se recorre el estado, el cual contiene todos los datos consultados */}
        {zonaGamerMonitores.map((zonaGamerMonitores, index) => (
          <>
            {console.log(zonaGamerMonitores.id)}
            <div key={index} className="flex">
              {/* la siguiente condicion es para cuando sea la primera divisio de muestre la imagen que referencia las secciones */}
              {index == 0 ? (
                <img
                  src={MonitorLogoImg}
                  alt="Components combo image."
                  className="w-1/3 hidden md:inline-block"
                />
              ) : null}

              <div
                className={`${
                  index == 0 ? "w-full md:w-2/3" : "w-full md:w-4/%"
                } items-center relative flex`}
              >
                <div className="bg-gradient-to-br from-clr-two absolute -z-10 to-clr-three w-full h-4/5" />
                {/* Se envian los datos al componente slider y ya desde alli se maneja el resto */}
                <Slider sliderId={index} data={zonaGamerMonitores} />
              </div>
            </div>
            <div className="h-16" />
          </>
        ))}
      </section>
    </main>
  ) : (
    <h2 className="text-clr-one text-2xl pt-20 text-center">Cargando..</h2>
  );
}
