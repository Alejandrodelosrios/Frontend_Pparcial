export interface Proyecto{
 id:string;
 titulo: string;
 descripcion?: string;
 codigo_verificacion: string;
 fecha_creacion: Date;
 fecha_actualizacion: Date;
 id_usuario: string;
}