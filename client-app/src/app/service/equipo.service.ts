import {Injectable} from '@angular/core';
import {EQUIPOS, MODELOS, TIPO_EQUIPOS} from "../utils/mock-data/mock-data";
import {Observable} from "rxjs/Observable";
import {Equipo} from "../domain/equipo";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {TipoEquipo} from "../domain/tipo-equipo";
import {ModeloEquipo} from "../domain/modelo-equipo";
import {Ubicacion} from "../domain/ubicacion";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class EquipoService {

  private equipos = EQUIPOS;
  private tipoEquipos = TIPO_EQUIPOS;
  private modeloEquipos = MODELOS;
  private url = environment.service_uri + '/equipos/';


  constructor(private http: HttpClient) {
  }

  /**
   * Se obtiene todos los equipos.
   * @returns {Observable<Equipo[]>}
   */
  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.url);
  }

  /**
   * TODO: falta un endpoint para obtener esta lista
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
    return this.getEquipos().map(equipos => equipos.find(equipo => equipo.id == equipoId));
  }

  /**
   * TODO: falta un endpoint para obtener esta lista
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
    return this.getTipoEquipos().map(tipos => tipos.find(tipo => tipo.id == tipoEquipoId));
  }

  /**
   * TODO: falta un endpoint para obtener esta lista
   * Se obtiene la lista de modelos para los equipos.
   * @returns {Observable<ModeloEquipo[]>}
   */
  getModeloEquipos(): Observable<ModeloEquipo[]> {
    return Observable.of(this.modeloEquipos);
  }

  /**
   * Se obtiene el modelo del equipo por su Id.
   * @param {number} modeloEquipoId
   * @returns {Observable<ModeloEquipo>}
   */
  getModeloEquipoById(modeloEquipoId: number): Observable<ModeloEquipo> {
    return this.getModeloEquipos().map(modelos => modelos.find(modelo => modelo.id == modeloEquipoId));
  }

  /**
   * TODO: falta un endpoint para obtener esta lista
   * Se obtiene la lista de las ubicaciones de los equipos.
   * @returns {Observable<Ubicacion[]>}
   */
  getAllUbicaciones(): Observable<Ubicacion[]> {
    return null;
  }

  /**
   * Se obtiene la ubicación del equipo por su Id.
   * @param {number} ubicacionId
   * @returns {Observable<Ubicacion>}
   */
  getUbicacionById(ubicacionId: number): Observable<Ubicacion> {
    return null;
  }
}
