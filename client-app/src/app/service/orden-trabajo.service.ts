import { Injectable } from '@angular/core';
import {ApiRequestService} from "./api-request.service";

@Injectable()
export class OrdenTrabajoService {

  constructor(private apiRequest: ApiRequestService) { }

}
