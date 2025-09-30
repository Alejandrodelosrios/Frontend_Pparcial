export interface CreateProyectoDTO{
 titulo:string;
 descripcion?:string;
 id_usuario:string;
}

export interface UpdateProyectoDTO{
 id: string;
 titulo?:string;
 descripcion?: string
}
