import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle.service';
import { ApiClientService } from './api-client.service';
export interface Request {
  id: number;
  vehicle: Vehicle;
  dateOfRequest: Date;
  totalKm: number;
  travelFrom: string;
  travelTo: string;
  status: string;
}
export interface SaveRequest {
  vehicleId: number;
  dateOfRequest: Date;
  totalKm: number;
  travelFrom: string;
  travelTo: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private apiClient: ApiClientService) {}
  getRequests() {
    return this.apiClient.getAll<Request[]>('/api/request');
  }
  getSingleRequest(id: number) {
    return this.apiClient.getSingle<Request>('/api/request' + '/' + id);
  }
  createRequest(request: SaveRequest) {
    return this.apiClient.create<SaveRequest>(request, '/api/request');
  }
  updateRequest(request: SaveRequest, id: number) {
    return this.apiClient.update<SaveRequest>(
      request,
      '/api/request' + '/' + id
    );
  }
  deleteRequest(id: Number) {
    return this.apiClient.delete('/api/request' + '/' + id);
  }
}
