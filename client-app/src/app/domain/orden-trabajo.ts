import {Equipo} from "./equipo";
import {SolicitudRepuesto, SolicitudServicio} from "./solicitud";

export class OrdenTrabajo {

  constructor(public id: number,
              public estado: string,
              public equipo: Equipo,
              public tipoServicio: Servicio,
              public diagnostico: string,
              public solicitudRepuesto: SolicitudRepuesto,
              public solicitudServicio: SolicitudServicio,
              public fecha?: any) {
  }
}


export class Servicio {
  constructor(public name: string) {
  }

}
