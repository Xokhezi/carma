import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: any;
  invalidCredintials = false;

  ngOnInit(): void {
    this.credentials = {};
    this.loginService.validateUser().subscribe((r: any) => {});
  }

  constructor(private loginService: LoginService, private route: Router) {}
  login() {
    this.loginService.login(this.credentials).subscribe(
      (r: any) => {
        localStorage.setItem('token', r.token);
        this.route.navigate(['']);
      },
      (error: any) => {
        if (error.status === 401) {
          this.invalidCredintials = true;
        }
      }
    );
  }
}
