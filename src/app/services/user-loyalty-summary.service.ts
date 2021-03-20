import { HttpClient } from "@angular/common/http";
import { UserLoyaltySummary } from "../model/user-loyalty-summary";

import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { CommonService } from "./common.service";
import { contentHeaders } from "../common/headers";

@Injectable()
export class UserLoyaltySummaryService {
  private csr_search_url = environment.search_url;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  /********************************API to fetch user loyalty summary by userUid**********/
  getUserLoyaltySummaryByUserId(
    userUid: string,
  ): Promise<UserLoyaltySummary> {
    return this.http
      .get(
        `${this.csr_search_url}/v1/customer/loyalty?customerUid=${userUid}`,
        { headers: contentHeaders }
      )
      .toPromise()
      .then(res => {
        return res as UserLoyaltySummary;
      })
      .catch(this.commonService.handleError);
  }
}
