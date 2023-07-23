import { Component } from '@angular/core';
import { RequestService, Request } from '../Services/request.service';

@Component({
  selector: 'app-request-overview',
  templateUrl: './request-overview.component.html',
  styleUrls: ['./request-overview.component.css'],
})
export class RequestOverviewComponent {
  requests: Request[] = [];
  loading = true;
  error = '';
  constructor(private requestService: RequestService) {}
  ngOnInit(): void {
    this.getRequests();
  }
  updateRequest(request: any, id: number, action: string) {
    action === 'Approved'
      ? (request.status = 'Approved')
      : (request.status = 'Denied');
    this.requestService.updateRequest(request, id).subscribe({
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
