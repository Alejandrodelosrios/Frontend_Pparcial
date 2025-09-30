import {
  SymbolPaletteComponent,
  type NodeModel,
  type ConnectorModel,
} from "@syncfusion/ej2-react-diagrams";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PaletteProps = {
  onAddClass: (name?: string) => void;
};

// Relaciones UML
const association: ConnectorModel = {
  id: "Association",
  type: "Straight",
  sourcePoint: { x: 0, y: 0 },
  targetPoint: { x: 60, y: 60 },
  shape: { type: "UmlClassifier", relationship: "Association" },
  annotations: [{ content: "1..1", offset: 0.5 }], // multiplicidad inicial
};

const aggregation: ConnectorModel = {
  id: "Aggregation",
  type: "Straight",
  sourcePoint: { x: 0, y: 0 },
  targetPoint: { x: 60, y: 60 },
  targetDecorator: { shape: "Diamond", style: { fill: "#fff", strokeColor: "#000" } },
  shape: { type: "UmlClassifier", relationship: "Aggregation" },
  annotations: [{ content: "0..*", offset: 0.5 }],
};

const composition: ConnectorModel = {
  id: "Composition",
  type: "Straight",
  sourcePoint: { x: 0, y: 0 },
  targetPoint: { x: 60, y: 60 },
  targetDecorator: { shape: "Diamond", style: { fill: "#000", strokeColor: "#000" } },
  shape: { type: "UmlClassifier", relationship: "Composition" },
  annotations: [{ content: "1..*", offset: 0.5 }],
};

const generalization: ConnectorModel = {
  id: "Generalization",
  type: "Straight",
  sourcePoint: { x: 0, y: 0 },
  targetPoint: { x: 60, y: 60 },
  targetDecorator: { shape: "Arrow", style: { fill: "#fff", strokeColor: "#000" } },
  shape: { type: "UmlClassifier", relationship: "Realization" },
  annotations: [{ content: "Herencia", offset: 0.5 }],
};

// Relación muchos a muchos (se modela con clase intermedia + asociaciones)
const manyToMany: ConnectorModel = {
  id: "ManyToMany",
  type: "Straight",
  sourcePoint: { x: 0, y: 0 },
  targetPoint: { x: 60, y: 60 },
  shape: { type: "UmlClassifier", relationship: "Association" },
  annotations: [{ content: "M:N", offset: 0.5 }],
};

export default function Palette({ onAddClass }: PaletteProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Paleta UML</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 overflow-hidden flex-1">
        {/* Botón para agregar clase */}
        <Button onClick={() => onAddClass("NuevaClase")}>➕ Agregar Clase</Button>

        {/* Paleta de relaciones */}
        <div className="flex-1 overflow-y-auto">
          <SymbolPaletteComponent
            id="symbolPalette"
            expandMode="Multiple"
            palettes={[
              {
                id: "umlRelations",
                expanded: true,
                symbols: [association, aggregation, composition, generalization, manyToMany],
                title: "Relaciones",
              },
            ]}
            symbolHeight={80}
            symbolWidth={120}
            symbolMargin={{ left: 10, right: 10, top: 10, bottom: 10 }}
            symbolDragSize={{ width: 120, height: 80 }}
            getSymbolInfo={(symbol: NodeModel | ConnectorModel) => ({
              description: symbol.id ?? "Elemento UML",
            })}
          />
        </div>
      </CardContent>
    </Card>
  );
}