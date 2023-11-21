import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Globals } from '../globals';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationBoxComponent } from './notification-box/notification-box.component';
 
@Injectable({
  providedIn: 'root'
})
export class GeojsonService {

  constructor( private http:HttpClient,private _snackBar: MatSnackBar  ) { }

  // URL = Globals.Prod_BaseURL
  URL = Globals.BaseURL
  GetLocationData(search_data){
    return this.http.get<any>(`https://nominatim.openstreetmap.org/search?q=${search_data}&format=geojson`)
    .pipe(map(data => {
      return data;
    }))
  }

  IndiaGeojsonDataAPI(searchValue,dataFormat){
      var ApiURL
      let secondUrl; 
      if(dataFormat === "india_city_data"){
        ApiURL = this.http.get<any>(`${this.URL}/india_county?city=${searchValue}`)
      }
      else if(dataFormat === "india_pincode_city"){
        secondUrl = `district=${searchValue}`
        ApiURL = this.http.get<any>(`${this.URL}/india_pincode?${secondUrl}`)
      }
      else if(dataFormat === "india_pincode_direct"){
        secondUrl = `pincode=${searchValue}`
        ApiURL = this.http.get<any>(`${this.URL}/india_pincode?${secondUrl}`)
      }

    return ApiURL.pipe(map(data => {
      return data;
    }))
  } 


  OfficalPostaPinCodeAPI(pincode){
    return this.http.get<any>(`https://api.postalpincode.in/pincode/${pincode}`)
    .pipe(map(data => {
      return data;
    }))
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(mesg,status,duration=5) {
    // status = pass or fail
    var dynamicObj = {
      duration: duration * 1000,
      panelClass: [status === "pass" ? 'sucess-snack' : "fail-snack"],
    }
    if(status === "fail"){
      // delete dynamicObj.duration
       dynamicObj.duration = 10*1000
    }
    this._snackBar.openFromComponent(NotificationBoxComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: { message:mesg }, // Pass data to the component
      ...dynamicObj

    });
  }




}
