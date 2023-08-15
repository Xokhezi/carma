import { Component } from '@angular/core';
import { Vehicle, VehicleService } from '../Services/vehicle.service';

@Component({
  selector: 'app-car-overview',
  templateUrl: './car-overview.component.html',
  styleUrls: ['./car-overview.component.css'],
})
export class CarOverviewComponent {
  loading = false;
  vehicles: Vehicle[] = [];
  error = '';
  constructor(private vehiclesService: VehicleService) {}
  ngOnInit(): void {
    this.loading = true;
    this.vehiclesService.getVehicles().subscribe({
      next: (vehicles) => (this.vehicles = vehicles),
      complete: () => (this.loading = false),
      error: (err) => {
        console.log(err);
        this.error = 'Něco se pokazilo, zkuste to prosím znovu.';
      },
    });
  }
}
