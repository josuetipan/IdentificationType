//Definir entidad para la logica de negocio
export class Identification {
  id: string;
  name: string;
  code: string;
  constructor(id: string, name: string, code: string) { 
    this.id = id;
    this.name = name;
    this.code = code;
  }
}
