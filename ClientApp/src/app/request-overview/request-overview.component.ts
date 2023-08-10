import { Component } from '@angular/core';
import {
  RequestService,
  Request,
  SaveRequest,
} from '../Services/request.service';
import { LoginService } from '../Services/login.service';
import { ActivatedRoute } from '@angular/router';

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
  user = this.login.getcurrentUser() || null;
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
    this.login.validateUser()?.subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: any) => {
        console.log(err);
      },
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
      complete: () => {
        this.loading = false;
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
            (r: Request) => r.departmentId.toString() == this.user!.DepartmentId
          );
        } else if (this.user && this.user.Role === 'assistant') {
          this.requests = this.requests.filter(
            (r: Request) => r.status == 'Approved'
          );
        }
        this.loading = false;
      },
    });
  }
}
