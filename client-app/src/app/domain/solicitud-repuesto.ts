import {SolicitudRepuestoDetalle} from "./solicitud-repuesto-detalle";

export class SolicitudRepuesto {
  constructor(public id: number,
              public estado: string, // indica si ya se tiene los repuestos o no
              public solicitudRepuestoDetalles: SolicitudRepuestoDetalle[],
              public fechaSolicitud?: any) {
  }
}

export class EstadoSolicitud {

  constructor(public nombre: string) {
  }
}
