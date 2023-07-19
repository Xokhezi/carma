import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    return jwtHelper.decodeToken(token);
  }
  validateUser() {
    let user = this.getcurrentUser();
    let userForValidation;
    user
      ? (userForValidation = { email: user.Email })
      : (userForValidation = { email: '' });
    return this.http.post(
      'https://sw02660.global.hvwan.net/telsorcore/api/validation',
      userForValidation
    );
  }
  validateAdmin() {
    let user = this.getcurrentUser();
    let userForValidation;
    user
      ? (userForValidation = { email: user.Email })
      : (userForValidation = { email: '' });
    return this.http.post(
      'https://sw02660.global.hvwan.net/telsorcore/api/validation/admin',
      userForValidation
    );
  }
  getValidation() {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.append('Authorization', 'Bearer ' + token);
    let options = { headers: headers };

    return options;
  }
}
