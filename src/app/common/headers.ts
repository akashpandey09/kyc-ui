import {HttpHeaders} from '@angular/common/http';

let headers = new HttpHeaders()
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('accept', 'application/json')
  .append('Cache-Control', 'no-cache');

if (localStorage.getItem('id_token')) {
  headers = headers.append('Authorization', localStorage.getItem('id_token'));
//     .append('userId', localStorage.getItem('userId'))
//     .append('partnerId', localStorage.getItem('partnerId'));
}

export const contentHeaders = headers;
