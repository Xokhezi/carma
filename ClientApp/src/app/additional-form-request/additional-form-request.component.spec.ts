import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalFormRequestComponent } from './additional-form-request.component';

describe('AdditionalFormRequestComponent', () => {
  let component: AdditionalFormRequestComponent;
  let fixture: ComponentFixture<AdditionalFormRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalFormRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalFormRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
