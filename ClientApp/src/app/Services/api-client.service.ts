import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

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
