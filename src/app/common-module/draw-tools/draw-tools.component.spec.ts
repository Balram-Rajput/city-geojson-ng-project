import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawToolsComponent } from './draw-tools.component';

describe('DrawToolsComponent', () => {
  let component: DrawToolsComponent;
  let fixture: ComponentFixture<DrawToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
