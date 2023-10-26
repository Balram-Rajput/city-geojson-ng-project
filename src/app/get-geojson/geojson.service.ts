import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class GeojsonService {

  constructor( private http:HttpClient ) { }

  // URL = Globals.Prod_BaseURL
  URL = Globals.Test_BaseURL
  GetLocationData(search_data){

    return this.http.get<any>(`https://nominatim.openstreetmap.org/search?q=${search_data}&format=geojson`)
    .pipe(map(data => {
      return data;
    }))
  }

  IndiaDistrictGeojson(district){
    return this.http.get<any>(`${this.URL}/india_county?city=${district}`)
    // return this.http.get<any>(`http://localhost:3000/api/v1/india_county`)
    .pipe(map(data => {
      return data;
    }))
  } 


}
