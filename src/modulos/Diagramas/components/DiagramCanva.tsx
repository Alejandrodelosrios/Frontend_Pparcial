import { forwardRef, useImperativeHandle, useRef } from "react";
import { DiagramComponent, Inject, PrintAndExport, type NodeModel } from "@syncfusion/ej2-react-diagrams";

export type DiagramCanvaHandle = {
  addClassNode: (name?: string) => string;
  exportPNG: () => void;
  exportJSON: () => any;
  importJSON: (json: any) => void;
};

const DiagramCanva = forwardRef<DiagramCanvaHandle>((_props, ref) => {
  const diagramRef = useRef<DiagramComponent & { exportDiagram: Function; saveDiagram: Function; loadDiagram: Function } | null>(null);

  useImperativeHandle(ref, () => ({
    // Agregar un nodo de clase
    addClassNode(name = "NuevaClase") {
      const id = `Class_${Date.now()}`;
      const node: NodeModel = {
        id,
        offsetX: 150 + Math.random() * 200,
        offsetY: 100 + Math.random() * 200,
        width: 160,
        height: 100,
        shape: {
          type: "UmlClassifier" as "UmlClassifier",
          classifier: "Class",
          classShape: {
            name,
            attributes: [
              { name: "atributo1", type: "Type", style: { bold: true } },
            ],
          },
        },
      };
      diagramRef.current?.add(node);
      return id;
    },

    // Exportar como PNG
    exportPNG() {
      diagramRef.current?.exportDiagram({
        fileName: "diagrama",
        format: "PNG",
        mode: "Download",
      });
    },

    // Exportar JSON del diagrama
    exportJSON() {
     if(!diagramRef.current) return null;
     
     const diagram = diagramRef.current;

     const nodos = diagram.nodes.filter(node => (node.shape as any)?.type==="UmlClassifier")
     .map(node => ({
       id: node.id,
       offsetX: node.offsetX,
       offsetY: node.offsetY,
       width: node.width,
       height: node.height,
       shape: node.shape,
       annotations: node.annotations?.map(a => ({content: a.content})) || [],
       ports: node.ports?.map(p =>({
          id: p.id,
          offset: p.offset,
          visibility: p.visibility 
       })),      
     }));

     const conectores = diagram.connectors.map(conn => ({
      id: conn.id,
      sourceID: conn.sourceID,
      targetID: conn.targetID,
      type: conn.type,
      annotations: conn.annotations?.map(a => ({ content: a.content })) || [],
     }));

     return {nodos,conectores};

    },

    // Importar JSON al diagrama
    importJSON(json: any) {
      diagramRef.current?.loadDiagram(json);
    },
  }));

  return (
    <DiagramComponent
      id="diagram"
      ref={diagramRef}
      width="100%"
      height="100%"
    >
      <Inject services={[PrintAndExport]} />
    </DiagramComponent>
  );
});

export default DiagramCanva;