import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenaveSliderComponent } from './sidenave-slider.component';

describe('SidenaveSliderComponent', () => {
  let component: SidenaveSliderComponent;
  let fixture: ComponentFixture<SidenaveSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenaveSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenaveSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
