/** Mock data*/

import {EstadoContrato} from "../../domain/contrato";
import {Servicio} from "../../domain/orden-trabajo";



export const SERVICIO: Servicio [] = [
  new Servicio('PREVENTIVO'),
  new Servicio('CORRECTIVO')
]

export const ESTADO_CONTRATO: EstadoContrato[] = [
  new EstadoContrato('Vigente'),
  new EstadoContrato('Finalizado'),
  new EstadoContrato('Cancelado')
];
