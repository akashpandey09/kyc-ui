import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";

@Injectable()
export class TransactionReportService {

  constructor(private http: HttpClient, private commonService: CommonService) {}

  /**********************************API to create and upload report*************************************/
  formAndUploadReport(object: any) {
    let httpHeaders = new HttpHeaders()
      .append('content-type', 'text/plain')
      .append('Access-Control-Allow-Origin', '*')
      .append('Cache-Control', 'no-cache')
      .append('accept', 'application/octet-stream')
      .append('Authorization', localStorage.getItem('id_token'));
    console.log(httpHeaders);
    return this.http
      .get(
        object.query_url_prefix + `&fileName=${object.fileName}&selectedFields=${object.fields}`,
        { headers: httpHeaders, responseType:'blob' },
      )
      .subscribe((res:any)=>{
        let a = document.createElement("a");
        a.href = URL.createObjectURL(res);
        a.download = object.fileName.endsWith(".csv") ? object.fileName : object.fileName + ".csv";
        console.log(a);
        // start download
        a.click();
      })
  }
}
