import { useEffect, useState } from "react";

interface Endpoint {
  id: string;
  url: string;
  metodo_http: "GET" | "POST" | "PUT" | "DELETE";
  descripcion: string;
  ejemplo_request?: string;
  ejemplo_response?: string;
  fecha_generacion: string;
  Id_Usuario: string;
  Id_Proyecto: string;
}

export default function EndpointsPage() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [copiadoId, setCopiadoId] = useState<string | null>(null);

  useEffect(() => {
    // mock data
    setEndpoints([
      {
        id: "1",
        url: "/api/proyectos",
        metodo_http: "GET",
        descripcion: "Obtiene todos los proyectos",
        ejemplo_response: '[{"id":"proj1","nombre":"Proyecto A"}]',
        fecha_generacion: "2025-09-23T12:00:00",
        Id_Usuario: "user123",
        Id_Proyecto: "proj1",
      },
      {
        id: "2",
        url: "/api/proyectos",
        metodo_http: "POST",
        descripcion: "Crea un nuevo proyecto",
        ejemplo_request: '{"nombre":"Proyecto B"}',
        ejemplo_response: '{"id":"proj2","nombre":"Proyecto B"}',
        fecha_generacion: "2025-09-23T12:05:00",
        Id_Usuario: "user123",
        Id_Proyecto: "proj1",
      },
    ]);
  }, []);

  const getColor = (metodo: string) => {
    switch (metodo) {
      case "GET":
        return "bg-green-200 text-green-800";
      case "POST":
        return "bg-blue-200 text-blue-800";
      case "PUT":
        return "bg-yellow-200 text-yellow-800";
      case "DELETE":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const copiarTexto = async (texto: string, id: string) => {
    await navigator.clipboard.writeText(texto);
    setCopiadoId(id);
    setTimeout(() => setCopiadoId(null), 1500); // feedback por 1.5s
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Endpoints Generadas</h1>

      <div className="grid gap-4">
        {endpoints.map((e) => (
          <div
            key={e.id}
            className="border rounded shadow p-4 bg-white hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className={`px-2 py-1 rounded text-sm font-bold ${getColor(
                  e.metodo_http
                )}`}
              >
                {e.metodo_http}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-mono">{e.url}</span>
                <button
                  onClick={() => copiarTexto(e.url, e.id + "_url")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {copiadoId === e.id + "_url" ? "Copiado ✅" : "Copiar URL"}
                </button>
              </div>
            </div>

            <p className="mb-2">{e.descripcion}</p>

            {e.ejemplo_request && (
              <div className="mb-2">
                <strong>Ejemplo request:</strong>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                  {e.ejemplo_request}
                </pre>
                <button
                  onClick={() => copiarTexto(e.ejemplo_request!, e.id + "_req")}
                  className="text-sm text-blue-600 hover:underline mt-1"
                >
                  {copiadoId === e.id + "_req" ? "Copiado ✅" : "Copiar request"}
                </button>
              </div>
            )}

            {e.ejemplo_response && (
              <div className="mb-2">
                <strong>Ejemplo response:</strong>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                  {e.ejemplo_response}
                </pre>
              </div>
            )}

            <p className="text-sm text-gray-500">
              Generado: {new Date(e.fecha_generacion).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}