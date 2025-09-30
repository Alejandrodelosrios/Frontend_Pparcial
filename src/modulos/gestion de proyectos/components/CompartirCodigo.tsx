//import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface CompartirProyectoDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  codigoVerificacion: string;
}

export function CompartirProyectoDialog({ open, onOpenChange, codigoVerificacion }: CompartirProyectoDialogProps) {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codigoVerificacion)
      toast.success("Enlace copiado al portapapeles")
    } catch (err) {
      toast.error("No se pudo copiar el enlace")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartir codigo de invitacion</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={codigoVerificacion} readOnly />
          <Button onClick={handleCopy}>Copiar</Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}