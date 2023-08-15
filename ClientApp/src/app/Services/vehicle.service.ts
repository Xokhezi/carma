import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
export interface Vehicle {
  id: number;
  plate: string;
  type: string;
  stateOfKm: number;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private apiClient: ApiClientService) {}
  getVehicles() {
    return this.apiClient.getAll<Vehicle[]>('vehicles');
  }
  getSingleVehicle(id: number) {
    return this.apiClient.getSingle<Vehicle>('vehicles' + '/' + id);
  }
  createVehicle(vehicle: Vehicle) {
    return this.apiClient.create<Vehicle>(vehicle, 'vehicles');
  }
  updateVehicle(vehicle: Vehicle, id: number) {
    return this.apiClient.update<Vehicle>(vehicle, 'vehicles' + '/' + id);
  }
  deleteVehicle(id: Number) {
    return this.apiClient.delete('vehicles' + '/' + id);
  }
}
