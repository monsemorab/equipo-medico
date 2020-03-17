import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';
import {Observable} from 'rxjs';
import {Representante} from '../domain/representante';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  private urlRepresentantes = environment.service_uri + '/representantes';

  constructor(private apiRequest: ApiRequestService) {
  }


  /**
   * Se obtiene la lista de todos los representantes.
   */
  getAllRepresentantes(): Observable<Representante[]> {
    const url = this.urlRepresentantes;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene un representante por su ID.
   * @param representanteId
   */
  getRepresentanteById(representanteId: number): Observable<Representante> {
    const url = this.urlRepresentantes + '/' + representanteId;
    return this.apiRequest.get(url);
  }

  /**
   * Se crea un nuevo representante
   * @param representante
   */
  crearRepresentanteEquipo(representante: Representante): Observable<Representante> {
    const url = this.urlRepresentantes;
    return this.apiRequest.post(url, representante);
  }

  /**
   * Se editan los datos de un representante existente.
   * @param representante
   */
  editarRepresentanteoEquipo(representante: Representante): Observable<Representante> {
    const url = this.urlRepresentantes;
    return this.apiRequest.put(url, representante);
  }

}
