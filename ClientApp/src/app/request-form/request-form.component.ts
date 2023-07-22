import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService, SaveRequest } from '../Services/request.service';
import { Vehicle, VehicleService } from '../Services/vehicle.service';
import { LoginService, User } from '../Services/login.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
})
export class RequestFormComponent {
  error = '';
  id = 0;
  vehicles: Vehicle[] = [];
  user: User = this.loginService.getcurrentUser();
  request: SaveRequest = {} as SaveRequest;
  constructor(
    private active: ActivatedRoute,
    private requestService: RequestService,
    private vehicleService: VehicleService,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.request.email = this.user.Email;
    this.active.paramMap.subscribe((params: any) => {
      this.id = params.get('id?');
    });
    this.vehicleService.getVehicles().subscribe({
      next: (response: any) => {
        this.vehicles = response;
      },
      error: (err) => {
        this.error = err.error;
      },
    });
  }
  createRequest() {
    this.request.status = 'New';
    this.requestService.createRequest(this.request).subscribe({
      next: (response) => {
        console.log(response);
      },
      complete: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error;
      },
    });
  }
}
