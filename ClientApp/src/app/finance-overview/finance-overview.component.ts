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
  dateFrom: any;
  dateTo: any;
  requests: Request[] = [];
  privateRequest: Request[] = [];
  companyRequest: Request[] = [];
  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getRequests();
  }
  getRequests() {
    this.requests = [];
    this.requestService.getRequests(this.dateFrom, this.dateTo).subscribe({
      next: (requests) => {
        console.log('Received requests:', requests);
        this.requests = requests.filter((r) => r.status === 'Uzavřeno');
      },
      complete: () => {
        this.isLoading = false;
        this.privateRequest = this.filterRequests('Soukromá');
        this.companyRequest = this.filterRequests('Firemní');
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Něco se pokazilo, zkuste to prosím znovu.';
      },
    });
  }
  filterRequests(filter: string) {
    return this.requests.filter((r) => r.typeOfRequest === filter);
  }
}
