/** Mock data*/
import {Equipo} from "../../domain/equipo";
import {Contrato, EstadoContrato} from "../../domain/contrato";
import {Representante} from "../../domain/representante";
import {TipoEquipo} from "../../domain/tipo-equipo";
import {ModeloEquipo} from "../../domain/modelo-equipo";
import {Ubicacion} from "../../domain/ubicacion";
import {Servicio} from "../../domain/orden-trabajo";
import {SolicitudRepuesto, SolicitudServicio} from "../../domain/solicitud";
import {Repuesto} from "../../domain/repuesto";


export const SERVICIO: Servicio [] = [
  new Servicio('PREVENTIVO'),
  new Servicio('CORRECTIVO')
]

export const ESTADO_CONTRATO: EstadoContrato[] = [
  new EstadoContrato('Vigente'),
  new EstadoContrato('Finalizado'),
  new EstadoContrato('Cancelado')
];

export const CONTRATOS: Contrato[] = [
  new Contrato(1, 100, 'LIC.01', 'Proc.1', ESTADO_CONTRATO[0].nombre, '', '', [], '13/05/2017',
    '13/12/2017'),
  new Contrato(2, 101, 'LIC.02', 'Proc.2', ESTADO_CONTRATO[0].nombre, '', '', [], '13/05/2017',
    '13/12/2017'),
  new Contrato(3, 102, 'LIC.03', 'Proc.3', ESTADO_CONTRATO[0].nombre, '', '', [], '13/05/2017',
    '13/12/2017'),
  new Contrato(4, 103, 'LIC.04', 'Proc.4', ESTADO_CONTRATO[0].nombre, '', '', [], '13/05/2017',
    '13/12/2017'),
  new Contrato(5, 104, 'LIC.05', 'Proc.5', ESTADO_CONTRATO[0].nombre, '', '', [], '13/05/2017',
    '13/12/2017')
];

export const REPRESENTANTES: Representante[] = [
  new Representante(1, 'Juan Perez', ' ', ' ', '')
];

export const TIPO_EQUIPOS: TipoEquipo[] = [
  new TipoEquipo(1, 'Dialisis', 'Dialisis', ' ', '', ' ', '', ' '),
  new TipoEquipo(2, 'AXC', 'AXC', ' ', '', ' ', '', ' '),
  new TipoEquipo(3, 'ABC', 'ABC', ' ', '', ' ', '', ' ')
];

export const MODELOS: ModeloEquipo[] = [
  new ModeloEquipo(1, 'XP-234', 'X', ' ', ''),
  new ModeloEquipo(2, 'XP-111', 'Y', ' ', ''),
  new ModeloEquipo(3, 'XP-689', 'Z', ' ', '')
];

export const UBICACIONES: Ubicacion[] = [
  new Ubicacion(1, '', '', 'Sala1', ''),
  new Ubicacion(2, '', '', 'Sala2', ''),
  new Ubicacion(3, '', '', 'Sala3', ''),
  new Ubicacion(4, '', '', 'Sala4', '')
];

export const EQUIPOS: Equipo[] = [
  new Equipo(1, 123, null, null, '', '', '', '', null,
    REPRESENTANTES[0], TIPO_EQUIPOS[0], MODELOS[0], UBICACIONES[0], CONTRATOS[0], '21/01/2015', '', '', ''),
  new Equipo(2, 456, null, null, '', '', '', '', null,
    REPRESENTANTES[0], TIPO_EQUIPOS[0], MODELOS[1], UBICACIONES[0], CONTRATOS[1], '', '', '', ''),
  new Equipo(3, 678, null, null, '', '', '', '', null,
    REPRESENTANTES[0], TIPO_EQUIPOS[1], MODELOS[1], UBICACIONES[1], CONTRATOS[2], '', '', '', ''),
  new Equipo(4, 891, null, null, '', '', '', '', null,
    REPRESENTANTES[0], TIPO_EQUIPOS[2], MODELOS[0], UBICACIONES[1], CONTRATOS[3], '', '', '', ''),
  new Equipo(5, 233, null, null, '', '', '', '', null,
    REPRESENTANTES[0], TIPO_EQUIPOS[0], MODELOS[0], UBICACIONES[0], CONTRATOS[4], '', '', '', '')
];

export const REPUESTOS: Repuesto[] = [
  new Repuesto(1, '100', 'articulo1', 0, 1, 0, TIPO_EQUIPOS[0], MODELOS[0],
    REPRESENTANTES[0], ''),
  new Repuesto(2, '101', 'articulo2', 0, 1, 0, TIPO_EQUIPOS[1], MODELOS[1],
    REPRESENTANTES[0], '')
];

export const SOLICITUD_REPUESTOS: SolicitudRepuesto[] = [
  new SolicitudRepuesto(1, 'vigente', 'solicitud repuesto', REPUESTOS, '')
];

export const SOLICITUD_SERVICIO: SolicitudServicio[] = [
  new SolicitudServicio(1, 'vigente', 'solicitud servicio', REPRESENTANTES[0], '')
]
