import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DownloadGeojsonDataComponent } from '../download-geojson-data/download-geojson-data.component';
import { MaphelperService } from 'src/app/common-module/maphelper.service';
import * as turf from "@turf/turf";


@Component({
  selector: 'app-sidenave-slider',
  templateUrl: './sidenave-slider.component.html',
  styleUrls: ['./sidenave-slider.component.css']
})
export class SidenaveSliderComponent implements OnInit {

  constructor(private MatDialog :MatDialog, private mapHelperService:MaphelperService) { }

  ngOnInit(): void {
  }

  // @ViewChild('sidenav', { static: true }) sidenav: MatSidenav
  @Input()sidenav:any
  @Input() screenWidth
  @Input()map
  @Input() ActiveDistrictData
  @Input() HighlightFeatureData:any
  @Input() ViewTehsilPros = false
  @Input() selectedDataFormatKey
  DistrictMode = "view_disctrict_data"

  ZoomToDistrict(district_coordiantes) {
    let final_cooridnates = district_coordiantes.map((geom)=>{
      return geom.geometry.coordinates; 
    }) 
    var bbox = turf.bbox({
      'type': 'Feature',
      'geometry': {
        'type': 'MultiPolygon',
        'coordinates': final_cooridnates
      }
    })
    this.map.fitBounds(bbox, { padding: 20 });
  }

 OnDownloadDistrictData(fileName, district_geojson) {
    this.MatDialog.open(DownloadGeojsonDataComponent, {
      width: '300px',
      data: { 'fileName': fileName, "district_geojson": district_geojson, "download_type": "district_data", }
    })
  }

  EditDistrictData(value) {
    this.DistrictMode = value
  }

  @Output() EmitDistrictLevelData = new EventEmitter()
  SaveDistrictDataFn() {
    this.DistrictMode = "view_disctrict_data";
    this.EmitDistrictLevelData.emit(this.ActiveDistrictData)
  }


  CloseCityNav() {
    this.sidenav.toggle()
    this.mapHelperService.RemoveHighlightedLayer(this.map)
    this.DistrictMode = "view_disctrict_data"
    this.ViewTehsilPros = false
  }

  ZoomToTehshil(data) {
    //Zoom to
    var bbox = turf.bbox({
      'type': 'Feature',
      'geometry': {
        'type': 'MultiPolygon',
        'coordinates': [data]
      }
    });
    this.map.fitBounds(bbox, { padding: 20 });

  }

  EditedTehsilValue
  index
  EditedTehsilKey 
  TehsilColor 
  ReadMode = true

  // ToggleTeshilInfo() {
  //   this.ViewTehsilPros = false
  // }

  OnClickViewTehsil(data, index) {
    this.index = index
    this.EditedTehsilValue = data
    this.EditedTehsilKey =   Object.keys(data)
    this.ViewTehsilPros = !this.ViewTehsilPros
    this.TehsilColor = data.color
  } 

  SaveTehsilInfo() {

    // this.GlobalGeometry[this.index].properties.color = this.TehsilColor
    // this.mapHelperService.RemoveLayerFormMap(this.map)
    // this.mapHelperService.AddLayerOnMap(this.map, this.GlobalGeometry, this.boudingCoordinates)
    // this.ViewTehsilPros = false
  }

  OnScrollTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'auto' for instant scroll, 'smooth' for smooth scroll
    });
  }


   getFormatDataProps(object){
    try{
      if(object){
        if(object.ac_name){
          return object.ac_name
        }else{
          return object.pin_code
        }
      }
      return null

    }catch{
      return null
    }

  }


}

