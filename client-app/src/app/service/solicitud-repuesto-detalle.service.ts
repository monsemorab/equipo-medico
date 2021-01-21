import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiRequestService} from "./api-request.service";
import {Observable} from "rxjs";
import {SolicitudRepuestoDetalle} from "../domain/solicitud-repuesto-detalle";

@Injectable({
  providedIn: 'root'
})
export class SolicitudRepuestoDetalleService {

  private urlRepuestosDet = environment.service_uri + '/solicitudrepuestosdetalles';


  constructor(private apiRequest: ApiRequestService) {
  }

  getAllSolicitudRepuestosDetByEquipoId(equipoId: number): Observable<SolicitudRepuestoDetalle[]> {
    const url = this.urlRepuestosDet + '/by-equipo?id=' + equipoId;
    return this.apiRequest.get(url);
  }

  getAllSolicitudRepuestosDetByEquipoIdAndFecha(equipoId: number, fehcaIni: any, fechaFin: any): Observable<SolicitudRepuestoDetalle[]> {
    const url = this.urlRepuestosDet + '/by-equipo-and-fecha?id=' + equipoId + '&fechaInicio=' + fehcaIni + '&fechaFin=' + fechaFin;
    return this.apiRequest.get(url);
  }

}
