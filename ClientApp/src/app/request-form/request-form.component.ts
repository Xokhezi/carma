import { Component } from '@angular/core';
import { LoginService, User } from '../Services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApiClientService,
  Favourite,
  SaveRequest,
  Vehicle,
} from '../Services/api-client.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
})
export class RequestFormComponent {
  error = '';
  isFavourite: boolean = false;
  isOpen: boolean = false;
  isFirstLoad = true;
  id = 0;
  vehicles: Vehicle[] = [];
  user: User = this.loginService.getcurrentUser() || ({} as User);
  request: SaveRequest = {} as SaveRequest;
  favourites: Favourite[] = [];
  isLoading = false;

  constructor(
    private active: ActivatedRoute,
    private apiClient: ApiClientService,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.request.email = this.user.Email || '';
    this.request.typeOfRequest = 'Firemní';
    this.active.paramMap.subscribe((params: any) => {
      this.id = params.get('id?');
    });
    this.getVehicles();
    this.getFavourites();
  }
  createRequest() {
    this.request.status = 'Nový';
    this.request.totalKm = 0;
    this.request.departmentId = parseInt(this.user.DepartmentId);
    this.apiClient.create<SaveRequest>(this.request, 'request').subscribe({
      complete: () => {
        if (this.isFavourite) this.createFavourite();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
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
  getVehicles() {
    this.apiClient
      .getAll<Vehicle[]>('vehicles?email=' + this.request.email)
      .subscribe({
        next: (response: Vehicle[]) => {
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
  getFavourites() {
    this.apiClient
      .getAll<Favourite[]>('favourites?email=' + this.request.email)
      .subscribe({
        next: (response: Favourite[]) => {
          this.isLoading = true;
          this.favourites = response;
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
  getStatusofVehicle(id: number) {
    console.log('fired');
    const today = new Date().toDateString();
    this.apiClient.getAll<any>('request/getavaible/' + id).subscribe({
      next: (response: any[]) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
        this.error = err.error;
      },
    });
  }
  createFavourite() {
    const favouriteToCreate = {
      id: 0,
      name: this.request.travelFrom + ' - ' + this.request.travelTo,
      from: this.request.travelFrom,
      to: this.request.travelTo,
      distance: this.request.totalKm,
      userEmail: this.request.email,
      description: this.request.description,
      vehicleId: this.request.vehicleId,
      typeOfRequest: this.request.typeOfRequest,
    };

    this.apiClient
      .create<Favourite>(favouriteToCreate, 'favourites')
      .subscribe({
        error: (err) => {
          console.log(err);
          this.error = err.error;
        },
      });
  }
  setFavourite() {
    this.isFavourite = !this.isFavourite;
  }
  toggleOpen() {
    this.isFirstLoad = false;
    this.isOpen = !this.isOpen;
  }
  setData(favourite: Favourite) {
    this.request.travelFrom = favourite.from;
    this.request.travelTo = favourite.to;
    this.request.totalKm = favourite.distance;
    this.request.description = favourite.description;
    this.request.vehicleId = favourite.vehicleId;
    this.request.typeOfRequest = favourite.typeOfRequest;
  }
}
