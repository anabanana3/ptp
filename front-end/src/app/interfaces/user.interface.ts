export interface User{
  Nombre:string;
  Apellidos: string;
  F_Nacimiento: string;
  Email: string;
  Asociacion?: string;
  Profesion?: string;
  ID_Asociacion?: number;
  ID_Profesion?: number;
  ID_Lugar: string;
  Lugar?:string;
  Pais?:string;
  Direccion: string;
  DNI: string;
  Sexo: string;
  Foto?: string;
  ID_Usuario$?:string //? dato opcional
  Captcha?:string
}
