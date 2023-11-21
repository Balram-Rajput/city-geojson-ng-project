import { Component, OnInit, ViewChild,HostListener } from '@angular/core';
import { GeojsonService } from '../geojson.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MaphelperService } from 'src/app/common-module/maphelper.service';
import { MatDialog } from '@angular/material/dialog';

import { CommonDataService } from '../common-data.service';
import { Subject, debounceTime, distinctUntilChanged, pipe, switchMap } from 'rxjs';
// import {CircleMode } from 'mapbox-gl-draw-circle';
// import {DirectMode,SimpleSelectMode,CircleMode,DragCircleMode} from 'mapbox-gl-draw-circle';
// import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import {faLinkedinIn,faGithub, faGithubSquare} from "@fortawesome/free-brands-svg-icons"
import { IndiaDistrictModel, IndiaPinCodeModel } from 'src/app/common-module/modals/india-district.modal';

@Component({
  selector: 'app-draw-map',
  templateUrl: './draw-map.component.html',
  styleUrls: ['./draw-map.component.css']
})

export class DrawMapComponent implements OnInit {

  LinkedinIn = faLinkedinIn
  color = "#0080ff";
  GithubSquare = faGithub
  draw;
  map: any;
  searchGeocoder: string = ''
  ShowSearchBox = false
  IsGeoLocationList = false
  GeoLocationListData: any;
  GlobalGeometry = []
  boudingCoordinates = [];
  HighlightFeatureData: any
  mobileView
  ViewLinkedInPro:any = false
  isDataFormatOpen
  selectedDataFormatKey="ac_name";
  selectedDataFormat='india_city_data' //india_city_data //india_pincode_city //india_pincode_direct


  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav
  myForm
  screenWidth
  toogleMobileDrop =true


  @HostListener('window:resize', ['$event'])  
  onResize(event) {  
    this.screenWidth = window.innerWidth;  
  }

  constructor(private GeoService: GeojsonService, private mapHelperService: MaphelperService,
    private MatDialog: MatDialog,private CommonDataService: CommonDataService) { 
     this.screenWidth =  window.innerWidth;

     this.searchTermsSubject()
    }


    
  ActiveDistrictData
  ViewTehsilProperties;
  ngOnInit(): void {
    this.mapHelperService.FeatureModalSideNave.subscribe(result => {
      if (result) {
        let index
        if(this.selectedDataFormat === "india_city_data"){

          index = this.ServerData.findIndex((a)=>result.dist_name.includes(a.key))
        }
        else if(this.selectedDataFormat == "india_pincode_city"){

          index = this.ServerData.findIndex((a)=> result.district.toLowerCase().includes(a.key.toLowerCase()))

        }else if( this.selectedDataFormat === "india_pincode_direct"){

          index = this.ServerData.findIndex((a)=>result.pin_code.includes(a.key))
        }

        if(index != -1){
          this.ActiveDistrictData = this.ServerData[index]
        }
        this.HighlightFeatureData = result;
        this.sidenav.open()
        this.ViewTehsilProperties = false
        
        setTimeout(() => {
          this.gotoscorlled(result.ac_name)
        })

      }
    })

    this.mapHelperService.selectedDataFormatKey = this.getFormatDataProperties

  }

  DrawEmit(event) {
    this.draw = event
  }

  RecivedMap(event) {
    this.map = event
  }

  DrawOnMap(drawing) {

    if (drawing === "reactangle") {
      this.draw.changeMode('draw_rectangle')
    }
  }

  private searchGeocoderSubject = new Subject<string>();
  OnSearchGeocode(event) {
    this.searchGeocoderSubject.next(this.searchGeocoder)
  }

  searchTermsSubject(){
    this.searchGeocoderSubject.pipe(
        debounceTime(500), // Ignore events within 300ms of the last event
        distinctUntilChanged(), // Ignore if the search term hasn't changed
        switchMap( ()=>{
          return this.GeoService.GetLocationData(this.searchGeocoder)
        })
      ).subscribe(response=>{
        console.log(response)
          if (response.features.length > 0) {
            this.IsGeoLocationList = true
            this.GeoLocationListData = response.features
          }

      })
  }



  gotoscorlled(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
    // this.OneTimeScrolled =false;
  }

  // OnClickLocation(display_name) {
  //   let searachData = this.searchGeo.toLowerCase()
  //   let serachResult = display_name.properties.display_name.toLowerCase()
  //   this.IsGeoLocationList = false;
  //   this.GlobalGeometry = []
  //   this.boudingCoordinates = []

  //   if (serachResult.includes(searachData)) {
  //     this.TehsilProperties = []


  //     this.GeoService.getGeoJsonBoundries.features.forEach(val => {
  //       if (val.properties.dist_name) {

  //         if (val.properties.dist_name.toLowerCase() === searachData) {
  //           console.log(val.geometry)
  //           // this.GlobalGeometry.push(val.geometry.coordinates[0])
  //           this.boudingCoordinates.push(val.geometry.coordinates[0])

  //           val.properties['color'] = "#0080ff"
  //           let create_geojson = {
  //             "type": "Feature",
  //             "properties":val.properties,
  //             "geometry": {
  //               "type": "Polygon",
  //               "coordinates":val.geometry.coordinates[0] 
  //             }
  //           }
  //           // this.TehsilProperties.push({
  //           //   'coordinates':val.geometry.coordinates[0],
  //           //   'properties':val.properties
  //           // })

  //           this.GlobalGeometry.push(create_geojson)
  //         }

  //       }
  //     })

  //     if (this.GlobalGeometry.length > 0) {
  //       this.RemoveLayerSource(this.map)
  //       this.AddLayerSource(this.map)
  //       this.sidenav.open()

  //     }else{
  //       console.log("Data does not found")
  //     }

  //   }

  // }

  OnClickLocation(ServerData) {

    this.GlobalGeometry = []
    this.boudingCoordinates = []
    
    ServerData.geoData.forEach(result => {
      for(let city_geo of result.geometry){
        if (city_geo.properties) {
          
          this.boudingCoordinates.push(city_geo.geometry.coordinates)
          city_geo.properties['color'] = "#0080ff" //need to assign color and bouding box
          this.GlobalGeometry.push(city_geo)
  
        }
      }
      
    })
    this.multiSearchLoader = false
    this.CloseSideNav()
    if (this.GlobalGeometry.length > 0) {
      this.RemoveLayerSource(this.map)
      this.AddLayerSource(this.map);

      this.ActiveDistrictData = this.ServerData[this.ServerData.length-1]
      this.sidenav.open()

    } else {

      console.log("Data does not found")
    }
  }


  RemoveLayerSource(map) {
    this.mapHelperService.RemoveLayerFormMap(map)
  }

  AddLayerSource(map) {
    this.map = this.mapHelperService.AddLayerOnMap(map, this.GlobalGeometry, this.boudingCoordinates)
    this.sidenav.close()
  }


  // Right SideNave
  selectedCountry = 'India'
  OnSelectedCountry(event) {
    console.log(event)
  }

 

  // StateAndDistrictData = this.CommonDataService.StateAndDistrictData
  StateAndDistrictData = []


  filteredList1 = this.CommonDataService.StateAndDistrictData
  filteredList2

  SelectedDistrictData
  IsHideDistrictTable = true
  StateValue:any
  StateSelection(event: any) {
    console.log(event)
    this.SelectedDistrictData = event.value.city
    this.filteredList2 = this.SelectedDistrictData
    this.StateValue = event.value;
    this.IsHideDistrictTable = false
    // this.CloseSideNav()
    this.sidenav.close()
  }

  DistrictValue:any
  ServerData
  multiSearchLoader =false
  validResponse = false
  DistrictSelection(event: any) {

    this.multiSearchLoader = true
    this.toogleMobileDrop=false
    this.DistrictValue = event; 
    this.validResponse = false

    this.APIResponseTimeCheckPoint(10);
    this.APIResponseTimeCheckPoint(30);

    // this.OnClickLocation(event.value);
    this.GeoService.IndiaGeojsonDataAPI(this.DistrictValue,this.selectedDataFormat).subscribe(val=>{
      this.validResponse =true
      if(val.geoData.length === 0){
        this.multiSearchLoader = false
        this.GeoService.openSnackBar("No Results Found","fail")
        return
      }

      this.ServerData = val.geoData
      this.OnClickLocation(val)

    },err=>{
      this.validResponse =true
      this.multiSearchLoader = false
      if(err.status == 500){
        this.GeoService.openSnackBar("An unexpected error occurred. Please try again later.","fail")
      }else{
        this.GeoService.openSnackBar(err.error.msg,"fail")
      }

    }) 
  }

  APIResponseTimeCheckPoint(sec){
    setTimeout(()=>{
      if(!this.validResponse){
        let msg = "Thank you for your patience. The process may take a bit longer than usual."
        this.GeoService.openSnackBar(msg,"pass")
      }
    },sec*1000)
  }



  EmitSearchData(event){
    this.DistrictSelection(event)
  }

  //End Right SideNave


  
  //District Side Nave 
 
  CloseSideNav() {
    if(this.sidenav && this.sidenav.opened){
      this.sidenav.toggle()
      this.mapHelperService.RemoveHighlightedLayer(this.map)
    }
    // this.DistrictMode = "view_disctrict_data"
    // this.EditTehsilMode = false
  }

  // ZoomToDistrict(district_coordiantes) {
  //   let final_cooridnates = district_coordiantes.map((geom)=>{
  //     return geom.geometry.coordinates; 
  //   }) 
  //   var bbox = turf.bbox({
  //     'type': 'Feature',
  //     'geometry': {
  //       'type': 'MultiPolygon',
  //       'coordinates': final_cooridnates
  //     }
  //   })
  //   this.map.fitBounds(bbox, { padding: 20 });
  // }

  // OnDownloadDistrictData(fileName, district_geojson) {
  //   this.MatDialog.open(DownloadGeojsonDataComponent, {
  //     width: '300px',
  //     data: { 'fileName': fileName, "district_geojson": district_geojson, "download_type": "district_data", }
  //   })
  // }



  // CopyGlobalGeometry = this.GlobalGeometry
  //"edit_district_list", "view_disctrict_data"

  SaveDistrictLevelData(event) {
    this.ActiveDistrictData = event
    this.GlobalGeometry = []

    //find index of key
    let index =  this.ServerData.findIndex((a)=>a.key === this.ActiveDistrictData.key);
    this.ServerData[index] =  this.ActiveDistrictData

    this.ServerData.forEach(iterate=>{
      this.GlobalGeometry.push(...iterate.geometry)
    })


    this.mapHelperService.RemoveLayerFormMap(this.map)
    this.mapHelperService.AddLayerOnMap(this.map, this.GlobalGeometry, this.boudingCoordinates)
  }

  UpdateValue
  OnChangeTeshilName(event, index) {

  }


  //End District Side Nave


  OnScrollTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'auto' for instant scroll, 'smooth' for smooth scroll
    });
  }

  SelectDataFormat(value){
    this.selectedDataFormat = value;
    this.selectedDataFormatKey = this.getFormatDataProperties
    this.mapHelperService.selectedDataFormatKey = this.selectedDataFormatKey;
    this.CloseSideNav()
  }

  get getFormatDataProperties(){
    
    if(this.selectedDataFormat === "india_city_data"){
      let DataType: IndiaDistrictModel
      return "ac_name"

    }else if(this.selectedDataFormat === "india_pincode_city" || this.selectedDataFormat == "india_pincode_direct"){
      let DataType: IndiaPinCodeModel
      return "pin_code"
    }
    return null
  }

 



}