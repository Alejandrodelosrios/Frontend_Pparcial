import type { CreateColaboradorDTO, RemoveColaboradorDTO } from "@/modulos/gestion de proyectos/models/colaborador.dto";
import { io, Socket } from "socket.io-client";

const WS_URL = import.meta.env.VITE_API_URL;

class ColaboradorSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${WS_URL}/colaboradores`, {
      transports: ["websocket"], 
    });

    this.socket.on("connect", () => {
      console.log("✅ [Colaboradores] Conectado con ID:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("❌ [Colaboradores] Desconectado del servidor");
    });
  }

  createColaborador(data: CreateColaboradorDTO, callback: (res: any) => void) {
    this.socket.emit("createColaborador", data, callback);
  }

  findColaboradoresByProyecto(idProyecto: string, callback: (res: any) => void) {
    this.socket.emit("findColaboradoresByProyecto", idProyecto, callback);
  }

  removeColaborador(data: RemoveColaboradorDTO, callback: (res: any) => void) {
    this.socket.emit("removeColaborador", data, callback);
  }
}

export const colaboradorSocketService = new ColaboradorSocketService();
