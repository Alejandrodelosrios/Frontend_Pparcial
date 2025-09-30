
export interface CreateColaboradorDTO {
  codigo_verificacion: string;
  id_usuario: string;
  rol: string;
}

export interface RemoveColaboradorDTO {
  id_usuario: string;
  id_proyecto: string;
}
