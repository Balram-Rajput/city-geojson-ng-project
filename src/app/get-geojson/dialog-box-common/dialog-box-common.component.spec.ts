import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxCommonComponent } from './dialog-box-common.component';

describe('DialogBoxCommonComponent', () => {
  let component: DialogBoxCommonComponent;
  let fixture: ComponentFixture<DialogBoxCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBoxCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
