import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardHeader} from "@/components/ui/card";
import { User, X } from "lucide-react";

// Datos mockeados de colaboradores
const mockColaboradores = [
  { id: 1, nombre: "Ana Martínez", online: true },
  { id: 2, nombre: "Carlos Pérez", online: false },
  { id: 3, nombre: "Lucía Fernández", online: true },
  { id: 4, nombre: "Jorge Ramírez", online: false },
];

export default function ColaboradoresModal() {
  const [colaboradores, setColaboradores] = useState(mockColaboradores);

  const expulsarColaborador = (id: number) => {
    setColaboradores((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ver colaboradores</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Colaboradores del proyecto</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-64 w-full rounded-md border p-2">
          {colaboradores.map((colaborador) => (
            <Card key={colaborador.id} className="mb-2">
              <CardHeader className="flex items-center justify-between space-y-0 p-3">
               <div className="flex items-center gap-2">
                 {/* Indicador de estado */}
                <span
                 className={`h-3 w-3 rounded-full ${
                 Boolean(colaborador.online) ? "bg-green-500" : "bg-gray-400"
                 }`}
                />
                <User size={18} />
               <span>{colaborador.nombre}</span>
              </div>
               <Button
                variant="destructive"
                size="sm"
                onClick={() => expulsarColaborador(colaborador.id)}
                className="flex items-center gap-1"
                >
              <X size={14} />
               Expulsar
              </Button>
             </CardHeader>
            </Card>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}