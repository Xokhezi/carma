import { AdditionalFormRequestComponent } from './../additional-form-request/additional-form-request.component';
import { Component } from '@angular/core';
import {
  RequestService,
  Request,
  SaveRequest,
} from '../Services/request.service';
import { LoginService } from '../Services/login.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { MatDialog } from '@angular/material/dialog';
import { Vehicle, VehicleService } from '../Services/vehicle.service';

@Component({
  selector: 'app-request-overview',
  templateUrl: './request-overview.component.html',
  styleUrls: ['./request-overview.component.css'],
})
export class RequestOverviewComponent {
  requests: Request[] = [];
  departmentId = 0;
  notificationStatus: any;
  notificationTimeout: any;
  loading = true;
  error = '';
  assistantView = 'Approved' || 'Out'; //for assistant view switch
  user = this.login.getcurrentUser() || null;

  constructor(
    private requestService: RequestService,
    private active: ActivatedRoute,
    private login: LoginService,
    public dialog: MatDialog,
    public vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.login.validateUser()?.subscribe({
      next: (response: User) => {
        this.user!.Role = response.role;
        this.getRequests();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  openDialog(request: Request): void {
    const dialogRef = this.dialog.open(AdditionalFormRequestComponent, {
      data: request,
    });

    dialogRef.componentInstance.requestUpdated.subscribe((updateSuccess) => {
      updateSuccess
        ? (this.notificationStatus = 'success')
        : (this.notificationStatus = 'error');
      clearTimeout(this.notificationTimeout);
      this.notificationTimeout = setInterval(() => {
        this.notificationStatus = null;
      }, 2000);
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getRequests();
    });
  }
  //update request regarding request and action
  updateRequest(request: Request, action: string) {
    let saveRequest: SaveRequest = {
      ...request,
      status: '',
      vehicleId: request.vehicle.id,
    };
    saveRequest.status = action;
    this.requestService.updateRequest(saveRequest, request.id).subscribe({
      next: (response: any) => {
        this.getRequests();
      },
      error: (err) => {
        this.error = err.error;
        this.loading = false;
      },
      //pending aout parked
      complete: () => {
        this.loading = false;
        let status = '';
        if (action === 'Approved') {
          status = 'Pending';
        } else if (action === 'Out') {
          status = 'Out';
        } else if (action === 'Returned') {
          status = 'Parked';
          request.vehicle.stateOfKm =
            request.vehicle.stateOfKm + request.totalKm;
        }
        this.updateVehicle(request.vehicle, status);
      },
    });
  }
  //get request and filter them ragarding logged user
  getRequests() {
    this.requestService.getRequests().subscribe({
      next: (response: Request[]) => {
        this.requests = response;
        this.loading = true;
      },
      error: (err) => {
        this.error = err.error;
        this.loading = false;
      },
      complete: () => {
        if (this.user && this.user.Role === 'manager') {
          this.requests = this.requests.filter(
            (r: Request) =>
              r.departmentId.toString() == this.user!.DepartmentId &&
              r.status == 'New'
          );
        } else if (this.user && this.user.Role === 'assistant') {
          this.requests = this.requests.filter(
            (r: Request) => r.status == this.assistantView
          );
        }
        this.loading = false;
      },
    });
  }
  updateVehicle(vehicle: Vehicle, status: string) {
    const updatedVehicle = { ...vehicle, status: status };
    this.vehicleService.updateVehicle(updatedVehicle, vehicle.id).subscribe({
      next: (response: any) => {},
      error: (err) => {
        this.error = err.error;
      },
    });
  }
}
