import {Equipo} from './equipo';
import {SolicitudRepuesto} from './solicitud-repuesto';
import {Mantenimiento} from './mantenimiento';

export class OrdenTrabajo {

  constructor(public id: number,
              public estado: string,
              public tipoServicio: string,
              public mantenimiento: Mantenimiento,
              public diagnostico: string,
              public responsable: string,
              public equipos: Equipo[],
              public solicitudRepuestos: SolicitudRepuesto [],
              public fecha?: any) { // fecha de creación
  }
}


export class Servicio {
  constructor(public name: string) {
  }

}
