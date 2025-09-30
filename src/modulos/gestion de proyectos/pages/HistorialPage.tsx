import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { BarraBusqueda } from "../components/BarraBusqueda"; // tu componente reutilizado

interface Cambio {
  id: string;
  fecha: string;
  descripcion: string;
  tipo_cambio: "agregado" | "modificado" | "eliminado";
  detalle_json: any;
  Id_Usuario: string;
  Id_Proyecto: string;
}

export default function HistorialPage() {
  const [cambios, setCambios] = useState<Cambio[]>([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    // MOCK
    setCambios([
      { id: "1", fecha: "2025-09-23T11:00:00", descripcion: "Agregó atributo 'edad' a Usuario", tipo_cambio: "agregado", detalle_json: { atributo: "edad", tipo: "number" }, Id_Usuario: "Alice", Id_Proyecto: "P1" },
      { id: "2", fecha: "2025-09-23T10:50:00", descripcion: "Modificó nombre del proyecto", tipo_cambio: "modificado", detalle_json: { oldName: "Proyecto A", newName: "Proyecto X" }, Id_Usuario: "Bob", Id_Proyecto: "P1" },
      { id: "3", fecha: "2025-09-23T10:45:00", descripcion: "Eliminó atributo 'correo' de Colaborador", tipo_cambio: "eliminado", detalle_json: { atributo: "correo" }, Id_Usuario: "Carlos", Id_Proyecto: "P1" },
    ]);
  }, []);

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "agregado": return "bg-green-100 text-green-800";
      case "modificado": return "bg-blue-100 text-blue-800";
      case "eliminado": return "bg-red-100 text-red-800";
      default: return "";
    }
  };

  const cambiosFiltrados = cambios.filter(c =>
    c.Id_Usuario.toLowerCase().includes(filtro.toLowerCase()) ||
    c.descripcion.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Historial de cambios</h1>

      {/* Barra de búsqueda */}
      <BarraBusqueda
        value={filtro}
        onChange={setFiltro}
      />

      {/* Lista con ScrollArea */}
      <ScrollArea className="mt-4 max-h-[calc(100vh-150px)]">
  <div className="space-y-2">
    {cambiosFiltrados
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .map((c) => (
        <div
          key={c.id}
          className="border rounded-md p-3 shadow-sm hover:shadow-md transition flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold">{c.Id_Usuario}</span>
            <span className="text-sm text-gray-500">{new Date(c.fecha).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${getBadgeColor(
                c.tipo_cambio
              )}`}
            >
              {c.tipo_cambio.toUpperCase()}
            </span>
            <span>{c.descripcion}</span>
          </div>
          {c.detalle_json && (
            <details className="text-sm text-gray-600">
              <summary className="cursor-pointer flex items-center gap-1">
                Ver detalles <ChevronDown className="h-4 w-4" />
              </summary>
              <pre className="bg-gray-100 p-2 rounded mt-1 max-h-48 overflow-auto">
                {JSON.stringify(c.detalle_json, null, 2)}
              </pre>
            </details>
          )}
        </div>
      ))}
    </div>
      </ScrollArea>
    </div>
  );
}