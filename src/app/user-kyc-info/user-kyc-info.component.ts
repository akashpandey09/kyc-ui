import {  OnInit } from '@angular/core';
import { Component, VERSION } from '@angular/core';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';


@Component({
  selector: 'app-user-kyc-info',
  templateUrl: './user-kyc-info.component.html',
  styleUrls: ['./user-kyc-info.component.css']
})
export class UserKycInfoComponent implements OnInit  {

  percentDone: number;
    uploadSuccess: boolean;

     ngOnInit() {
      }

    constructor(
      private http: HttpClient,
      ) { }

    version = VERSION

    upload(files: File[]){
      //pick from one of the 4 styles of file uploads below
      this.uploadAndProgress(files);
    }

    basicUpload(files: File[]){
      var formData = new FormData();
      Array.from(files).forEach(f => formData.append('file', f))
      this.http.post('https://file.io', formData)
        .subscribe(event => {
          console.log('done')
        })
    }

    //this will fail since file.io dosen't accept this type of upload
    //but it is still possible to upload a file with this style
    basicUploadSingle(file: File){
      this.http.post('https://file.io', file)
        .subscribe(event => {
          console.log('done')
        })
    }

    uploadAndProgress(files: File[]){
      console.log(files)
      var formData = new FormData();
      Array.from(files).forEach(f => formData.append('file',f))

      this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
          }
      });
    }

    //this will fail since file.io dosen't accept this type of upload
    //but it is still possible to upload a file with this style
    uploadAndProgressSingle(file: File){
      this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
          }
      });
    }

}
