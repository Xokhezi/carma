import { Component } from '@angular/core';
import {
  RequestService,
  Request,
  SaveRequest,
} from '../Services/request.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-request-overview',
  templateUrl: './request-overview.component.html',
  styleUrls: ['./request-overview.component.css'],
})
export class RequestOverviewComponent {
  requests: Request[] = [];
  departmentId = 0;
  loading = true;
  error = '';
  user = this.login.getcurrentUser();
  constructor(
    private requestService: RequestService,
    private active: ActivatedRoute,
    private login: LoginService
  ) {}
  ngOnInit(): void {
    this.getRequests();
    this.active.paramMap.subscribe((params: any) => {
      this.departmentId = params.get('departmentId?');
    });
  }
  updateRequest(request: Request, id: number, action: string) {
    let saveRequest: SaveRequest = {
      ...request,
      status: '',
      vehicleId: request.vehicle.id,
    };
    action === 'Approved'
      ? (saveRequest.status = 'Approved')
      : (saveRequest.status = 'Denied');
    this.requestService.updateRequest(saveRequest, id).subscribe({
      next: (response: any) => {
        this.getRequests();
      },
      error: (err) => {
        this.error = err.error;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  getRequests() {
    this.requestService.getRequests().subscribe({
      next: (response: any) => {
        this.requests = response.filter(
          (r: any) => r.departmentId == this.user.DepartmentId
        );
        this.loading = true;
      },
      error: (err) => {
        this.error = err.error;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
