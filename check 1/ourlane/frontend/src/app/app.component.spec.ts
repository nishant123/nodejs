import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { DOMHelper } from './_config/dom-helper-testing';
describe('AppComponent', () => {
  let domHelper: DOMHelper<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  // it('Child component present test', () => {
  //   expect(domHelper.count('app-nav-left')).toEqual(1);
  //   expect(domHelper.count('app-header')).toEqual(1);
  // });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ourlane'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ourlane');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('habtoorist app is running!');
  // });
});
