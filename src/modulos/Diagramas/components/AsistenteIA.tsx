import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, MessageCircleIcon } from "lucide-react";

interface Mensaje {
  pregunta: string;
  respuesta: string;
}

export default function AsistenteIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(false);

  const enviarPregunta = () => {
    if (!input.trim()) return;

    const preguntaActual = input.trim();
    setInput("");
    setLoading(true);

    // Simulamos que la IA responde después de 1.2s
    setTimeout(() => {
      const respuestaMock = `Aquí está una sugerencia para: "${preguntaActual}"`;
      setMensajes([...mensajes, { pregunta: preguntaActual, respuesta: respuestaMock }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircleIcon size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform z-40
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Asistente IA</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Historial de mensajes */}
        <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-128px)]">
          {mensajes.map((m, idx) => (
            <div key={idx} className="mb-4">
              <div className="bg-gray-100 p-2 rounded">
                <strong>Usuario:</strong> {m.pregunta}
              </div>
              <div className="bg-blue-100 p-2 rounded mt-1">
                <strong>IA:</strong> {m.respuesta}
              </div>
            </div>
          ))}

          {loading && (
            <div className="bg-blue-100 p-2 rounded mt-1 italic">IA escribiendo...</div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarPregunta()}
          />
          <Button className="w-full mt-2" onClick={enviarPregunta}>
            Enviar
          </Button>
        </div>
      </div>
    </>
  );
}