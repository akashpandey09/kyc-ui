import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {contentHeaders} from '../common/headers';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import { Observable } from 'rxjs';

@Injectable()
export class CommonService {
  constructor(private router: Router, private datePipe: DatePipe) {
    var permissions = [];
    localStorage.setItem("permissions",  JSON.stringify(permissions));
    this.userPermission = JSON.parse(localStorage.getItem('permissions'));
  }
  userPermission;
  permissionStatus = false;

  // Top Nav Title Service
  private pageTtlSrc = new BehaviorSubject<string>('Reconciliation dashboad');
  currentPage = this.pageTtlSrc.asObservable();

  private prevPage = new BehaviorSubject<number>(1);

  fetchPrevPage(): Observable<number> {
      return this.prevPage.asObservable();
  }

  sendPrevPage(page: number) {
      this.prevPage.next(page);
  }

  private pageDetailsMap = new BehaviorSubject<any>({});

  fetchPageDetailsMap(): Observable<any> {
    return this.pageDetailsMap.asObservable();
  }

  sendPageDetailMap(map: any){
    this.pageDetailsMap.next(map);
  }

  searchBarKey = new BehaviorSubject<string>('searchBarKey');
  sharedSearchBarKey = this.searchBarKey.asObservable();

  setSearchBarKey(key: string){
    this.searchBarKey.next(key);
  }

  searchBarValue = new BehaviorSubject<string>('searchBarValue');
  sharedSearchBarValue = this.searchBarValue.asObservable();

  setSearchBarValue(value: string){
      this.searchBarValue.next(value);
  }

  // Sub Nav link activationService
  activeLink: BehaviorSubject<string> = new BehaviorSubject('users');
  activeLink$ = this.activeLink.asObservable();

  /***************************************Method to Set Top Nav Title based on the Current Page**************************************** */
  setTitle(title: string) {
    this.pageTtlSrc.next(title);
  }

  /***************************************Method to Activate Selected Sub Nav********************************************************** */
  subNavSelect(activeLink: string) {
    this.activeLink.next(activeLink);
  }

  /***************************************Method to Set Content Type********************************************************** */
  setContentType() {
    contentHeaders.delete('content-type');
    contentHeaders.delete('Content-Disposition');
    contentHeaders.append('content-type', 'application/json');
  }

  /***************************************Method to Handle Errors********************************************************** */
  public  handleError(error: any): Promise<any> {
    if (error.status === 403 || error.status === 401 || error.status === 0) {// Logging out for access denied case
      localStorage.removeItem('id_token');
      localStorage.removeItem('userId');
      console.log(error)
      window.location.href = 'login';
    } else {
      console.log(error);
      //window.alert(error.message);
      return Promise.reject(error.error.message || error.error);
    }
  }

  /***************************************Method to get Permissions list based on User Role ****************************************** */
  public getSecPermissions(accessibleSec: string[]): boolean {
    let permissionStatus = false;
    for (let i = 0; i <= accessibleSec.length; i++) {
      this.userPermission.filter(
        x => {
          if (x.name === accessibleSec[i]) {
            permissionStatus = true;
          }
        }
      );
      if (permissionStatus) {
        break;
      }
    }
    return permissionStatus;
  }

  /***************************Method to generate pagers based on dynamic data********************** */
  getPaginationDetails(currentPage: number, totalItems: number, pageSize: number) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number;
    let endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  public showEmptyScreen() {
    this.router.navigate(['empty-screen']);
  }

  public dateParser(dateStr : string) : string {
      if(dateStr && dateStr != 'NA' && dateStr.length > 17){
        let date = dateStr.substring(0, 10);
        let hh = dateStr.substring(11, 13);
        let mm = dateStr.substring(14,16);
        let ss_ssssss = dateStr.substring(17);

        let validDate = date + 'T' + hh + ':' + mm + ':' + ss_ssssss;
        return this.datePipe.transform(validDate, 'd MMM y h:mm a');
      }
      return dateStr;
    }
}
