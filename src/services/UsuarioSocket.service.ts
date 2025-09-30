import type { CreateUsuarioDTO, LoginDTO, LogoutDTO } from "@/modulos/gestion de usuarios/models/usuario.dto";
import { io, Socket } from "socket.io-client";

const WS_URL = import.meta.env.VITE_API_URL;


class UsuarioSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${WS_URL}/usuarios`, {
      transports: ["websocket"]
    });

    this.socket.on("connect", () => {
      console.log("✅ [Usuario] Conectado al servidor con ID:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("❌ [Usuario] Desconectado del servidor");
    });
  }

  // Métodos con callbacks
  login(data: LoginDTO, callback: (res: any) => void) {
    this.socket.emit("login", data, callback);
  }

  createUsuario(data: CreateUsuarioDTO, callback: (res: any) => void) {
    this.socket.emit("createUsuario", data, callback);
  }

  findOneUsuario(id: string, callback: (res: any) => void) {
    this.socket.emit("findOneUsuario", id, callback);
  }

  logout(data: LogoutDTO, callback: (res: any) => void) {
    this.socket.emit("logout", data, callback);
  }
}

export const usuarioSocketService = new UsuarioSocketService();
