import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface User {
  Email: string;
  Role: string;
  DepartmentId: string;
}
export interface UserRole {
  role: string;
}
interface UserValidation {
  email: string;
  appName: string;
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(credentials: any) {
    return this.http.post(
      'https://sw02660.global.hvwan.net/validator/api/auth',
      credentials
    );
  }
  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    let jwtHelper = new JwtHelperService();

    if (token) return true;
    else return false;
  }
  getcurrentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    let jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token) as User;
  }
  validateUser() {
    const email = this.getcurrentUser()!.Email;
    const appName = 'carma';
    const url =
      'https://sw02660.global.hvwan.net/validator/api/accessvalidation?email=' +
      encodeURIComponent(email) +
      '&appName=' +
      appName;

    if (!email) return null;
    return this.http.get<UserRole>(url);
  }
  getValidation() {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.append('Authorization', 'Bearer ' + token);
    let options = { headers: headers };

    return options;
  }
}
