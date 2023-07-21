import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
export interface Vehicle {
  id: number;
  plate: string;
  type: string;
  stateOfKm: number;
}
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private apiClient: ApiClientService) {}
  getVehicles() {
    return this.apiClient.getAll<Vehicle[]>('/api/vehicles');
  }
  getSingleVehicle(id: number) {
    return this.apiClient.getSingle<Vehicle>('/api/vehicles' + '/' + id);
  }
  createVehicle(vehicle: Vehicle) {
    return this.apiClient.create<Vehicle>(vehicle, '/api/vehicles');
  }
  updateVehicle(vehicle: Vehicle, id: number) {
    return this.apiClient.update<Vehicle>(vehicle, '/api/vehicles' + '/' + id);
  }
  deleteVehicle(id: Number) {
    return this.apiClient.delete('/api/vehicles' + '/' + id);
  }
}
