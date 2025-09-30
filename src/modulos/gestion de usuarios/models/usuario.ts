export interface Usuario{
 id:string;
 nombre:string;
 correo:string;
 contraseña:string;
 fecha_creacion:Date;
 ultimo_accesso?:Date;   
}