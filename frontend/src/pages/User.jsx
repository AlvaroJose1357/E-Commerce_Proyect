import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as componentes from "./componentes";
import { autenticarUsuario, crearUsuario } from "../api/usuarios";

function App() {
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    setFocus,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await crearUsuario(data);
      if (res.data) {
        localStorage.setItem("tokenUser", res.data.token);
        reset();
        navigate("/");
      }
    } catch (error) {
      let clave = Object.keys(error.response.data)[0];
      alert(error.response.data[clave]);
      resetField(clave);
      setFocus(clave);
    }
  });

  return (
    <div className="w-full py-10">
      <componentes.Container className="mb-10">
        <componentes.SignUpContainer signinIn={signIn}>
          <componentes.Form onSubmit={onSubmit}>
            <componentes.Title>Crear Cuenta</componentes.Title>
            <componentes.Input
              type="text"
              placeholder="Nombres"
              {...register("first_name", {
                required: "Debe ingresar su nombre",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              })}
            />
            {errors.first_name && (
              <span className="block w-full text-left text-[10px] text-red-500">
                {errors.first_name.message}
              </span>
            )}
            <componentes.Input
              type="text"
              placeholder="Apellidos"
              {...register("last_name", {
                required: "Debe ingresar su nombre",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              })}
            />
            {errors.last_name && (
              <span className="block w-full text-left text-[10px] text-red-500">
                {errors.last_name.message}
              </span>
            )}
            <componentes.Input
              type="text"
              placeholder="Nombre de usuario"
              {...register("username", {
                required: "Debe ingresar su nombre de usuario",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              })}
            />
            {errors.username && (
              <span className="block w-full text-left text-[10px] text-red-500">
                {errors.username.message}
              </span>
            )}
            <componentes.Input
              type="text"
              placeholder="Direccion"
              {...register("direccion", {
                required: "Debe ingresar su direccion",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              })}
            />
            {errors.direccion && (
              <span className="block w-full text-left text-[10px] text-red-500">
                {errors.direccion.message}
              </span>
            )}
            <componentes.Input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Debe ingresar un correo",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,4}$/,
                  message: "Correo no valido",
                },
              })}
            />
            {errors.email && (
              <span className="block w-full text-left text-[10px] text-red-500">
                {errors.email.message}
              </span>
            )}
            <componentes.Input
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "Debe ingresar una contraseña",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <span className="block w-full text-left text-[10px] text-red-500 mb-6">
                {errors.password.message}
              </span>
            )}
            <componentes.Button>Crear Cuenta</componentes.Button>
          </componentes.Form>
        </componentes.SignUpContainer>

        <componentes.SignInContainer signinIn={signIn}>
          <FormInicioSesion />
        </componentes.SignInContainer>

        <componentes.OverlayContainer signinIn={signIn}>
          <componentes.Overlay signinIn={signIn}>
            <componentes.LeftOverlayPanel signinIn={signIn}>
              <componentes.Title>Bienvenido</componentes.Title>
              <componentes.Paragraph>
                Inicia sesion para ver que hay de nuevo.
              </componentes.Paragraph>
              <componentes.GhostButton onClick={() => toggle(true)}>
                Iniciar Sesion
              </componentes.GhostButton>
            </componentes.LeftOverlayPanel>

            <componentes.RightOverlayPanel signinIn={signIn}>
              <componentes.Title>¡Hola, Gamer!</componentes.Title>
              <componentes.Paragraph>
                Registrate para hacer parte de nosotros y estar al tanto de las
                novedades.
              </componentes.Paragraph>
              <componentes.GhostButton onClick={() => toggle(false)}>
                Registrarte
              </componentes.GhostButton>
            </componentes.RightOverlayPanel>
          </componentes.Overlay>
        </componentes.OverlayContainer>
      </componentes.Container>
    </div>
  );
}

export default App;

function FormInicioSesion() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitUser = handleSubmit(async (data) => {
    try {
      console.log(data);
      const res = await autenticarUsuario(data);
      if (res.data) {
        localStorage.setItem("tokenUser", res.data.token);
        reset();
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  });

  return (
    <componentes.Form onSubmit={onSubmitUser}>
      <componentes.Title>Iniciar Sesion</componentes.Title>
      <componentes.Input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Debe ingresar un correo",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,4}$/,
            message: "Correo no valido",
          },
        })}
      />
      {errors.email && (
        <span className="block w-full text-left text-[10px] text-red-500">
          {errors.email.message}
        </span>
      )}
      <componentes.Input
        type="password"
        placeholder="***********"
        {...register("password", {
          required: "Debe ingresar una contraseña",
          minLength: {
            value: 6,
            message: "Debe tener al menos 6 caracteres",
          },
        })}
      />
      {errors.password && (
        <span className="block w-full text-left text-[10px] text-red-500">
          {errors.password.message}
        </span>
      )}
      <componentes.Anchor href="#">
        ¿Olvidaste tu Contraseña?
      </componentes.Anchor>
      <componentes.Button>Iniciar Sesion</componentes.Button>
    </componentes.Form>
  );
}
