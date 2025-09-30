import { Button } from "@/components/ui/button";

interface CerrarSesionProps {
 handleLogout: () => void;   
}
export function CerrarSesion({ handleLogout}: CerrarSesionProps) {
 return(
        <Button
         className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 px-4 py-2 rounded-lg transition-colors"
         onClick={handleLogout}
        >
         Cerrar sesión
        </Button>
       );
}