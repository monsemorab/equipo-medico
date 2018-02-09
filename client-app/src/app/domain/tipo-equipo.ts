export class TipoEquipo {

  constructor(public id: number,
              public tipo: string,
              public nombreGenerico: string,
              public indiceGestionEquipo: string,
              public vidaUtil: string,
              public codigoECRI_UMDNS: string,
              public procedimientoMP: string,
              public mpano: string) {
  }
}
