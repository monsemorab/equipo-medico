import {Repuesto} from "./repuesto";
import {SolicitudRepuesto} from "./solicitud-repuesto";

export class SolicitudRepuestoDetalle {
  constructor(public id: number,
              public solicitud: SolicitudRepuesto,
              public repuesto: Repuesto,
              public cantidadSolicitada: number,
              public cantidadUsada: number) {
  }
}
