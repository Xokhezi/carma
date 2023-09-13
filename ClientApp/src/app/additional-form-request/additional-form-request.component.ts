import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  ApiClientService,
  SaveRequest,
  Request,
} from '../Services/api-client.service';

@Component({
  selector: 'app-additional-form-request',
  templateUrl: './additional-form-request.component.html',
  styleUrls: ['./additional-form-request.component.css'],
})
export class AdditionalFormRequestComponent {
  requestToSave: SaveRequest = {} as SaveRequest;
  updateSucces = false;
  @Output() requestUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  totalKm: number = this.data.totalKm;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Request,
    private apiClient: ApiClientService,
    private dialogRef: MatDialogRef<AdditionalFormRequestComponent>
  ) {}
  ngOnInit(): void {}
  updateRequest() {
    const { vehicle, ...dataWithoutVehicle } = this.data;
    this.requestToSave = {
      ...dataWithoutVehicle,
      totalKm: this.totalKm,
      vehicleId: this.data.vehicle.id,
    };
    this.apiClient
      .update<SaveRequest>(this.requestToSave, 'request' + '/' + this.data.id)
      .subscribe({
        next: () => {},
        complete: () => {
          this.updateSucces = true;
          this.requestUpdated.emit(this.updateSucces);
          this.dialogRef.close();
        },
        error: (err) => {
          this.updateSucces = false;
          this.requestUpdated.emit(this.updateSucces);
          console.log(err);
          this.dialogRef.close();
        },
      });
  }
}
