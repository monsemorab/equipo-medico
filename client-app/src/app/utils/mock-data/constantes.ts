/** Mock data*/

import {EstadoContrato} from '../../domain/contrato';
import {TipoServicio} from '../../domain/orden-trabajo';



export const SERVICIO: TipoServicio [] = [
  new TipoServicio('PREVENTIVO'),
  new TipoServicio('OPERATIVO')
];

export const ESTADO_CONTRATO: EstadoContrato[] = [
  new EstadoContrato('Vigente'),
  new EstadoContrato('Finalizado'),
  new EstadoContrato('Cancelado')
];
