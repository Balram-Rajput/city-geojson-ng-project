import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons"
import {faEnvelope} from "@fortawesome/free-regular-svg-icons"

@Component({
  selector: 'app-dialog-box-common',
  templateUrl: './dialog-box-common.component.html',
  styleUrls: ['./dialog-box-common.component.css']
})
export class DialogBoxCommonComponent implements OnInit {

    linkedIn = faLinkedinIn
    Mail =  faEnvelope

    fileName;
    coordinates
    properties
    downloadType
    Downladed_GeoJson

    constructor(public dialogRef: MatDialogRef<DialogBoxCommonComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.downloadType = data.download_type;
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


    //End Download KML



    dismiss(){
        this.dialogRef.close()
    }


}

