import {ComponentFixture, TestBed} from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterModule} from "@angular/router";


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
      declarations: [ DashboardComponent ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should check if "isLoading" is true and show the spinner and text', () => {
    const render = fixture.debugElement.nativeElement;
    component.isLoading = true;
    expect(component.isLoading).toBeTruthy();
    expect(render.querySelector('div#spinner')).toBeTruthy();
    expect(render.querySelector('div#loading-text>p').textContent).toContain('Wait a minute, while we analyze your musical taste...');
  });
});

