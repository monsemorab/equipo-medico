import {Marca} from "./marca";

export class Modelo {

  constructor(public id: number,
              public modelo: string,
              public marca: Marca) {
  }
}
