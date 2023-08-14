import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { DriverManagementComponent } from './driver-management.component';
import { DriverManagementModule } from './driver-management.module';

describe('DriverManagementComponent', () => {
  let component: DriverManagementComponent;
  let fixture: ComponentFixture<DriverManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverManagementComponent],
      imports: [
        AppModule,
        DriverManagementModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
