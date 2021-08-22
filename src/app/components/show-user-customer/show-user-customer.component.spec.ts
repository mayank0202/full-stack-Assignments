import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserCustomerComponent } from './show-user-customer.component';

describe('ShowUserCustomerComponent', () => {
  let component: ShowUserCustomerComponent;
  let fixture: ComponentFixture<ShowUserCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
