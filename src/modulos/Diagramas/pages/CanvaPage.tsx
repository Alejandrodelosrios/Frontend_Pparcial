import { useRef } from "react";
import Palette from "../components/Palette";
import DiagramCanva, { type DiagramCanvaHandle } from "../components/DiagramCanva";
import Toolbar from "../components/ToolBar";
import AsistenteIA from "../components/AsistenteIA"; // <- Importamos el asistente

export default function CanvaPage() {
  const canvasRef = useRef<DiagramCanvaHandle | null>(null);

  const handleAddClass = (name?: string) => {
    canvasRef.current?.addClassNode(name);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <Toolbar diagramRef={canvasRef} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64">
          <Palette onAddClass={handleAddClass} />
        </div>
        <div className="flex-1">
          <DiagramCanva ref={canvasRef} />
        </div>
      </div>

      {/* Insertamos el Asistente IA */}
      <AsistenteIA />
    </div>
  );
}
