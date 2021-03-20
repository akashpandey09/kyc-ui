import {HttpClient} from "@angular/common/http";
import {AfterViewInit, ElementRef, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

import {TransactionHistory} from "../model/transaction-history";
import {CommonService} from "./common.service";
import {contentHeaders} from "../common/headers";
import {UserBasicDetails} from "../model/user-details";


export class AppComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef){

  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'yellow';
  }
}

@Injectable()
export class TransactionHistoryService {
  private csr_search_url: string = environment.search_url;
  private pageSize = environment.page_size;
  private last_searched_query = "None";

  constructor(private http: HttpClient, private commonService: CommonService) {
  }


  /***************************API to fetch transaction history by other search params*****************/
  getTransactionHistory(
    param: string,
    paramValue: string,
    pageNumber: number
  ): Promise<TransactionHistory[]> {

    let query_url: string = this.last_searched_query;

    if (param == "mobileNumber") {
      query_url = `../../api/on-prem-csr/v1/customer/transactionHistory?mobileNumber=${paramValue}`;
    } else if (param == "transactionIds") {
      query_url = `../../api/on-prem-csr/v1/transaction/search?transactionIds=${paramValue}`;
    } else if (param == "deviceId") {
      query_url = `../../api/on-prem-csr/v1/device/search?deviceId=${paramValue}`;
    } else if (param == "customerId") {
      query_url = `../../api/on-prem-csr/v1/transaction/historyByCustomerId?customerUid=${paramValue}`;
    } else if (param == "analyticsId") {
      query_url = `../../api/on-prem-csr/v1/transaction/historyByAnalyticsId?analyticsId=${paramValue}`;
    }


    console.log(query_url + `&page=${pageNumber}&size=${this.pageSize}`);
    this.last_searched_query = query_url;

    return this.http
      .get(query_url + `&page=${pageNumber}&size=${this.pageSize}`, {headers: contentHeaders})
      .toPromise()
      .then((res: any) => {
        console.log(res);
        if (res == null) {
          this.commonService.showEmptyScreen();
        }
        if (param == 'deviceId') {
          return res as UserBasicDetails[];
        }
        return res as TransactionHistory[];
      })
      .catch(this.commonService.handleError);
  }
}
