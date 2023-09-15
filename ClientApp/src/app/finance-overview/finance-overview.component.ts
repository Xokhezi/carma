import { Component } from '@angular/core';
import { ApiClientService, Request } from '../Services/api-client.service';

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
  departmentRecords: any[] = [];
  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getData();
    this.getDepartment(17);
  }
  getData() {
    this.isLoading = true;
    this.getRequests();
    this.departmentsSummary();
  }
  getRequests() {
    this.requests = [];
    this.apiClient
      .getAll<Request[]>(
        `request?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}`
      )
      .subscribe({
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
  departmentsSummary() {
    this.isLoading = true;
    this.apiClient
      .getAll<any[]>(
        `request/departmentSummary?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}`
      )
      .subscribe({
        next: (departments) => {
          console.log('Received departments:', departments);
          this.departmentRecords = departments;
        },
        complete: () => {
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Něco se pokazilo, zkuste to prosím znovu.';
        },
      });
  }
  getDepartment(id: number) {
    let departmentNumber = '';
    this.apiClient
      .getExternalSingle(
        'https://sw02660.global.hvwan.net/validator/api/departments/' + id
      )
      .subscribe({
        next: (department: any) => {
          departmentNumber = department.number;
        },
        complete: () => {
          console.log(departmentNumber);
          return departmentNumber;
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Něco se pokazilo, zkuste to prosím znovu.';
        },
      });
  }
}
