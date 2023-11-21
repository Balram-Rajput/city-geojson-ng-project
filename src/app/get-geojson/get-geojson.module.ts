import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetGeojsonRoutingModule } from './get-geojson-routing.module';
import { DrawMapComponent } from './draw-map/draw-map.component';
import { CommonModuleModule } from '../common-module/common-module.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { DummyComponent } from './dummy/dummy.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DownloadGeojsonDataComponent } from './download-geojson-data/download-geojson-data.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatTooltipModule} from '@angular/material/tooltip';
// import { MatSelectFilterModule } from 'mat-select-filter';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MultiselectDropdownComponent } from './multiselect-dropdown/multiselect-dropdown.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { SidenaveSliderComponent } from './sidenave-slider/sidenave-slider.component';
import { NotificationBoxComponent } from './notification-box/notification-box.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DialogBoxCommonComponent } from './dialog-box-common/dialog-box-common.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    DrawMapComponent,
    DummyComponent,
    DownloadGeojsonDataComponent,
    MultiselectDropdownComponent,
    SidenaveSliderComponent,
    NotificationBoxComponent,
    DialogBoxCommonComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),

    CommonModule,
    GetGeojsonRoutingModule,
    CommonModuleModule,
    HttpClientModule,


    MatFormFieldModule,
    ColorPickerModule, 
    MatTooltipModule,
    FontAwesomeModule,
    // MatSelectFilterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule
    

    
  ]
})
export class GetGeojsonModule { }
