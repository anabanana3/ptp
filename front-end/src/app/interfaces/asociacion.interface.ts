export interface Asociacion{
  Nombre:string;
  Direccion: string;
  ID_Lugar?: string;
  Lugar?: string;
  Pais?: string;
  Email: string;
  Password: string;
  CIF: string;
  Validada?: number;
  Foto?:string;
  ID_Asociacion?:number //? dato opcional
  UploadFoto?:object
  Captcha?:string
}
