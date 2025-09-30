export interface LoginDTO{
 correo: string;
 contraseña: string;
}

export interface CreateUsuarioDTO{
 nombre:string;
 correo: string;
 contraseña: string;
}

export interface LogoutDTO{
 id_usuario:string;
 token:string;
}