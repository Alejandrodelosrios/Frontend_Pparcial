import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { PathNames } from "@/routes/paths";

import logoSw from "../assets/logoUmlBackendGenerator.jpg";
import nestjs from "../assets/NestJS.png";
import supabase from "../assets/supabase.png";
import ts from "../assets/Typescript_logo.png";

export default function Welcome() {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors relative">
      {/* Barra superior */}
      <div className="absolute top-4 left-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          UML Backend Generator
        </h2>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-slate-900 dark:text-white hover:bg-transparent"                  
        > 
          <Link to={PathNames.LOGIN}>
         Iniciar sesion 
          </Link>
        </Button>  
        <ModeToggle />
      </div>

       {/* Contenido principal */}
      <div className="container mx-auto px-6 pt-20"> {/* <- pt-20 para bajar todo */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto izquierda */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Bienvenido a UML Backend Generator
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Genera diagramas UML y endpoints de prueba en Spring Boot de forma
              colaborativa. Empieza creando tus diagramas y compartiéndolos en
              equipo.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Button asChild
                variant="ghost"
              >
               <a 
                href="https://youtube.com/playlist?list=PLxcLS4CyC_b51lRG6pSSjAehxBB--11mf&si=yhWQX_m8qX8Mf0Tk" 
                className="text-current hover:text-indigo-400"
                target="_blank" 
                rel="noopener noreferrer"

               >
                Guía de Usuario
              </a>
               </Button>
              <Button
                variant="ghost"
                className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-transparent"
              >
                <Link to={PathNames.REGISTER}>Empezar</Link>
              </Button>
            </div>
          </div>
              {/* Imagen derecha - CÓDIGO AJUSTADO */}
          {/* Añadido 'items-center' al contenedor si deseas centrado vertical */}
          <div className="flex justify-center md:justify-end mt-4 md:mt-0 items-center">
            <img
             src={logoSw}
              // Si importaste la imagen con 'import logoUML', usa: src={logoUML}
              alt="Logo UML Backend Generator"
              className="
                w-64 h-auto        /* 1. Ajustamos el ancho y permitimos que la altura se adapte (h-auto) */
                md:w-80 md:h-auto   /* 2. Mantemos el aumento de tamaño en pantallas medianas */
                shadow-lg           /* 3. Mantenemos la sombra (opcional) */
                object-contain      /* 4. ¡CLAVE! Asegura que la imagen se vea completa sin recortar */
                !rounded-none       /* 5. Eliminamos la forma circular */
              "
            />
          </div>
        </div>
      </div>
      {/* Sección inferior con texto arriba + imágenes abajo */}
      <div className="mt-20 flex flex-col items-center gap-8">
       {/* Texto */}
       <p className="text-center text-slate-600 dark:text-slate-300 max-w-xl">
        Con UML Backend Generator podrás transformar tus ideas en diagramas
        claros y generar endpoints en segundos. Es ideal para proyectos
        colaborativos de desarrollo de software, aprendizaje en equipo y
        documentación técnica.
        <br />
         Tecnologías usadas:
        </p>

        {/* Imágenes */}
        <div className="flex flex-wrap justify-center gap-6">
         <img
          src={nestjs}
          alt="NestJS"
          className="w-28 h-28 rounded-lg shadow"
         />
         <img
           src="/assets/react.svg"
           alt="React"
           className="w-28 h-28 rounded-lg shadow"
          />
          <img
           src={supabase}
            alt="Supabase"
            className="w-28 h-28 rounded-lg shadow"
           />
          <img
           src={ts}
           alt="TypeScript"
           className="w-28 h-28 rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
}