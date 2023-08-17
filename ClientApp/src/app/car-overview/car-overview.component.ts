import { Component } from '@angular/core';
import { Vehicle, VehicleService } from '../Services/vehicle.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-car-overview',
  templateUrl: './car-overview.component.html',
  styleUrls: ['./car-overview.component.css'],
})
export class CarOverviewComponent {
  loading = false;
  vehicles: Vehicle[] = [];
  emptyVehicle: Vehicle = {} as Vehicle;
  error = '';
  notificationStatus: any;
  notificationTimeout: any;

  constructor(
    private vehiclesService: VehicleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.geVehicles();
  }
  openDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: vehicle,
    });

    dialogRef.componentInstance.requestUpdated.subscribe((updateSuccess) => {
      this.handleNotification(updateSuccess);
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.geVehicles();
    });
  }
  geVehicles() {
    this.vehiclesService.getVehicles().subscribe({
      next: (vehicles) => (this.vehicles = vehicles),
      complete: () => (this.loading = false),
      error: (err) => {
        console.log(err);
        this.error = 'Něco se pokazilo, zkuste to prosím znovu.';
      },
    });
  }
  deleteVehicle(vehicle: Vehicle) {
    this.vehiclesService.deleteVehicle(vehicle.id).subscribe({
      next: () => {},
      complete: () => {
        this.geVehicles();
        this.handleNotification(true);
      },
      error: (err) => {
        console.log(err);
        this.handleNotification(false);
      },
    });
  }
  handleNotification(status: boolean) {
    status
      ? (this.notificationStatus = 'success')
      : (this.notificationStatus = 'error');
    clearTimeout(this.notificationTimeout);
    this.notificationTimeout = setInterval(() => {
      this.notificationStatus = null;
    }, 2000);
  }
}
