import {OrdenTrabajo} from "./orden-trabajo";

export class Mantenimiento {
  constructor(public id: number,
              public numeroOrdenServicio: number,
              public tareaRealizada: string,
              public informeNumero: number,
              public nombreTecnico: string,
              public tipoServicio: string,
              public estadoEquipo: string,
              public ordenTrabajo: OrdenTrabajo,
              public fechaMantenimiento: any) {
  }
}
