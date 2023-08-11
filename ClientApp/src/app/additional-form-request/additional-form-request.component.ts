import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-additional-form-request',
  templateUrl: './additional-form-request.component.html',
  styleUrls: ['./additional-form-request.component.css'],
})
export class AdditionalFormRequestComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Request) {}
  ngOnInit(): void {
    console.log(this.data);
  }
}
