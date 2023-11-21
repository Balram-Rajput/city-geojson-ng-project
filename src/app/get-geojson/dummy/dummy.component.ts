import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import * as maplibregl from "maplibre-gl"


@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit, AfterViewInit{

  constructor(private _formBuilder: FormBuilder) {}
  map
  is_city_arrow_up
  ngOnInit(): void {
    this.mySubject.next('balram')
    this.mySubject.subscribe(val=>{
      console.log(val)
    })
    const maplib:any = maplibregl 
    maplib.accessToken = 'pk.eyJ1IjoiYmFscmFtMDA3IiwiYSI6ImNrdnZ5dXU3MTA5YnIybm9lN2J6bWY3aDMifQ.zd6MSjLsjSz8fUVxpUw35A';


    this.map = new maplibregl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 1,
      center: [-122.447303, 37.753574]
  });

  }
  ngAfterViewInit(){

   
   

    this.map.on('load', () => {
      this.map.addSource('mapbox-terrain', {
            type: 'vector',
            // tiles:[`https://api.mapbox.com/v4/balram007.4n0kthv8/1/0/0.mvt?access_token=pk.eyJ1IjoiYmFscmFtMDA3IiwiYSI6ImNrdnZ5dXU3MTA5YnIybm9lN2J6bWY3aDMifQ.zd6MSjLsjSz8fUVxpUw35A`]
            tiles:[`https://api.mapbox.com/v4/balram007.4n0kthv8/{z}/{x}/{y}.pbf?access_token=pk.eyJ1IjoiYmFscmFtMDA3IiwiYSI6ImNrdnZ5dXU3MTA5YnIybm9lN2J6bWY3aDMifQ.zd6MSjLsjSz8fUVxpUw35A`]
            // Use any Mapbox-hosted tileset using its tileset id.
            // Learn more about where to find a tileset id:
            // https://docs.mapbox.com/help/glossary/tileset-id/
            // url: 'mapbox://mapbox.mapbox-terrain-v2'
            // url: 'mapbox://balram007.4n0kthv8'
        });
        this.map.addLayer(
            {
                'id': 'terrain-data',
                'type': 'fill',
                'source': 'mapbox-terrain',
                'source-layer': 'mapbox-terrain',
                'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0.5,
                    'fill-outline-color':'blue'
                }
                // 'layout': {
                //     'line-join': 'round',
                //     'line-cap': 'round'
                // },
                // 'paint': {
                //     'line-color': '#ff69b4',
                //     'line-width': 1
                // }
            },
            'road-label-simple' // Add layer below labels
        );
    });

  }
  
  mySubject = new Subject()

  obs = new Observable()

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href)
}

click(){
  let goejson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "stroke": "#c61010",
          "stroke-width": 2,
          "stroke-opacity": 1,
          "fill": "#dc2e2e",
          "fill-opacity": 0.5,
          "Balram": "Rajput"
        },
        "geometry": {
          "coordinates": [
            [
              [
                30.277006563646808,
                16.24877109493447
              ],
              [
                31.211358268204776,
                11.627208238939573
              ],
              [
                36.75003734628973,
                13.572720821996654
              ],
              [
                35.083252101305504,
                18.19471077245487
              ],
              [
                30.277006563646808,
                16.24877109493447
              ]
            ]
          ],
          "type": "Polygon"
        }
      }
    ]
  }
  this.download(JSON.stringify(goejson),'file.geojson','text/plain')
}
// download(jsonData, 'json.txt', 'text/plain');


  


}
