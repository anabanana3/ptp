export interface Asociacion{
  Nombre:string;
  Direccion: string;
  ID_Lugar?: string;
  Email: string;
  Password: string;
  CIF: string;
  Validada?: number;
  Foto?:string;
  ID_Asociacion$?:number //? dato opcional
}
