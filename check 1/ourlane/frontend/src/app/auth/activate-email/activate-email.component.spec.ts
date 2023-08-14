import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { ActivateEmailComponent } from './activate-email.component';
import { ActivateEmailModule } from './activate-email.module';

describe('ActivateEmailComponent', () => {
  let component: ActivateEmailComponent;
  let fixture: ComponentFixture<ActivateEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateEmailComponent],
      imports: [
        AppModule,
        ActivateEmailModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
