
export class Mantenimiento {
  constructor(public id: number,
              public tareaRealizada: string,
              public informeNumero: number,
              public nombreTecnico: string,
              public tipoServicio: string,
              public estadoEquipo: string,
              public fechaMantenimiento: any) {
  }
}
