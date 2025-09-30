import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { colaboradorSocketService } from "@/services/ColaboradorSocket.service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { PathNames } from "@/routes/paths"
import { proyectoSocketService } from "@/services/ProyectoSocket.service"
import type { Proyecto } from "../models/proyecto"

interface UnirseProyectoFormProps {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  onProyectoJoined?: (proyecto: Proyecto) => void
}

export function UnirseProyectoForm({ open, onOpenChange, onProyectoJoined }: UnirseProyectoFormProps) {
  const [codeOrLink, setCodeOrLink] = useState("")
  const [selectOpen, setSelectOpen] = useState(false);
  const [rol, setRol] = useState<string | undefined>(undefined)

  const idUsuario = localStorage.getItem("id_usuario");
  const navigate= useNavigate()

   const ROLES= ["Diseñador de base de datos","Desarrollador backend", "Colaborador"];
  const handleJoin = (e: React.FormEvent) => {
     e.preventDefault();

    if(!idUsuario){
     toast.error("No se encontró el usuario, vuelve a iniciar sesión");
     return; 
    }
     console.log(codeOrLink);
    if (!codeOrLink.trim()) {
      toast.error("Por favor ingresa un código o enlace válido ❌")
      return
    }
    if (!rol) {
      toast.error("Por favor selecciona un rol ⚠️")
      return
    }

    const data = {
      codigo_verificacion: codeOrLink.trim(),
      rol,
      id_usuario:idUsuario,
    }
    colaboradorSocketService.createColaborador(data, (res: any) => {

      if (res.success && res.colaborador) {
        toast.success("Te has unido al proyecto con éxito ✅")
        
        const idProyecto = res.colaborador.id_proyecto

      // Traer el proyecto completo usando su id
      proyectoSocketService.findOneProyecto(idProyecto, (resProyecto: any) => {
        if (resProyecto.success && resProyecto.proyecto) {
          const nuevoProyecto = resProyecto.proyecto

        // Actualizar lista de proyectos en dashboard
          onProyectoJoined?.(nuevoProyecto)  
          navigate(PathNames.DIAGRAMA(idProyecto))
        }else{
          toast.error("No se pudo obtener informacion del proyecto")
        }
      })
        setCodeOrLink("")
        setRol(undefined)
        onOpenChange(false)

      } else {
        toast.error(`No se pudo unir al proyecto ❌: ${res.message}`)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unirse a un proyecto</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="space-y-4 pt-4">
            <Input
              placeholder="Pega el código de invitacion aquí"
              value={codeOrLink}
              onChange={(e) => setCodeOrLink(e.target.value)}
            />
            <Select
               open={selectOpen}
               onOpenChange={setSelectOpen} 
               value={rol}
               onValueChange={(value) => setRol(value)}
              >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ROLES).map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleJoin}>Unirte</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}