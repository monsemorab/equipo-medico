/** Mock data*/

import {EstadoContrato} from '../../domain/contrato';
import {EstadoOrdenTrabajo, TipoServicio} from '../../domain/orden-trabajo';
import {EstadoSolicitud} from "../../domain/solicitud-repuesto";




export const SERVICIO: TipoServicio [] = [
  new TipoServicio('PREVENTIVO'),
  new TipoServicio('OPERATIVO')
];

export const ESTADO_CONTRATO: EstadoContrato[] = [
  new EstadoContrato('Vigente'),
  new EstadoContrato('Finalizado'),
  new EstadoContrato('Cancelado')
];

export const ESTADO_EDIT_SOLICITUD: EstadoSolicitud[] = [
  new EstadoSolicitud('Pendiente'),
  new EstadoSolicitud('Cancelado')
];

export const ESTADO_ORDEN_ATENDIDA: EstadoOrdenTrabajo[] = [
  new EstadoOrdenTrabajo('En Proceso'),
  new EstadoOrdenTrabajo('Finalizado')
];
