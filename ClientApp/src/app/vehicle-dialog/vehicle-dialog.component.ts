import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Vehicle, VehicleService } from '../Services/vehicle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css'],
})
export class VehicleDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Vehicle,
    public vehicleService: VehicleService,
    private dialogRef: MatDialogRef<VehicleDialogComponent>
  ) {}
  vehicle: Vehicle = this.data;
  buttonLoading = false;
  buttonText = 'Uložit';
  updateSucces = false;
  @Output() requestUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  updateVehicle() {
    const { id, ...vehicleWithoutId } = this.vehicle;
    this.vehicleService.updateVehicle(vehicleWithoutId, id).subscribe({
      next: () => {
        this.buttonLoading = true;
        this.buttonText = 'Ukládám...';
      },
      complete: () => {
        this.buttonLoading = false;
        this.buttonText = 'Uložit';
        this.updateSucces = true;
        this.requestUpdated.emit(this.updateSucces);
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err.error);
        this.buttonLoading = false;
        this.buttonText = 'Uložit';
        this.updateSucces = false;
        this.requestUpdated.emit(this.updateSucces);
        this.dialogRef.close();
      },
    });
  }
}
