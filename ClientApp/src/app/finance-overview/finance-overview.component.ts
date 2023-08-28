import { Component } from '@angular/core';
import { Request, RequestService } from '../Services/request.service';

@Component({
  selector: 'app-finance-overview',
  templateUrl: './finance-overview.component.html',
  styleUrls: ['./finance-overview.component.css'],
})
export class FinanceOverviewComponent {
  isLoading = false;
  error = '';
  requests: Request[] = [];
  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getRequests();
  }
  getRequests() {
    this.requestService.getRequests().subscribe({
      next: (requests) =>
        (this.requests = requests.filter((r) => r.status === 'Closed')),
      complete: () => (this.isLoading = false),
      error: (err) => {
        this.isLoading = false;
        this.error = 'Něco se pokazilo, zkuste to prosím znovu.';
      },
    });
  }
}
