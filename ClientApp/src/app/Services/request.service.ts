import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle.service';
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
  constructor() {}
}
