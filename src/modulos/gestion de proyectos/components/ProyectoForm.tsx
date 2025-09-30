import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import type { Proyecto } from "../models/proyecto"
import { proyectoSocketService } from "@/services/ProyectoSocket.service"

interface ProjectFormDialogProps {
  projectToEdit?: Proyecto | null
  onSave?: (proyecto?: Proyecto) => void;
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function ProjectFormDialog({
  projectToEdit,
  onSave,
  open,
  onOpenChange,
}: ProjectFormDialogProps) {
  const [titulo, setTitulo] = useState(projectToEdit?.titulo || "")
  const [descripcion, setDescripcion] = useState(projectToEdit?.descripcion || "")

  // id_usuario desde localStorage
  const idUsuario = localStorage.getItem("id_usuario");
  

  useEffect(() => {
    if (projectToEdit) {
      setTitulo(projectToEdit.titulo)
      setDescripcion(projectToEdit.descripcion || "")
    } else {
      setTitulo("")
      setDescripcion("")
    }
  }, [projectToEdit])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!titulo.trim()) {
      toast.error("El título es obligatorio")
      return
    }

    if (!idUsuario) {
       toast.error("No se encontró el usuario, vuelve a iniciar sesión");
       return;
    }

    proyectoSocketService.findProyectosByUsuario(idUsuario,(res:any)=>{
      if(!res.success){
        toast.error("Error al validar el titulo del proyecto");
        return;
      }

      const proyectoUsuario: Proyecto[] = res.proyecto;
      //validamos si ya existe un proyecto con el msmo titulo
      const tituloRepetido = proyectoUsuario.some(
        (p)=>
          p.titulo.toLocaleLowerCase() === titulo.trim().toLocaleLowerCase() &&
          (!projectToEdit || p.id !== projectToEdit.id) // si estamos editando, ignoramos el propio proyecto

      );

      if(tituloRepetido){
        toast.error("Ya tienes un proyecto con ese titulo");
        return;
      }
 
    if(projectToEdit){
      //editar un proyecto
      const payloadUpdate = {
        id: projectToEdit.id, 
        updateProyectoDto: {titulo,descripcion}
      } 
      proyectoSocketService.updateProyecto(payloadUpdate,(res: any)=> {
        if(res.success){
          toast.success("Proyecto editado con exito");
          onSave?.();
          onOpenChange?.(false)
        }else{
          toast.error("Error al editar proyectp") 
        }
      }); 
    }else{
      // crear un proyecto
      const payloadCreate = {titulo,descripcion,id_usuario:idUsuario}
       proyectoSocketService.createProyecto(payloadCreate, (res: any)=>{
        if(res.success){
          toast.success("Proyecto creado con exitos")
          onOpenChange?.(false)
          onSave?.(res.proyecto);
        }else{
          toast.error("Error al crear proyecto")
        }
      });
    }
  })
};

 return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0">
        <VisuallyHidden>
          <DialogTitle>
            {projectToEdit ? "Editar Proyecto" : "Crear Proyecto"}
          </DialogTitle>
          <DialogDescription>
            {projectToEdit
              ? "Modifica los datos del proyecto."
              : "Completa la información para crear un nuevo proyecto."}
          </DialogDescription>
        </VisuallyHidden>
        <Card className="shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibold">
              {projectToEdit ? "Editar Proyecto" : "Crear Proyecto"}
            </h2>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="titulo">Título del proyecto</Label>
                <Input
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Escribe el título de tu proyecto"
                  required
                />
              </div>
              <div>
                <Label htmlFor="descripcion">Descripción (opcional)</Label>
                <Textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Agrega una breve descripción"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end mt-4">
              <Button type="submit">Guardar proyecto</Button>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  )
}