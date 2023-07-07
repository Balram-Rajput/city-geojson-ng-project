import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

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
