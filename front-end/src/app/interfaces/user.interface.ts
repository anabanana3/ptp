export interface User{
  Nombre:string;
  Apellidos: string;
  F_Nacimiento: string;
  Email: string;
  ID_Asociacion: number;
  ID_Profesion: number;
  ID_Lugar: string;
  Direccion: string;
  DNI: string;
  Sexo: string;
  ID_Usuario$?:string //? dato opcional
}
