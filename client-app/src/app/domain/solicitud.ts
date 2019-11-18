import {Repuesto} from "./repuesto";
import {Equipo} from "./equipo";

export class SolicitudServicio {

  constructor(public id: number,
              public tipo: string,
              public estado: string,
              public descripcionProblema: string,
              public personalReporte: string,
              public equipos: Equipo [],
              public fechaSolicitud?: any) {
  }
}


export class SolicitudRepuesto {
  constructor(public id: number,
              public codigo: string,
              public repuestos: Repuesto[],
              public fechaSolicitud?: any) {
  }
}
