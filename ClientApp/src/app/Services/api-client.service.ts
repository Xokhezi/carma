import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAll<T>(url: string) {
    return this.http.get(url, this.loginService.getValidation());
  }
  getSingle<T>(url: string) {
    return this.http.get(url, this.loginService.getValidation());
  }
  delete(url: string) {
    return this.http.delete(url, this.loginService.getValidation());
  }
  create<T>(data: T, url: string) {
    return this.http.post(url, data, this.loginService.getValidation());
  }
  update<T>(data: T, url: string) {
    return this.http.put(url, data, this.loginService.getValidation());
  }
}
