import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
export interface Favourite {
  id: number;
  name: string;
  from: string;
  to: string;
  distance: number;
  userEmail: string;
  description: string;
  vehicleId: number;
  typeOfRequest: string;
}
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
  description: string;
  typeOfRequest: string;
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
  description: string;
  typeOfRequest: string;
}
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
export class ApiClientService {
  url = 'https://localhost:7018/api/';
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAll<T>(url: string) {
    return this.http.get<T>(this.url + url, this.loginService.getValidation());
  }
  getSingle<T>(url: string) {
    return this.http.get(this.url + url, this.loginService.getValidation());
  }
  getExternalSingle(url: string) {
    return this.http.get(url, this.loginService.getValidation());
  }
  delete(url: string) {
    return this.http.delete(this.url + url, this.loginService.getValidation());
  }
  create<T>(data: T, url: string) {
    return this.http.post(
      this.url + url,
      data,
      this.loginService.getValidation()
    );
  }
  update<T>(data: T, url: string) {
    return this.http.put(
      this.url + url,
      data,
      this.loginService.getValidation()
    );
  }
}
