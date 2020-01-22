import {Repuesto} from './repuesto';

export class SolicitudRepuesto {
  constructor(public id: number,
              public estado: string, // indica si ya se tiene los repuestos o no
              public repuestos: Repuesto[],
              public fechaSolicitud?: any) {
  }
}
