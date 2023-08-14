import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle.service';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
export interface Request {
  id: number;
  vehicle: Vehicle;
  dateFrom: Date;
  dateTo: Date;
  dateOfRequest: Date;
  totalKm: number;
  travelFrom: string;
  travelTo: string;
  status: string;
  email: string;
  departmentId: number;
}
export interface SaveRequest {
  vehicleId: number;
  dateFrom: Date;
  dateTo: Date;
  totalKm: number;
  travelFrom: string;
  travelTo: string;
  status: string;
  email: string;
  departmentId: number;
}
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private apiClient: ApiClientService) {}
  getRequests(): Observable<Request[]> {
    return this.apiClient.getAll<Request[]>('request');
  }
  getSingleRequest(id: number) {
    return this.apiClient.getSingle<Request>('request' + '/' + id);
  }
  createRequest(request: SaveRequest) {
    return this.apiClient.create<SaveRequest>(request, 'request');
  }
  updateRequest(request: SaveRequest, id: number) {
    return this.apiClient.update<SaveRequest>(request, 'request' + '/' + id);
  }
  deleteRequest(id: Number) {
    return this.apiClient.delete('request' + '/' + id);
  }
}
