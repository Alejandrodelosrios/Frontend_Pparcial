import {ProyectoCard } from "./CardProyecto";
import type { Proyecto } from "../models/proyecto";

interface ProyectoListaProps {
  proyectos: Proyecto[];
  title: string;
  onEdit?: (proyecto: Proyecto) => void;
  onDelete?: (proyecto: Proyecto) => void;
  onShare?: (proyecto: Proyecto) => void;
  onLeave?: (proyecto: Proyecto) => void;
  onClick?: (proyecto: Proyecto) => void;
}

export function ProyectoLista({
  proyectos,
  title,
  onEdit,
  onDelete,
  onShare,
  onLeave,
  onClick,
}: ProyectoListaProps) {

  const idUsuario = localStorage.getItem("id_usuario")|| "";

  const misProyectos = proyectos.filter(p => p.id_usuario === idUsuario);
  const proyectosColaborativos = proyectos.filter(p => p.id_usuario !== idUsuario);

  if (!proyectos || proyectos.length === 0){
    return <p className="text-slate-500 dark:text-slate-400">No hay proyectos disponibles.</p>;
  }

  return (
    <div className="mb-8">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}

      {misProyectos.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3">Tus proyectos</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {misProyectos.map((project) => (
              <ProyectoCard
                key={project.id}
                proyecto={project}
                onEdit={onEdit}
                onDelete={onDelete}
                onShare={onShare}
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      )}

      {proyectosColaborativos.length > 0 && (
        <div>
          <h4 className="text-md font-semibold mb-3">Proyectos colaborativos</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proyectosColaborativos.map((project) => (
              <ProyectoCard
                key={project.id}
                proyecto={project}
                onEdit={onEdit} // opcional si los colaboradores pueden editar
                onLeave={onLeave}
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}