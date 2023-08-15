import { Component, Inject } from '@angular/core';
import { Vehicle } from '../Services/vehicle.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css'],
})
export class VehicleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Vehicle) {}
  vehicle: Vehicle = this.data;
}
