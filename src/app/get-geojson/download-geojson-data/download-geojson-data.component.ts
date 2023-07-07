import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import  tokml from "geojson-to-kml"
import tokml from "tokml"

@Component({
    selector: 'app-download-geojson-data',
    templateUrl: './download-geojson-data.component.html',
    styleUrls: ['./download-geojson-data.component.css']
})
export class DownloadGeojsonDataComponent implements OnInit {

    fileName;
    coordinates
    properties
    downloadType
    Downladed_GeoJson

    constructor(public dialogRef: MatDialogRef<DownloadGeojsonDataComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.downloadType = data.download_type;

        if (this.downloadType === "tehsil_data") {
            this.fileName = data.fileName;
            this.coordinates = data.coordinates
            this.properties = data.properties

            this.Downladed_GeoJson = {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": this.properties,
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": this.coordinates
                    },
                }]
            }

        }
        else if (this.downloadType === "district_data") {
            this.fileName = data.fileName;
            let geojson = data.district_geojson

            // geojson.forEach(val=>{
            //     val.geometry.type = "MultiPolygon"
            // })

            this.Downladed_GeoJson = {
                    'type': 'FeatureCollection',
                    'features': geojson
                    }
        }

    }


    ngOnInit() {



    }

    DownloadExtension = 'KML'
    OnChangeDownloadEx(event) {
        this.DownloadExtension = event
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    //Download KML
    exportKML() {

        // let final2 = {

        // }

        var kmlNameDescription = tokml(this.Downladed_GeoJson, { name: 'name', description: 'description' });
        this.dyanmicDownloadByHtmlTag({ fileName: this.fileName + ".kml", text: kmlNameDescription });

    }

    private setting = {
        element: {
            dynamicDownload: null as unknown as HTMLElement
        }
    }
    private dyanmicDownloadByHtmlTag(arg: {
        fileName: string,
        text: string
    }) {
        if (!this.setting.element.dynamicDownload) {
            this.setting.element.dynamicDownload = document.createElement('a');
        }
        const element = this.setting.element.dynamicDownload;
        // const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
        const fileType = 'text/xml';
        element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
        element.setAttribute('download', arg.fileName);

        var event = new MouseEvent("click");
        element.dispatchEvent(event);
    }

    //End Download KML


    SelectDownloadGeoJson() {
        // let finalgeojson = {
        //     "type": "FeatureCollection",
        //     "features": [{
        //         "type": "Feature",
        //         "properties": this.properties,
        //         "geometry": {
        //             "type": "Polygon",
        //             "coordinates": this.coordinates
        //         },
        //     }]
        // }
        this.OnDownloadGeojson(JSON.stringify(this.Downladed_GeoJson), this.fileName + '.geojson', 'text/plain')
    }

    OnDownloadGeojson(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href)
    }


    ClickDownload() {
        if (this.DownloadExtension === "KML") {
            this.exportKML()
        } else if (this.DownloadExtension === "GeoJson") {
            this.SelectDownloadGeoJson()
        }
    }


}
