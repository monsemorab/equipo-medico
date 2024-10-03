import {Equipo} from './equipo';
import {Repuesto} from "./repuesto";

export class Contrato {

  constructor(public id: number,
              public numeroContrato: number,
              public nombreLicitacion: string,
              public tipoContrato: string,
              public tipoProcedimiento: string,
              public numeroProcedimiento: string,
              public estadoContrato: string,
              public convocante: string,
              public equipos: Equipo[],
              public repuestos: Repuesto[],
              public fechaInicio?: any,
              public fechaFin?: any) {
  }
}

export class EstadoContrato {

  constructor(public nombre: string) {
  }
}


export class TipoContrato {

  constructor(public nombre: string) {
  }
}

