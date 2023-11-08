import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawToolsComponent } from './draw-tools/draw-tools.component';
import { MapCommonComponent } from './map-common/map-common.component';
import { MaphelperService } from './maphelper.service';
import {MatDialogModule} from '@angular/material/dialog';
import { NotificationBoxComponent } from './notification-box/notification-box.component';


@NgModule({
  declarations: [  
    DrawToolsComponent,
    MapCommonComponent,
    NotificationBoxComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports:[
    MapCommonComponent
  ]
})
export class CommonModuleModule { }
