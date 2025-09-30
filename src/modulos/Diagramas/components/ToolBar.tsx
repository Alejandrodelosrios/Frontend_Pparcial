import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import ColaboradoresModal from "@/modulos/gestion de proyectos/pages/ListColaboradores";
import { useNavigate } from "react-router-dom";
import { PathNames } from "@/routes/paths";
import { useState } from "react";
import { toast } from "sonner";

interface ToolbarProps {
  diagramRef: React.RefObject<any>; // DiagramCanvaHandle
}

function transformar(raw: any) {
  const clases = (raw.nodes || [])
    .filter((n: any) => n.shape?.type === "UmlClassifier" && n.shape.classifier === "Class")
    .map((n: any) => ({
      id: n.id,
      nombre: n.shape.classShape?.name ?? "SinNombre",
      atributos: (n.shape.classShape?.attributes || []).map((a: any) => ({
        nombre: a.name,
        tipo: a.type,
      })),
      metodos: (n.shape.classShape?.methods || []).map((m: any) => ({
        nombre: m.name,
        retorno: m.type,
        parametros: m.parameters || [],
      })),
    }));

  const relaciones = (raw.connectors || [])
    .filter((c: any) => c.shape?.type === "UmlClassifier")
    .map((c: any) => ({
      id: c.id,
      tipo: c.shape.relationship,
      origen: c.sourceID,
      destino: c.targetID,
      multiplicidadOrigen: c.annotations?.[0]?.content ?? "",
      multiplicidadDestino: c.annotations?.[1]?.content ?? "",
    }));

  return { clases, relaciones };
}

export default function Toolbar({ diagramRef }: ToolbarProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGuardar = () => {
    toast.success("se ha guardado el proyecto con éxito ✅")
    const raw = diagramRef.current?.exportJSON();
    console.log("Json antiguo:", raw);
    const limpio = transformar(raw);
    console.log("JSON a enviar al backend:", limpio);
  };

  const handleImportar = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const text = await file.text();
      const json = JSON.parse(text);
      diagramRef.current?.importJSON(json);
    };
    input.click();
  };

  const handleExportarImagen = () => {
    diagramRef.current?.exportPNG();
  };

  // 🔹 Generar backend y redirigir
  const handleGenerarBackend = async () => {
    try {
      setLoading(true);

      // Simular fetch al backend que devuelve ZIP
      const response = await fetch("/api/generar-backend", { method: "GET" });
      if (!response.ok) throw new Error("Error generando backend");
      const blob = await response.blob();

      // Descargar ZIP
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "backend.zip";
      a.click();
      window.URL.revokeObjectURL(url);

      // Redirigir a endpoints
      navigate(PathNames.ENDPOINT_GENERADO);
    } catch (err) {
      console.error(err);
      alert("Error al generar el backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-16 w-full bg-gray-100 flex items-center px-4 shadow">
      {/* Menú Archivo */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button>Archivo</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white shadow rounded-md p-2 z-50">
            <DropdownMenu.Item onSelect={handleGuardar}>Guardar</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={handleImportar}>Importar</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={handleExportarImagen}>Exportar imagen</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* Menú Colaboradores */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button className="ml-2">Colaboradores</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white shadow rounded-md p-2 z-50">
            <ColaboradoresModal />
            <DropdownMenu.Item
              onSelect={() => navigate(PathNames.HISTORIAL_CAMBIOS)}
              className="cursor-pointer"
            >
              Historial de cambios
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => navigate(PathNames.RESTORE_VERSION)}
              className="cursor-pointer"
            >
              Restaurar versión
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* Botón Generar Backend */}
      <Button className="ml-4" onClick={handleGenerarBackend} disabled={loading}>
        {loading ? "Generando..." : "Generar Backend"}
      </Button>
    </div>
  );
}