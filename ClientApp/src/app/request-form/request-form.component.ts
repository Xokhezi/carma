import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaveRequest } from '../Services/request.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
})
export class RequestFormComponent {
  id = 0;
  request: SaveRequest = {} as SaveRequest;
  constructor(private active: ActivatedRoute) {}
  ngOnInit(): void {
    this.active.paramMap.subscribe((params: any) => {
      this.id = params.get('id?');
    });
  }
}
