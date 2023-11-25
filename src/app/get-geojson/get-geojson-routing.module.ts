import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawMapComponent } from './draw-map/draw-map.component';
import { DummyComponent } from './dummy/dummy.component';

const routes: Routes = [
  {
    path:'',
    component:DrawMapComponent
  },
  {
    path:'dummy',
    component:DummyComponent
  },
  {
    path:"**",
    redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetGeojsonRoutingModule { }
