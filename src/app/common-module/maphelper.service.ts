import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as turf from "@turf/turf";
import * as maplibregl from "maplibre-gl"
import { DownloadGeojsonDataComponent } from '../get-geojson/download-geojson-data/download-geojson-data.component';
import {IndiaDistrictModel,IndiaPinCodeModel} from "./modals/india-district.modal"


//india_city_data //india_pincode_city //india_pincode_direct

@Injectable({
  providedIn: 'root'
})
export class MaphelperService {

  selectedDataFormatKey:any = "";

 
  constructor(private MatDialog: MatDialog) { }

  @Output() FeatureModalSideNave: EventEmitter<any> = new EventEmitter<any>();

  AddLayerOnMap(map, GlobalGeometry: any, boundingBox: any) {

    //Zoom to
    var bbox = turf.bbox({
      'type': 'Feature',
      'geometry': {
        'type': 'MultiPolygon',
        'coordinates': boundingBox
      }
    });

    map.fitBounds(bbox, { padding: 20 });
    //Zoom to -->


    //Add New Layer
    const geojson = {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': GlobalGeometry
      }
    }

    map.addSource('maine', geojson);
    map.addLayer({
      'id': 'maine',
      'type': 'fill',
      'source': 'maine',
      // "source-layer": 'maine',
      'layout': {},
      'paint': {
        'fill-color': '#0080ff', // blue color fill
        'fill-opacity': 0.5
      },
      "filter": ["match", ["geometry-type"], ["Polygon", "Multi" + "Polygon"], true, false],
    });

    map.addLayer({
      'id': 'outline',
      'type': 'line',
      'source': 'maine',
      'layout': {},
      'paint': {
      'line-color': '#333333',
      'line-width': 1
        }
      });


    this.addLayerBehavior(map, 'maine')
    this.SetCategoryStyle(map,GlobalGeometry)
    return map

  }


  addLayerBehavior(map, id) {

     // Modify the touch event listeners
     map.on('touchend',id, (e)=> {

      if (e.originalEvent.type === 'touchend') {
         console.log('touch event...')
        e.preventDefault();

        if (e && e.features) {

          console.log(e.features[0].properties)
          // let propertiesData = e.features[0].properties
          let FeatureData = e.features[0]
          map.features = e.features[0];
          this.FeatureModalSideNave.emit(FeatureData.properties)
          this.OnClickHighlightedLayer(map, e, id)
          this.OpenPopup(e, map, FeatureData)
  
        }
        // Handle touch event logic here
      } else {
        // Handle mouse click logic here
      }
    });

    //Layer Behaviour 
    map.on('mouseenter', 'maine', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'maine', () => {
      map.getCanvas().style.cursor = '';
    });

    //On LayerClick
    map.on('click', id, (e) => {

      if (e && e.features) {

        console.log(e.features[0].properties)
        // let propertiesData = e.features[0].properties
        let FeatureData = e.features[0]
        map.features = e.features[0];
        this.FeatureModalSideNave.emit(FeatureData.properties)
        this.OnClickHighlightedLayer(map, e, id)
        this.OpenPopup(e, map, FeatureData)

      }

    })

 
    
   
  }

  SetCategoryStyle(map,GlobalGeometry){

    let styleValues = [
      'match',
       ["to-string", ['get', this.selectedDataFormatKey]] 
    ]

    GlobalGeometry.forEach(val=>{
      styleValues.push(val.properties[this.selectedDataFormatKey])
      styleValues.push(val.properties.color)
    })
    styleValues.push("#000000")

    map.setPaintProperty('maine', "fill-color", styleValues);

  }

  highlightPopup:any = false
  OpenPopup(e, map, FeatureData) {
    //Popup Contain

    let PopupStyle = `background: blue;
      padding: 8px;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;`

    let cabin = 'font-family:Cabin !important';
    const innerHtmlContent = `<h2 style='${cabin}'   > ${e.features[0].properties[this.selectedDataFormatKey]}</h2>`;
    const headingBtn = document.createElement(innerHtmlContent);

    const divElement = document.createElement('div');
    const assignBtn = document.createElement('div');

    assignBtn.innerHTML = `<div> <button style='${PopupStyle}' >Download</button> </div>`;
    divElement.innerHTML = innerHtmlContent;
    divElement.appendChild(assignBtn);


    assignBtn.addEventListener('click', (e) => {
      this.MatDialog.open(DownloadGeojsonDataComponent, {
        width: '300px',
        data: { 'fileName': FeatureData.properties[this.selectedDataFormatKey], 'coordinates': FeatureData.geometry.coordinates, 'properties': FeatureData.properties,'download_type':'tehsil_data' }
      })
    });


    this.highlightPopup = new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setDOMContent(divElement)
      .addTo(map);


  }


  OnClickHighlightedLayer(map, e, id = 'maine') {

    this.RemoveHighlightedLayer(map)
    map.addLayer({
      'id': 'gid-highlighted',
      'type': 'fill',
      'source': id,
      // 'source-layer': id,
      'paint': {
        'fill-outline-color': '#20202d',
        'fill-color': '#f7a9f2',
        'fill-opacity': 0.5
      },
      'filter': ['in', this.selectedDataFormatKey, '']
    });

    const bbox = [
      [e.point.x - 5, e.point.y - 5],
      [e.point.x + 5, e.point.y + 5]
    ];
    const selectedFeatures = map.queryRenderedFeatures(bbox, {})
    const fips = selectedFeatures.map(
      (feature) => feature.properties[this.selectedDataFormatKey]
    );
    map.setFilter('gid-highlighted', ['in', this.selectedDataFormatKey, fips[0]]);

  }





  RemoveLayerFormMap(map: any) {
    if (map.getLayer("maine")) {
      map.removeLayer("maine")
    }
    if(map.getLayer('outline')){
      map.removeLayer("outline") 
    }
    if (map.getLayer('gid-highlighted')) {
      map.removeLayer('gid-highlighted')
    }
    if (map.getSource("maine")) {
      map.removeSource("maine")
    }

  }

  RemoveHighlightedLayer(map) {
    if (map.getLayer('gid-highlighted')) {
      map.removeLayer('gid-highlighted')
    }
    if(this.highlightPopup){
      this.highlightPopup.remove()
    }
  }










}
