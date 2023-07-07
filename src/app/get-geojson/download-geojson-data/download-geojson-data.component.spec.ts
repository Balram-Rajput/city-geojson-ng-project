import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadGeojsonDataComponent } from './download-geojson-data.component';

describe('DownloadGeojsonDataComponent', () => {
  let component: DownloadGeojsonDataComponent;
  let fixture: ComponentFixture<DownloadGeojsonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadGeojsonDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadGeojsonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
