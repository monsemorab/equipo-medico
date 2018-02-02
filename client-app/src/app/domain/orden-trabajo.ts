import {Equipo} from "./equipo";
import {SolicitudRepuesto} from "./solicitud";
import {SolicitudService} from "../service/solicitud.service";

export class Repuesto {

  constructor(public id: number,
              public estado: string,
              public equipo: Equipo,
              public tipoServicio: Servicio,
              public diagnostico: string,
              public solicitudRepuesto: SolicitudRepuesto[],
              public solicitudServicio: SolicitudService[],
              public mantenimiento: Mantenimiento,
              public fecha?: any) {
  }
}


export class Servicio {
  constructor(public name: string) {
  }

}


export class Mantenimiento {
  constructor(public id: number,
              public tareaRealizada: string,
              public informeNumero: number,
              public estado: string,
              public nombreTecnico: string,
              public fechaMantenimiento?: any) {

  }
}
