import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded = false;
  isLoged = false;
  user: any;

  constructor(public loginService: LoginService) {}

  ngOnInit(): void {
    this.isLoged = this.loginService.isLoggedIn();
    this.user = this.loginService.getcurrentUser();
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.loginService.logout();
  }
  redirectToExternalUrl(url: string) {
    window.location.href = url;
  }
}
