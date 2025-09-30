import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Proyecto } from "../models/proyecto";


interface ProjectCardProps {
  proyecto: Proyecto;
  onEdit?: (proyecto: Proyecto) => void;
  onDelete?: (proyecto: Proyecto) => void;
  onShare?: (proyecto: Proyecto) => void;
  onLeave?: (proyecto: Proyecto) => void; // para proyectos colaborativos
  onClick?: (proyecto: Proyecto) => void;
}

export function ProyectoCard({
  proyecto,
  onEdit,
  onDelete,
  onShare,
  onLeave,
  onClick,
}: ProjectCardProps) {

   const idUsuario = localStorage.getItem("id_usuario");
   const esPropietario = idUsuario === proyecto.id_usuario;
   const esColaborador = idUsuario !== proyecto.id_usuario;

  return (
    <Card
      className="shadow hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onClick?.(proyecto)}
    >
      <CardContent className="flex flex-col h-full">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{proyecto.titulo}</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">{proyecto.descripcion || ''}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Creado el {new Date(proyecto.fecha_creacion).toLocaleDateString()}
          </p>
          {proyecto.fecha_actualizacion && (
           <p className="text-xs text-slate-500 dark:text-slate-400">
             Última actualización {new Date(proyecto.fecha_actualizacion).toLocaleDateString()}
           </p>
           )}
        </div>
        
        <div
          className="flex justify-end pt-3 border-t border-slate-200 dark:border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">⋮</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {esPropietario && (
                <>
                  <DropdownMenuItem onClick={() => onEdit?.(proyecto)}>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete?.(proyecto)}>Eliminar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onShare?.(proyecto)}>Compartir</DropdownMenuItem>
                </>
              )}
              {esColaborador && (
                <>
                 <DropdownMenuItem onClick={() => onEdit?.(proyecto)}>Editar</DropdownMenuItem>
                 <DropdownMenuItem onClick={() => onLeave?.(proyecto)}>Abandonar proyecto</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}