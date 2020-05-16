import {TipoEquipo} from './tipo-equipo';
import {ModeloEquipo} from './modelo-equipo';
import {Representante} from "./representante";

export class Repuesto {

  constructor(public id: number,
              public codigo: string,
              public descripcionArticulo: string,
              public precio: number,
              public cantidadAdquirida: number,
              public cantidadRestante: number,
              public tipoEquipo: TipoEquipo,
              public modeloEquipo: ModeloEquipo,
              public representante: Representante,
              public fechaActualizacion?: any) {
  }
}
