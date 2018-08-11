import {Representante} from "./representante";
import {Contrato} from "./contrato";
import {TipoEquipo} from "./tipo-equipo";
import {ModeloEquipo} from "./modelo-equipo";
import {Ubicacion} from "./ubicacion";

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
              public modeloEquipo: ModeloEquipo,
              public ubicacion: Ubicacion,
              public contrato: Contrato,
              public licitacionCompra: string,
              public fechaFabricacion: any,
              public fechaVenGarantia: any,
              public fechaInstalacion: any,
              public fechaCompra?: any) {
  }
}
