import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
export interface Vehicle {
  id: number;
  plate: string;
  type: string;
  stateOfKm: number;
  status: string;
  owner: string;
}
export interface SaveVehicle {
  plate: string;
  type: string;
  stateOfKm: number;
  status: string;
  owner: string;
}
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private apiClient: ApiClientService) {}
  getVehicles(email?: string) {
    return this.apiClient.getAll<Vehicle[]>('vehicles?email=' + email);
  }
  getSingleVehicle(id: number) {
    return this.apiClient.getSingle<Vehicle>('vehicles' + '/' + id);
  }
  createVehicle(vehicle: SaveVehicle) {
    return this.apiClient.create<SaveVehicle>(vehicle, 'vehicles');
  }
  updateVehicle(vehicle: SaveVehicle, id: number) {
    return this.apiClient.update<SaveVehicle>(vehicle, 'vehicles' + '/' + id);
  }
  deleteVehicle(id: Number) {
    return this.apiClient.delete('vehicles' + '/' + id);
  }
}
