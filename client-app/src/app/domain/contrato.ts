import {Equipo} from "./equipo";

export class Contrato {

  constructor(public id: number,
              public numeroContrato: number,
              public nombreLicitacion: string,
              public tipoProcedimiento: string,
              public numeroProcedimiento: string,
              public estadoContrato: string,
              public convocante: string,
              public pdf: string,
              public equipos: Equipo[],
              public fechaInicio?: any,
              public fechaFin?: any) {
  }
}

export class EstadoContrato {

  constructor(public nombre: string) {
  }
}

