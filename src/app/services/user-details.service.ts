import { HttpClient } from "@angular/common/http";
import { contentHeaders } from "../common/headers";
import { UserBasicDetails } from "../model/user-details";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { LoyaltyDetails } from "../model/loyalty-details";
import { CommonService } from "./common.service";
import { UserAccountDetails } from "../model/user-account-details";

@Injectable()
export class UserDetailsService {
  private csr_search_url = environment.search_url;
  private pageSize = environment.page_size;
  private lastSearchedCustomerDetails: UserBasicDetails;
  private lastSearchedCustomerAccountDetails: UserAccountDetails;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  /**********************************API to fetch user by mobile number and partner id******************/
  getUserByMobileNumber(
    mobileNumber: string,
  ): Promise<UserBasicDetails> {
    return this.http
      .get(
        `../../api/on-prem-csr/v1/customer/details?mobileNumber=${mobileNumber}`,
        { headers: contentHeaders }
      )
      .toPromise()
      .then((res: any) => {
        console.log(res);
        this.lastSearchedCustomerDetails = res;
        return res as UserBasicDetails;
      })
      .catch(this.commonService.handleError);
  }

  getUserByOrderUid(
    orderUid: string,
  ): Promise<UserBasicDetails> {
    return this.http
      .get(
        `../../api/on-prem-csr/v1/customer/transaction?transactionId=${orderUid}`,
        { headers: contentHeaders }
      )
      .toPromise()
      .then((res: any) => {
        console.log(res);
        this.lastSearchedCustomerDetails = res;
        return res as UserBasicDetails;
      })
      .catch(this.commonService.handleError);
  }

  getUserByCustomerId(
    customerUid: string,
  ): Promise<UserBasicDetails> {
    return this.http
      .get(
        `../../api/on-prem-csr/v1/customer/detailsByCustomerId?customerUid=${customerUid}`,
        { headers: contentHeaders }
      )
      .toPromise()
      .then((res: any) => {
        console.log(res);
        this.lastSearchedCustomerDetails = res;
        return res as UserBasicDetails;
      })
      .catch(this.commonService.handleError);
  }

  getUserByAnalyticsId(
    analyticsId: string,
  ): Promise<UserBasicDetails> {
    return this.http
      .get(
        `../../api/on-prem-csr/v1/customer/detailsByAnalyticsId?analyticsId=${analyticsId}`,
        { headers: contentHeaders }
      )
      .toPromise()
      .then((res: any) => {
        console.log(res);
        this.lastSearchedCustomerDetails = res;
        return res as UserBasicDetails;
      })
      .catch(this.commonService.handleError);
  }

  getUserByTransactionId(
      transactionId: string,
    ): Promise<UserBasicDetails> {
      return this.http
        .get(
          `../../api/on-prem-csr/v1/customer/transaction?transactionId=${transactionId}`,
          { headers: contentHeaders }
        )
        .toPromise()
        .then((res: any) => {
          console.log(res);
          this.lastSearchedCustomerDetails = res;
          return res as UserBasicDetails;
        })
        .catch(this.commonService.handleError);
    }

  /**********************************API to fetch loyalty details for user*****************************/

  getUserLoyaltyDetails(
    userUid: string,
    pageNumber: number
  ): Promise<LoyaltyDetails[]> {
    return this.http
      .get(
        `../../api/on-prem-csr/v1/customer/loyaltyHistory?customerUid=${userUid}&page=${pageNumber}&size=${this.pageSize}`,
        { headers: contentHeaders }
      )
      .toPromise()
      .then((res: any) => {
        return res as LoyaltyDetails[];
      })
      .catch(this.commonService.handleError);
  }

  getUserByDeviceUid(
    deviceId: string,
    pageNumber: number
  ): Promise<UserBasicDetails[]> {
    return this.http
      .get(
        `../../api/on-prem-csr/v1/device/search?deviceId=${deviceId}&page=${pageNumber}&size=${this.pageSize}`,
        { headers: contentHeaders }
      )
      .toPromise()
      .then((res: any) => {
        if (res.length == 0) {
          this.commonService.showEmptyScreen();
        }
        return res as UserBasicDetails[];
      })
      .catch(this.commonService.handleError);
  }

  getLastSearchedCustomerDetails(): UserBasicDetails {
    return this.lastSearchedCustomerDetails;
  }

  getLastSearchedCustomerAccountDetails(): UserAccountDetails {
      return this.lastSearchedCustomerAccountDetails;
  }

  setLastSearchedCustomerAccountDetails(userAccountDetails: UserAccountDetails): void {
      this.lastSearchedCustomerAccountDetails = userAccountDetails;
  }

  clearLastSearchedCustomerDetails() : void {
    this.lastSearchedCustomerDetails = null;
    this.lastSearchedCustomerAccountDetails = null;
  }

  setLastSearchedCustomerDetails(userBasicDetails: UserBasicDetails): void {
    this.lastSearchedCustomerDetails = userBasicDetails;
  }
  /**********************************API's to fetch account details for user*****************************/
  getAccountDetailsByMobileNumber(
      mobileNumber: string,
    ): Promise<UserAccountDetails> {
      return this.http
        .get(
          `../../api/on-prem-csr/v1/customer/accDetailsByMobile?mobileNumber=${mobileNumber}`,
          { headers: contentHeaders }
        )
        .toPromise()
        .then((res: any) => {
          console.log(res);
          this.lastSearchedCustomerAccountDetails = res;
          return res as UserAccountDetails;
        })
        .catch(this.commonService.handleError);
    }

    getAccountDetailsByOrderUid(
        orderUid: string,
      ): Promise<UserAccountDetails> {
        return this.http
          .get(
            `../../api/on-prem-csr/v1/customer/accDetailsByTransactionId?transactionId=${orderUid}`,
            { headers: contentHeaders }
          )
          .toPromise()
          .then((res: any) => {
            console.log(res);
            this.lastSearchedCustomerAccountDetails = res;
            return res as UserAccountDetails;
          })
          .catch(this.commonService.handleError);
      }

    getAccountDetailsByCustomerId(
        customerUid: string,
      ): Promise<UserAccountDetails> {
        return this.http
          .get(
            `../../api/on-prem-csr/v1/customer/accDetailsByCustomerId?customerUid=${customerUid}`,
            { headers: contentHeaders }
          )
          .toPromise()
          .then((res: any) => {
            console.log(res);
            this.lastSearchedCustomerAccountDetails = res;
            return res as UserAccountDetails;
          })
          .catch(this.commonService.handleError);
    }

    getAccountDetailsByAnalyticsId(
        analyticsId: string,
      ): Promise<UserAccountDetails> {
        return this.http
          .get(
            `../../api/on-prem-csr/v1/customer/accDetailsByAnalyticsId?analyticsId=${analyticsId}`,
            { headers: contentHeaders }
          )
          .toPromise()
          .then((res: any) => {
            console.log(res);
            this.lastSearchedCustomerAccountDetails = res;
            return res as UserAccountDetails;
          })
          .catch(this.commonService.handleError);
      }
}
