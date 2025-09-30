import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
import { PathNames } from "@/routes/paths";
import ProjectFormDialog from "@/modulos/gestion de proyectos/components/ProyectoForm";
import ConfirmDialog from "@/modulos/gestion de proyectos/components/ConfirmacionDialog";
import { CompartirProyectoDialog } from "@/modulos/gestion de proyectos/components/CompartirCodigo";
import { UnirseProyectoForm } from "@/modulos/gestion de proyectos/components/UnirseProyecto";
import { CerrarSesion } from "@/modulos/gestion de usuarios/components/CerrarSesion";
import { BarraBusqueda } from "@/modulos/gestion de proyectos/components/BarraBusqueda";

import { type Proyecto } from "@/modulos/gestion de proyectos/models/proyecto";
import { ProyectoLista } from "@/modulos/gestion de proyectos/components/CardList";
import { JoinProjectButton } from "@/modulos/gestion de proyectos/components/BotonUnirse";
import { usuarioSocketService } from "@/services/UsuarioSocket.service";
import { proyectoSocketService } from "@/services/ProyectoSocket.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingProyecto, setEditingProyecto] = useState<Proyecto | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [proyectoEliminar, setProyectoEliminar] = useState<Proyecto | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [proyectoCompartir, setProyectoCompartir] = useState<string | null>(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  
  const idUsuario = localStorage.getItem("id_usuario")|| "";

   useEffect(() => {
    if(idUsuario){
     proyectoSocketService.findProyectosByUsuario(idUsuario,(res) => {
      if(res.success){
        setProyectos(res.proyecto ?? []);
       }else{
         toast.error("Error al cargar proyectos");
         setProyectos([]);
        }
   });
  }
  }, [idUsuario]);

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if(token && idUsuario){
      usuarioSocketService.logout({id_usuario:idUsuario,token},(response: any) => {
       console.log("logout backend:",response); 
      });
    }

    localStorage.removeItem("token"); 
    localStorage.removeItem("id_usuario");
    navigate(PathNames.WELCOME);
  };

  const handleEditClick = (proyecto: Proyecto) => {
    setEditingProyecto(proyecto);
    setOpenDialog(true);
  };

  const handleDeleteClick = (proyecto: Proyecto) => {
    setProyectoEliminar(proyecto);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (proyectoEliminar) {
     proyectoSocketService.removeProyecto(proyectoEliminar?.id, (res) => {
      if(res.success){
       toast.success("Proyecto eliminado");
        refreshProyectos();
      }else{
       toast.error("Error al eliminar proyecto");
      }
     }); 
    }
    setOpenDeleteDialog(false);
    setProyectoEliminar(null);
  };

  const refreshProyectos = () => {
    if (idUsuario){
     proyectoSocketService.findProyectosByUsuario(idUsuario, (res) =>{
      if(res.success){
        setProyectos(res.proyecto);
      }
     });
    }
  };

  // Filtrado
  const filteredProjects = proyectos.filter((p) =>
    p.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-screen bg-white dark:bg-slate-900 transition-colors px-6 py-8">
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          UML Backend Generator
        </h2>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <CerrarSesion handleLogout={handleLogout} />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Button onClick={() => setOpenDialog(true)}>Crear proyecto</Button>
        <JoinProjectButton />
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <BarraBusqueda value={search} onChange={setSearch} />
      </div>

      {/* Listado de proyectos */}
      <ProyectoLista
       title="Proyectos"
       proyectos={filteredProjects} // todos los proyectos
       onEdit={handleEditClick}
       onDelete={handleDeleteClick}
       onShare={(p) => {
        setProyectoCompartir(p.codigo_verificacion);
        setShareDialogOpen(true);
       }}
       onLeave={(p) => console.log(`Salir del proyecto ${p.id}`)}
       onClick={(p) => navigate(PathNames.DIAGRAMA(p.id))}
      />

      {/* Modales */}
       <ProjectFormDialog
        open = {openDialog}
        onOpenChange={setOpenDialog}
        projectToEdit={editingProyecto}
        onSave={(nuevoProyecto)=>{
          if (nuevoProyecto) {
           setProyectos((prev) => [...prev, nuevoProyecto]); // actualizar lista local
           navigate(PathNames.DIAGRAMA(nuevoProyecto.id));
          } else {
            refreshProyectos(); // fallback
           }
          setEditingProyecto(null); 
        }} 
      />
      <ConfirmDialog
        open={openDeleteDialog}
        title="Eliminar proyecto"
        message={`¿Estás seguro de que quieres eliminar el proyecto "${proyectoEliminar?.titulo}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setOpenDeleteDialog(false)}
      />

      {proyectoCompartir && (
        <CompartirProyectoDialog
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          codigoVerificacion={proyectoCompartir}
        />
      )}

        <UnirseProyectoForm 
         open={joinDialogOpen} 
         onOpenChange={setJoinDialogOpen}
         onProyectoJoined={(nuevoProyecto) => setProyectos((prev) => [...prev, nuevoProyecto])}
       />

  </div>
  );
}
