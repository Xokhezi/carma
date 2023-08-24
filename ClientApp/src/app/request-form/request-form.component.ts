import { Component } from '@angular/core';
import { RequestService, SaveRequest } from '../Services/request.service';
import { Vehicle, VehicleService } from '../Services/vehicle.service';
import { LoginService, User } from '../Services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Favourite, FavouritesService } from '../Services/favourites.service';

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
    private requestService: RequestService,
    private vehicleService: VehicleService,
    private favouriteService: FavouritesService,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.request.email = this.user.Email || '';
    this.request.typeOfRequest = 'company';
    this.active.paramMap.subscribe((params: any) => {
      this.id = params.get('id?');
    });
    this.getVehicles();
    this.getFavourites();
  }
  createRequest() {
    this.request.status = 'New';
    this.request.totalKm = 0;
    this.request.departmentId = parseInt(this.user.DepartmentId);
    this.requestService.createRequest(this.request).subscribe({
      complete: () => {
        if (this.isFavourite) this.createFavourite();
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
  getVehicles() {
    this.vehicleService.getVehicles(this.request.email).subscribe({
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
    this.favouriteService.getFavourites(this.request.email).subscribe({
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
  createFavourite() {
    const favouriteToCreate = {
      id: 0,
      name: this.request.travelFrom + ' - ' + this.request.travelTo,
      from: this.request.travelFrom,
      to: this.request.travelTo,
      distance: this.request.totalKm,
      userEmail: this.request.email,
    };

    this.favouriteService.createFavourite(favouriteToCreate).subscribe({
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
  }
}
