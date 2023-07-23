import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOverviewComponent } from './request-overview.component';

describe('RequestOverviewComponent', () => {
  let component: RequestOverviewComponent;
  let fixture: ComponentFixture<RequestOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
