import {TipoEquipo} from './tipo-equipo';
import {Modelo} from './modelo';
import {Representante} from "./representante";
import {Marca} from "./marca";

export class Repuesto {

  constructor(public id: number,
              public codigo: string,
              public descripcionArticulo: string,
              public precio: number,
              public cantidadAdquirida: number,
              public cantidadExistente: number,
              public tipoEquipo: TipoEquipo,
              public modelo: Modelo,
              public marca: Marca,
              public representante: Representante,
              public fechaActualizacion?: any) {
  }
}
