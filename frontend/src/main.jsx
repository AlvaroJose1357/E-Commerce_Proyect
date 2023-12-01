import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Index from "./layout";
import Inicio from "./pages/Inicio";
import Favoritos from "./pages/Favoritos";
import Carrito from "./pages/Carrito";
import User from "./pages/User";
import RegistroU from "./pages/RegistroU";
import RegistroTP from "./pages/RegistroTP";
import RegistroP from "./pages/RegistroProd";
import RegistroMP from "./pages/RegistroMPago";
import EMUsuarios from "./pages/EMUsuarios";
import EMTipoP from "./pages/EMTipoP";
import EMProd from "./pages/EMProd";
import EMMPago from "./pages/EMMPago";
import ModificarU from "./pages/ModificarU";
import ModificarTP from "./pages/ModificarTP";
import ModificarProd from "./pages/ModificarProd";
import ModificarMPago from "./pages/ModificarMpago";
import "./index.css";
import SeccionAsus from "./pages/SeccionAsus";
import SeccionAcer from "./pages/SeccionAcer";
import SeccionLenovo from "./pages/SeccionLenovo";
import SeccionHP from "./pages/SeccionHP";
import SeccionProcesadores from "./pages/SeccionProcesadores";
import SeccionTarjetasG from "./pages/SeccionTarjetasG";
import InfoProducto from "./pages/InfoProducto";
import SeccionFP from "./pages/SeccionFP";
import SeccionRL from "./pages/SeccionRL";
import ProductosEnsayo from "./pages/ProductosEnsayo";
import SeccionChasis from "./pages/SeccionChasis";
import SeccionMonitores from "./pages/SeccionMonitores";
import Ofertas from "./pages/Ofertas";
import SeccionConvertiblesAsus from "./pages/SeccionConvertiblesAsus";
import SeccionConvertiblesHP from "./pages/SeccionConvertiblesHp";
import { ProtectedRoute } from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Inicio />,
      },
      {
        path: "producto/:id",
        element: <InfoProducto />,
      },
      {
        path: "ofertas/",
        element: <Ofertas />,
      },
      {
        path: "favoritos/",
        element: <ProtectedRoute><Favoritos/></ProtectedRoute>, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "carrito/",
        element: <ProtectedRoute><Carrito /></ProtectedRoute>, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "user/",
        element: <User />,
      },
      {
        path: "registro/",
        element: <ProtectedRoute><RegistroU /></ProtectedRoute>, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "registro2/",
        element: <RegistroTP />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "registro3/",
        element: <RegistroP />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "registro4/",
        element: <RegistroMP />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "registro5/",
        element: <EMUsuarios />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "registro6/",
        element: <EMTipoP />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "registro7/",
        element: <EMProd />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "registro8/",
        element: <EMMPago />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "/modificar/:id",
        element: <ModificarU />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "/modificar1/:id",
        element: <ModificarTP />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "/modificar2/:id",
        element: <ModificarProd />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "/modificar3/:id",
        element: <ModificarMPago />, // esta ruta solo se puede acceder si el usuario esta logueado (protected route)
      },
      {
        path: "seccion-asus/",
        element: <SeccionAsus />,
      },
      {
        path: "seccion-acer/",
        element: <SeccionAcer />,
      },
      {
        path: "seccion-procesadores/",
        element: <SeccionProcesadores />,
      },
      {
        path: "seccion-tarjetas-graficas/",
        element: <SeccionTarjetasG />,
      },
      {
        path: "Seccion-lenovo/",
        element: <SeccionLenovo />,
      },
      {
        path: "Seccion-hp/",
        element: <SeccionHP />,
      },
      {
        path: "Seccion-fuentesP/",
        element: <SeccionFP />,
      },
      {
        path: "Seccion-refrigeracion-liquida/",
        element: <SeccionRL />,
      },
      {
        path: "Seccion-Monitores/",
        element: <SeccionMonitores />,
      },
      {
        path: "Seccion-Chasis/",
        element: <SeccionChasis />,
      },
      {
        path: "Seccion-Convertible-Asus/",
        element: <SeccionConvertiblesAsus />,
      },
      {
        path: "Seccion-Convertible-HP/",
        element: <SeccionConvertiblesHP />,
      },
      {
        path: "productos/",
        element: <ProductosEnsayo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
