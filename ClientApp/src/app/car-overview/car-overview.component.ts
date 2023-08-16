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
  error = '';
  notificationStatus: any;
  notificationTimeout: any;

  constructor(
    private vehiclesService: VehicleService,
    public dialog: MatDialog
  ) {}

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
  openDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: vehicle,
    });

    dialogRef.componentInstance.requestUpdated.subscribe((updateSuccess) => {
      updateSuccess
        ? (this.notificationStatus = 'success')
        : (this.notificationStatus = 'error');
      clearTimeout(this.notificationTimeout);
      this.notificationTimeout = setInterval(() => {
        this.notificationStatus = null;
      }, 2000);
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
