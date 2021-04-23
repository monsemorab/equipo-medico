import {Representante} from './representante';
import {Contrato} from './contrato';
import {TipoEquipo} from './tipo-equipo';
import {Ubicacion} from './ubicacion';
import {Modelo} from "./modelo";
import {Marca} from "./marca";

export class Equipo {

  constructor(public id: number,
              public numeroSerie: string,
              public numeroPatrimonial: string,
              public numeroLote: string,
              public estado: string,
              public versionSw: string,
              public descripcionEquipo: string,
              public costo: number,
              public representante: Representante,
              public tipoEquipo: TipoEquipo,
              public modelo: Modelo,
              public marca: Marca,
              public ubicacion: Ubicacion,
              public contrato: Contrato,
              public licitacionCompra: string,
              public fechaFabricacion: Date,
              public fechaVenGarantia: Date,
              public fechaInstalacion: Date,
              public fechaCompra: Date) {
  }
}
