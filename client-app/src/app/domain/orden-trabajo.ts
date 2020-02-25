import {Equipo} from './equipo';
import {SolicitudRepuesto} from './solicitud-repuesto';
import {Mantenimiento} from './mantenimiento';

export class OrdenTrabajo {

  constructor(public id: number,
              public estado: string,
              public tipoServicio: string, // Operativo/preventivo
              public mantenimiento: Mantenimiento,
              public diagnostico: string,
              public responsable: string,
              public equipos: Equipo[],
              public solicitudRepuesto: SolicitudRepuesto,
              // este campo es para el tipo preventivo
              public fecha_a_realizarse?: any) {

  }
}


export class TipoServicio {
  constructor(public nombre: string) {
  }

}
