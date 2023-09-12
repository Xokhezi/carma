import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ApiClientService,
  SaveVehicle,
  Vehicle,
} from '../Services/api-client.service';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css'],
})
export class VehicleDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Vehicle,
    private apiClient: ApiClientService,
    private dialogRef: MatDialogRef<VehicleDialogComponent>
  ) {}
  vehicle: Vehicle = this.data;
  buttonLoading = false;
  buttonText = 'Uložit';
  updateSucces = false;
  @Output() requestUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  updateVehicle() {
    const { id, ...vehicleWithoutId } = this.vehicle;
    console.log(id);
    if (id != 0 && id != null && id != undefined) {
      this.apiClient
        .update<SaveVehicle>(vehicleWithoutId, 'vehicles' + '/' + id)
        .subscribe({
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
    } else {
      console.log(this.vehicle);
      this.apiClient.create<SaveVehicle>(this.vehicle, 'vehicles').subscribe({
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
}
