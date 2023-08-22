import { Component } from '@angular/core';
import { RequestService, SaveRequest } from '../Services/request.service';
import { Vehicle, VehicleService } from '../Services/vehicle.service';
import { LoginService, User } from '../Services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
})
export class RequestFormComponent {
  error = '';
  id = 0;
  vehicles: Vehicle[] = [];
  user: User = this.loginService.getcurrentUser() || ({} as User);
  request: SaveRequest = {} as SaveRequest;
  isLoading = false;

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
        this.isLoading = true;
        this.vehicles = response;
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error;
      },
    });
  }
  createRequest() {
    this.request.status = 'New';
    this.request.totalKm = 0;
    this.request.departmentId = parseInt(this.user.DepartmentId);
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
  checkDates() {
    if (this.request.dateFrom && this.request.dateTo) {
      if (this.request.dateFrom > this.request.dateTo) {
        this.error = 'Datum od nesmí být větší než datum do!';
      } else {
        this.error = '';
      }
    }
  }
}
