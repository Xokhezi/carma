import { Injectable } from '@angular/core';
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
  constructor() {}
}
