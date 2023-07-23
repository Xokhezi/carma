import { Component } from '@angular/core';
import {
  RequestService,
  Request,
  SaveRequest,
} from '../Services/request.service';
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
  constructor(
    private requestService: RequestService,
    private active: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getRequests();
    this.active.paramMap.subscribe((params: any) => {
      this.departmentId = params.get('departmentId?');
    });
  }
  updateRequest(request: Request, id: number, action: string) {
    let saveRequest: SaveRequest = {
      vehicleId: request.vehicle.id,
      email: request.email,
      status: '',
      dateOfRequest: request.dateOfRequest,
      travelFrom: request.travelFrom,
      travelTo: request.travelTo,
      totalKm: request.totalKm,
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
        this.requests = response;
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
