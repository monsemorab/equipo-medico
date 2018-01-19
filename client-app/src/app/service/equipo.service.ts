import {Injectable} from '@angular/core';
import {EQUIPOS, MODELOS, TIPO_EQUIPOS} from "../utils/mock-data/mock-data";
import {Observable} from "rxjs/Observable";
import {Equipo} from "../domain/equipo";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TipoEquipo} from "../domain/tipo-equipo";
import {ModeloEquipo} from "../domain/modelo-equipo";

@Injectable()
export class EquipoService {

  private equipos = EQUIPOS;
  private tipoEquipos = TIPO_EQUIPOS;
  private modeloEquipos = MODELOS;

  // Observable Equipo sources
  private emitChangeSource = new BehaviorSubject<Equipo>(null);
  // Observable Equipo streams
  changeEmittedEquipo = this.emitChangeSource.asObservable();

  // Observable boolean sources
  private emitChangeSourceEdit = new BehaviorSubject<boolean>(null);
  // Observable boolean streams
  changeEmittedEdit = this.emitChangeSourceEdit.asObservable();

  constructor() {
  }

  /**
   * Se obtiene todos los equipos.
   * @returns {Observable<Equipo[]>}
   */
  getEquipos(): Observable<Equipo[]> {
    return Observable.of(this.equipos);
  }

  /**
   * Se obtiene la lista de los equipos nuevos o sin contratos.
   * @returns {Observable<Equipo[]>}
   */
  getEquiposSinContratos(): Observable<Equipo[]> {
    return Observable.of(this.equipos);
  }

  /**
   * Se obtiene un equipo por su Id.
   * @param {number} equipoId
   * @returns {Observable<Equipo>}
   */
  getEquipoById(equipoId: number): Observable<Equipo> {
    return this.getEquipos().map(equipos => equipos.find(equipo => equipo.id === equipoId));
  }

  /**
   * Se obtiene la lista de tipos de equipos.
   * @returns {Observable<TipoEquipo[]>}
   */
  getTipoEquipos(): Observable<TipoEquipo[]> {
    return Observable.of(this.tipoEquipos);
  }

  /**
   * Se obtiene el tipo del equipo por su Id.
   * @param {number} tipoEquipoId
   * @returns {Observable<TipoEquipo>}
   */
  getTipoEquipoById(tipoEquipoId: number): Observable<TipoEquipo> {
    return this.getTipoEquipos().map(tipos => tipos.find(tipo => tipo.id === tipoEquipoId));
  }

  /**
   * Se obtiene la lista de modelos para los equipos.
   * @returns {Observable<ModeloEquipo[]>}
   */
  getModeloEquipos(): Observable<ModeloEquipo[]> {
    return Observable.of(this.modeloEquipos);
  }


  getModeloEquipoById(modeloEquipoId: number): Observable<ModeloEquipo> {
    return this.getModeloEquipos().map(modelos => modelos.find(modelo => modelo.id === modeloEquipoId));
  }

  /**
   * Se utiliza para notificar cuando un equipo es seleccionado para su edición.
   * @param {Equipo} equipo
   */
  emitChangeEquipo(equipo: Equipo) {
    this.emitChangeSource.next(equipo);
  }

  /**
   * Notifica si es una edición.
   * @param {boolean} change
   */
  emitChangeEdit(change: boolean) {
    this.emitChangeSourceEdit.next(change);
  }
}
