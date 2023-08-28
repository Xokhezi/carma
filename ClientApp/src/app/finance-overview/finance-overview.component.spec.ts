import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceOverviewComponent } from './finance-overview.component';

describe('FinanceOverviewComponent', () => {
  let component: FinanceOverviewComponent;
  let fixture: ComponentFixture<FinanceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
