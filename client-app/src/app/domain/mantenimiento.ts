
export class Mantenimiento {
  constructor(public id: number,
              public tareaRealizada: string,
              public informeNro: number,
              public responsable: string,
              public fechaMantenimiento?: any) {
  }
}
