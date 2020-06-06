import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiRequestService} from "./api-request.service";
import {Observable} from "rxjs";
import {Mantenimiento} from "../domain/mantenimiento";

@Injectable({
  providedIn: 'root'
})
export class ManteniminetoService {

  private urlMantenimineto = environment.service_uri + '/api/mantenimientos';

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se crea un mantenimineto
   * @param mantenimiento
   */
  crearMantenimineto(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    const url = this.urlMantenimineto+'/';
    return this.apiRequest.post(url, mantenimiento);
  }

  /**
   * Se actualizan los datos de un mantenimiento existente.
   * @param ordenTrabajo
   */
  editarMantenimineto(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    const url = this.urlMantenimineto +'/';
    return this.apiRequest.put(url, mantenimiento);
  }
}
