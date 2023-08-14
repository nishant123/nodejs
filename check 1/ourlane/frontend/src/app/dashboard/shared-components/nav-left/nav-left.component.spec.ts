import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { NavLeftComponent } from './nav-left.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DOMHelper } from '../../../_config/dom-helper-testing';
describe('NavLeftComponent', () => {
  let component: NavLeftComponent;
  let fixture: ComponentFixture<NavLeftComponent>;
  let domHelper: DOMHelper<NavLeftComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavLeftComponent ],
      imports: [
        TranslateModule.forRoot(),
        AppModule,
      ],
      providers: [TranslateService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // it('Left Nav page', () => {
  //   expect(domHelper.countText('h4', 'menuLink.heading')).toBe(1);
  //   expect(domHelper.countText('a', 'menuLink.dashboardAnalytics')).toBe(1);
  //   expect(domHelper.countText('a', 'menuLink.administration')).toBe(1);
  //   expect(domHelper.countText('a', 'menuLink.cars')).toBe(1);
  //   expect(domHelper.countText('a', 'menuLink.driversManagement')).toBe(1);
  //   expect(domHelper.countText('a', 'menuLink.customers')).toBe(1);
  //   expect(domHelper.countText('a', 'menuLink.allBookings')).toBe(1);
  // });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
