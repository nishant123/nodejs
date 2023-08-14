import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppModule } from 'src/app/app.module';

import { AllBookingsComponent } from '../all-bookings.component';
import { AllBookingsModule } from '../all-bookings.module';

describe('AllBookingsComponent', () => {
  let component: AllBookingsComponent;
  let fixture: ComponentFixture<AllBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllBookingsComponent],
      imports: [
        AppModule,
        AllBookingsModule,
        ModalModule.forRoot(),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
