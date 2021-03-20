import {Injectable, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {contentHeaders} from '../common/headers';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CommonService} from './common.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Constants} from '../common/constants';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class LoginService {

  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;
  private url = environment.login_url;
  private resetLink: string;

  constructor(private http: HttpClient,
              public router: Router,
              private commonService: CommonService,
              @Inject(DOCUMENT) private document: Document) {
    // localStorage.setItem('id_token',"");
    // localStorage.setItem('userId',"1");
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('id_token'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.resetLink = document.location.protocol + "//" + document.location.hostname;
  }

  /**************************Method to get whether the user is logged in or not************************************* */
  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  /*************************************API to Login****************************************** */
  login(username: string, password: string): any {
    const body = JSON.stringify({'username': username, 'password': password});


          localStorage.setItem('id_token', "abcd");
//           localStorage.setItem('userId', res.id);
//           localStorage.setItem('userName', res.name);
//           localStorage.setItem('partnerId', res.partnerId);
//           localStorage.setItem('status', res.status);
//           localStorage.setItem('statusTemp', res.status);
//           localStorage.setItem('partnerName', res.partnerName);
//           localStorage.setItem('permissions', JSON.stringify(res.permissions));
//           localStorage.setItem('roleId', JSON.stringify(res.roleId));
        return "abcd";

  }

  /****************************************API to Logout******************************************************** */
  logout() {
  localStorage.removeItem('id_token');
  window.location.href = 'login';
    // remove user from local storage to log user out
//     return this.http
//       .get(`${this.url}/signout`, {headers: contentHeaders})
//       .toPromise()
//       .then((response: Response) => {
//         localStorage.removeItem('id_token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('partnerId');
//         localStorage.removeItem('status');
//         localStorage.removeItem('userName');
//         this.currentUserSubject.next('');
//         window.location.href = '/login';
//       })
//       .catch(this.commonService.handleError);
  }

  /****************************************API to Verify User Invite Token to Set Password******************************************* */
  verifyPwdToken(token: string): Promise<any> {
    return this.http
      .get(`${this.url}/v1/invite/verifytoken/${token}`, {headers: contentHeaders, responseType: 'text'})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /****************************************API to Set Password******************************************************** */
  setUserPwd(password: string, confirmPassword: string, token: string): Promise<any> {
    const body = JSON.stringify({password, confirmPassword});
    return this.http
      .put(`${this.url}/resetpwd/${token}`, body, {headers: contentHeaders, responseType: 'text'})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /****************************************API to Set Password******************************************************** */
  forgotUserPwd(emailId: string): Promise<any> {
    const domainParam = new HttpParams().set('domain', Constants.DOMAIN_URL);
    return this.http
      .get(`${this.url}/verifyemail/${emailId}?domain=${this.resetLink}`, {
        params: domainParam,
        headers: contentHeaders, responseType: 'text'
      })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /****************************************API to Set Password******************************************************** */
  changeUserPwd(oldPassword: string, newPassword: string, confirmPassword: string): Promise<any> {
    const body = JSON.stringify({oldPassword, newPassword, confirmPassword});
    const userId = localStorage.getItem('userId');
    return this.http
      .put(`${this.url}/v1/customer/changePwd/${userId}`, body, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

}
