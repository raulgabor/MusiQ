import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should access button and be redirected', fakeAsync(() => {
    spyOn(component, 'goToLoginPage');

    let pressingButton = fixture.debugElement.nativeElement.querySelector('button');
    pressingButton.click();
    tick();
    expect(component.goToLoginPage).toHaveBeenCalled();
  }));

  it('should render the logo', () => {
    const render = fixture.debugElement.nativeElement;
    expect(render.querySelector('div.container>img').src).toContain('/assets/logo4.png');
  });

  it('should render the title', () => {
    const render = fixture.debugElement.nativeElement;
    expect(render.querySelector('div.container>h1').textContent).toContain('MusiQ');
  });
});

