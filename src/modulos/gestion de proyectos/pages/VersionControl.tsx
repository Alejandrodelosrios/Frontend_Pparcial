import { useState } from "react";
import { BarraBusqueda } from "../components/BarraBusqueda";

interface Version {
  id: string;
  fecha: string;
  json_snapshot: string;
  version: string;
  Id_Usuario: string;
  Id_Proyecto: string;
}

const mockVersions: Version[] = [
  {
    id: "1",
    fecha: "2025-09-23T10:00:00",
    json_snapshot: '{"titulo":"Proyecto A","descripcion":"Descripción inicial"}',
    version: "v1.0",
    Id_Usuario: "user123",
    Id_Proyecto: "proj1",
  },
  {
    id: "2",
    fecha: "2025-09-23T12:30:00",
    json_snapshot: '{"titulo":"Proyecto A","descripcion":"Se agregó funcionalidad X"}',
    version: "v1.1",
    Id_Usuario: "user123",
    Id_Proyecto: "proj1",
  },
  {
    id: "3",
    fecha: "2025-09-23T15:45:00",
    json_snapshot: '{"titulo":"Proyecto A","descripcion":"Se corrigió bug Y"}',
    version: "v1.2",
    Id_Usuario: "user456",
    Id_Proyecto: "proj1",
  },
];

export const RestoreVersionsPage = () => {
  const [selectedJson, setSelectedJson] = useState<string | null>(null);
  const [filtro, setFiltro] = useState("");

  const handleRestore = (version: Version) => {
    alert(`Se restauraría la versión ${version.version}`);
    console.log("JSON a restaurar:", version.json_snapshot);
  };

  const versionesFiltradas = mockVersions.filter(
    (v) =>
      v.version.toLowerCase().includes(filtro.toLowerCase()) ||
      v.Id_Usuario.toLowerCase().includes(filtro.toLowerCase()) ||
      v.json_snapshot.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", background: "#f0f0f0", minHeight: "100vh" }}>
      <h1>Restaurar Versiones</h1>

      {/* Barra de búsqueda */}
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <BarraBusqueda value={filtro} onChange={setFiltro} />
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        {versionesFiltradas.map((v) => (
          <div
            key={v.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "250px",
              background: "#fafafa",
              backgroundClip: "padding-box",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
              target.style.transform = "translateY(-4px)";
              target.style.background = "#ffffff"; // rellena el fondo al hacer hover
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              target.style.transform = "translateY(0)";
              target.style.background = "#fafafa"; // vuelve al color normal
            }}
          >
            <div>
              <h3>{v.version}</h3>
              <p style={{ fontSize: "0.85rem", color: "#555" }}>
                {new Date(v.fecha).toLocaleString()}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#555" }}>Usuario: {v.Id_Usuario}</p>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {v.json_snapshot}
              </p>
            </div>
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleRestore(v)} style={{ flex: 1 }}>
                Restaurar
              </button>
              <button onClick={() => setSelectedJson(v.json_snapshot)} style={{ flex: 1 }}>
                Ver JSON
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJson && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Detalle completo del JSON:</h2>
          <pre
            style={{
              background: "#f7f7f7",
              padding: "1rem",
              borderRadius: "4px",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {selectedJson}
          </pre>
          <button onClick={() => setSelectedJson(null)} style={{ marginTop: "1rem" }}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};