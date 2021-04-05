import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Equipo} from '../domain/equipo';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';
import {ParamsBusquedaEquipo} from '../domain/ParamsBusquedaEquipo';

@Injectable()
export class EquipoService {
  private urlEquipos = environment.service_uri + '/equipos/';

  private emitSiExisteListaEquipos = new BehaviorSubject<boolean>(false);
  emittedSiExisteListaEquipos = this.emitSiExisteListaEquipos.asObservable();

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtienen todos los equipos.
   * @returns {Observable<Equipo[]>}
   */
  getAllEquipos(): Observable<Equipo[]> {
    return this.apiRequest.get(this.urlEquipos);
  }

  /**
   * Se obtiene la lista de los equipos nuevos o sin contratos.
   * @returns {Observable<Equipo[]>}
   */
  getEquiposSinContratos(): Observable<Equipo[]> {
    const url = this.urlEquipos + 'sincontrato';
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene un equipo por su Id.
   * @param {number} equipoId
   * @returns {Observable<Equipo>}
   */
  getEquipoById(equipoId: number): Observable<Equipo> {
    const url = this.urlEquipos + equipoId;
    return this.apiRequest.get(url);
  }

  /**
   * Se busca un equipo deacuerdo a los parametros de busqueda enviados.
   * @param params
   */
  getEquipoByParams(params: ParamsBusquedaEquipo): Observable<Equipo> {
    let url = this.urlEquipos;
    let param = '';
    if(params.numeroSerie !== '' && params.numeroPatrimonial === '') {
      param = params.numeroSerie;
      url = url + 'by-numero-serie/' + param;
    } else if(params.numeroSerie === '' && params.numeroPatrimonial !== '') {
      param = params.numeroPatrimonial;
      url = url + 'by-numero/patrimonial/' + param;
    } else {
      url = url + 'by-numero-serie/by-numero/patrimonial/' + params.numeroSerie + '/' + params.numeroPatrimonial;
    }
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene la lista de equipos filtrados
   * @param filtro
   */
  getEquiposFiltrados(filtro: string): Observable<Equipo[]> {
    const url = this.urlEquipos + 'by-filter?' + filtro;
    return this.apiRequest.get(url);
  }

  cambioEstadoEquipo(equipo: Equipo): Observable<Equipo> {
    const url = this.urlEquipos+'cambio-estado?equipoId='+equipo.id+'&estado='+equipo.estado;
    return this.apiRequest.post(url, equipo);
  }

  /**
   * Se crea un nuevo equipo con los datos introducidos en el formulario.
   * @param {Equipo} equipo
   * @returns {Observable<Equipo>}
   */
  crearEquipo(equipo: Equipo): Observable<Equipo> {
    const url = this.urlEquipos;
    return this.apiRequest.post(url, equipo);
  }

  /**
   * Se actualiza los datos de un equipo existente.
   * @param {Equipo} equipo
   * @returns {Observable<Equipo>}
   */
  editarEquipo(equipo: Equipo): Observable<Equipo> {
    const url = this.urlEquipos;
    return this.apiRequest.put(url, equipo);
  }

  /**
   * Cuando se crea un nuevo equipo, se avisa a la pagina home que peude mostrar la lista de equipos al presionar
   * sobre el boton Equipos dl menú lateral
   * @param change
   */
  emitExisteListaEquipos(change: boolean) {
    this.emitSiExisteListaEquipos.next(change);
  }

}
