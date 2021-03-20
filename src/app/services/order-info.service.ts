import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";
import { CommonService } from "./common.service";
import { contentHeaders } from "../common/headers";

@Injectable()
export class OrderInfoService {
  private csr_search_url = environment.search_url;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  /**********************************API to fetch user by user uid*************************************/
  getOrderInfoDetailsByOrderUid(orderUid: string ,notiid: string ,category_name: string): Promise<any> {
    return this.http
      .get(`../../api/on-prem-csr/v1/transaction/details?transactionId=${orderUid}&notiId=${notiid}&categoryName=${category_name}`, {
        headers: contentHeaders
      })
      .toPromise()
      .then(res => {
        console.log('response of order details api');
        console.log(res);
        return res;
      })
      .catch(error => alert(error.message));
  }
}
