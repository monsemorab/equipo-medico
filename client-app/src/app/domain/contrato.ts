import {Equipo} from "./equipo";
import {Representante} from "./representante";

export class Contrato {

  constructor(public id: number,
              public numeroContrato: number,
              public nombreLicitacion: string,
              public tipoProcedimiento: string,
              public estadoContrato: string,
              public convocante: string,
              public pdf: string,
              public equipos: Equipo[],
              public representante: Representante,
              public fechaInicio?: any,
              public fechaFin?: any) {
  }
}

export class EstadoContrato {

  constructor(public nombre: string) {
  }
}

