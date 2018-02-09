import {Representante} from "./representante";
import {Repuesto} from "./repuesto";

export class SolicitudServicio {

  constructor(public id: number,
              public estado: string,
              public tarea: string,
              public responsable: Representante,
              public fechaSolicitud?: any) {
  }
}


export class SolicitudRepuesto {

  constructor(public id: number,
              public estado: string,
              public repuestos: Repuesto[],
              public fechaSolicitud?: any) {
  }
}
