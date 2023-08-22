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
  isLoading = false;

  ngOnInit(): void {
    this.credentials = {};
    this.loginService.validateUser()?.subscribe((r: any) => {});
  }

  constructor(private loginService: LoginService, private route: Router) {}
  login() {
    this.loginService.login(this.credentials).subscribe({
      next: (r: any) => {
        this.isLoading = true;
        localStorage.setItem('token', r.token);
      },
      complete: () => {
        this.isLoading = false;
        this.route.navigate(['']);
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.invalidCredintials = true;
        }
      },
    });
  }
}
