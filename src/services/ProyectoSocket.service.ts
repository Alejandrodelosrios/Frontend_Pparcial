import type { CreateProyectoDTO, UpdateProyectoDTO } from "@/modulos/gestion de proyectos/models/proyecto.dto";
import { io, Socket } from "socket.io-client";

const WS_URL = import.meta.env.VITE_API_URL;

class ProyectoSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${WS_URL}/proyectos`, {
      transports: ["websocket"], 
    });

    this.socket.on("connect", () => {
      console.log("✅ [Proyectos] Conectado con ID:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("❌ [Proyectos] Desconectado del servidor");
    });
  }

  createProyecto(data: CreateProyectoDTO, callback: (res: any) => void) {
    this.socket.emit("createProyecto", data, callback);
  }

  findProyectosByUsuario(idUsuario: string, callback: (res: any) => void) {
    this.socket.emit("findProyectosByUsuario", idUsuario, callback);
  }

  findOneProyecto(idProyecto: string, callback: (res: any) => void) {
    this.socket.emit("findOneProyecto", idProyecto, callback);
  }

  updateProyecto(data: UpdateProyectoDTO, callback: (res: any) => void) {
    this.socket.emit("updateProyecto", data, callback);
  }

  removeProyecto(id: string, callback: (res: any) => void) {
    this.socket.emit("removeProyecto", id, callback);
  }
}

export const proyectoSocketService = new ProyectoSocketService();
