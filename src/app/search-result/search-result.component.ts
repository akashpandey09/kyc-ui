import {CommonService} from "../services/common.service";
import {TransactionReportComponent} from "../transaction-report/transaction-report.component";
import {ActivatedRoute, Router} from "@angular/router";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  TemplateRef
} from "@angular/core";
import {BsModalService, BsModalRef} from "ngx-bootstrap";
import {UserDetailsService} from "../services/user-details.service";
import {TransactionHistoryService} from "../services/transaction-history.service";
import {UserLoyaltySummaryService} from "../services/user-loyalty-summary.service";
import {UserLoyaltySummary} from "../model/user-loyalty-summary";
import {UserBasicDetails} from "../model/user-details";
import {UserAccountDetails} from "../model/user-account-details";
import {TransactionHistory} from "../model/transaction-history";
import {LoyaltyDetails} from "../model/loyalty-details";
import {searchParameters} from "../model/search-param";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"]
})
export class SearchResultComponent implements OnInit {


  constructor(
    private commonservice: CommonService,
    private userService: UserDetailsService,
    private transactionHistoryService: TransactionHistoryService,
    private userLoyaltySummaryService: UserLoyaltySummaryService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private SpinnerService: NgxSpinnerService
  ) {
  //loader_count = 0;
  }

  searchKey: string;
  searchValue: string;
  modalRef: BsModalRef;
  pageNumber: number = 1;
  loader_count: number = 0;
  loyaltyDetailsPageNumber: number = 1;

  userBasicDetails: UserBasicDetails;
  userAccountDetails: UserAccountDetails;
  userDetails: UserBasicDetails[];
  userAccDetails: UserAccountDetails[];
  transactionHistory: TransactionHistory[];
  loyaltyDetails: LoyaltyDetails[];
  userLoyaltySummary: UserLoyaltySummary;
  alerts: any[];

  ngOnInit() {
    // extract parameters from activated route
    this.route.queryParams.subscribe(params => {
      this.commonservice.fetchPrevPage().subscribe(page => {
        this.pageNumber = page;
      });
      this.searchKey = params["key"];
      this.searchValue = params["value"];
      this.commonservice.setSearchBarKey(this.searchKey);
      this.commonservice.setSearchBarValue(this.searchValue);
      if (this.searchKey != null && this.searchKey != "select") {
        const formattedSearchKey = this.searchKey.small().replace("_", "");
        this.clearAllData();
        if (formattedSearchKey.search(/mobile/gi) != -1) {
          this.getUserBasicDetailsByMobileNumber();
          this.getUserAccountDetailsByMobileNumber();
          this.getTransactionHistoryDetails();
        } else if (formattedSearchKey.search(/device/gi) != -1) {
          this.getUserDetailsByDeviceId();
        } else if (formattedSearchKey.search(/customer/gi) != -1) {
            this.getUserDetailsByCustomerId();
            this.getAccountDetailsByCustomerId();
            this.getTransactionHistoryDetails();
          } else if (formattedSearchKey.search(/analytics/gi) != -1) {
          this.getUserDetailsByAnalyticsId();
          this.getAccountDetailsByAnalyticsId();
          this.getTransactionHistoryDetails();
        } else {
          this.getUserBasicDetailsByTransactionId();
          this.getUserAccountDetailsByTransactionId();
          this.getTransactionHistoryDetails();
        }
      }
    });
    console.log(this.transactionHistory);
  }

  /*********************************Method to Fetch user details by mobile number***********************************/
  getUserBasicDetailsByMobileNumber() {
    if (this.searchValue != null) {
      console.log('here');
      this.loader_count = this.loader_count + 1;
       this.SpinnerService.show();
      this.userService
        .getUserByMobileNumber(this.searchValue)

        .then(
          userDetails => {
            this.userBasicDetails = userDetails;
            //this.getLoyaltyDetailsForUser();
            //this.getUserLoyaltySummaryUserId();
            this.loader_count = this.loader_count - 1;
            if(this.loader_count == 0){
                   this.SpinnerService.hide();
                   }
          },
          error => {
            this.alerts = [
              {
                type: "danger",
                msg: error,
                timeout: 5000
              }
            ];
          }
        );
    }
  }

  getUserAccountDetailsByMobileNumber() {
      if (this.searchValue != null) {
        console.log('here');
               this.SpinnerService.show();
                this.loader_count = this.loader_count + 1;
        this.userService
          .getAccountDetailsByMobileNumber(this.searchValue)

          .then(
            userAccDetails => {
              this.userAccountDetails = userAccDetails;
                      this.loader_count = this.loader_count - 1;
                                 if(this.loader_count == 0){
                                        this.SpinnerService.hide();
                                        }
            },
            error => {
              this.alerts = [
                {
                  type: "danger",
                  msg: error,
                  timeout: 5000
                }
              ];
            }
          );
      }
    }

  getUserBasicDetailsByTransactionId() {
      if (this.searchValue != null) {
        console.log('here');
               this.SpinnerService.show();
               this.loader_count = this.loader_count +1;
        this.userService
          .getUserByTransactionId(this.searchValue)

          .then(
            userDetails => {
              this.userBasicDetails = userDetails;
            this.loader_count = this.loader_count - 1;
                       if(this.loader_count == 0){
                              this.SpinnerService.hide();
                              }
            },
            error => {
              this.alerts = [
                {
                  type: "danger",
                  msg: error,
                  timeout: 5000
                }
              ];
            }
          );
      }
    }

   getUserAccountDetailsByTransactionId() {
         if (this.searchValue != null) {
           console.log('here');
           this.SpinnerService.show();
           this.loader_count = this.loader_count +1;
           this.userService
             .getAccountDetailsByOrderUid(this.searchValue)

             .then(
               userAccDetails => {
                 this.userAccountDetails = userAccDetails;
                 this.loader_count = this.loader_count - 1;
                            if(this.loader_count == 0){
                                   this.SpinnerService.hide();
                                   }
               },
               error => {
                 this.alerts = [
                   {
                     type: "danger",
                     msg: error,
                     timeout: 5000
                   }
                 ];
               }
             );
         }
       }

  getUserDetailsByCustomerId() {
    if (this.searchValue != null) {
      console.log('here');
      this.SpinnerService.show();
      this.loader_count = this.loader_count +1;
      this.userService
        .getUserByCustomerId(this.searchValue)

        .then(
          userDetails => {
            this.userBasicDetails = userDetails;
            //this.getLoyaltyDetailsForUser();
            //this.getUserLoyaltySummaryUserId();
            this.loader_count = this.loader_count - 1;
                       if(this.loader_count == 0){
                              this.SpinnerService.hide();
                              }
          },
          error => {
            this.alerts = [
              {
                type: "danger",
                msg: error,
                timeout: 5000
              }
            ];
          }
        );
    }
  }

  getAccountDetailsByCustomerId() {
      if (this.searchValue != null) {
        console.log('here');
        this.SpinnerService.show();
        this.loader_count = this.loader_count +1;
        this.userService
          .getAccountDetailsByCustomerId(this.searchValue)

          .then(
            userAccDetails => {
              this.userAccountDetails = userAccDetails;
              this.loader_count = this.loader_count - 1;
                         if(this.loader_count == 0){
                                this.SpinnerService.hide();
                                }
            },
            error => {
              this.alerts = [
                {
                  type: "danger",
                  msg: error,
                  timeout: 5000
                }
              ];
            }
          );
      }
    }

  getUserDetailsByAnalyticsId() {
    if (this.searchValue != null) {
      console.log('here');
      this.SpinnerService.show();
      this.loader_count = this.loader_count +1;
      this.userService
        .getUserByAnalyticsId(this.searchValue)

        .then(
          userDetails => {
            this.userBasicDetails = userDetails;
            this.loader_count = this.loader_count - 1;
                       if(this.loader_count == 0){
                              this.SpinnerService.hide();
                              }
            //this.getLoyaltyDetailsForUser();
            //this.getUserLoyaltySummaryUserId();
          },
          error => {
            this.alerts = [
              {
                type: "danger",
                msg: error,
                timeout: 5000
              }
            ];
          }
        );
    }
  }

  getAccountDetailsByAnalyticsId() {
      if (this.searchValue != null) {
        console.log('here');
        this.SpinnerService.show();
        this.loader_count = this.loader_count +1;
        this.userService
          .getAccountDetailsByAnalyticsId(this.searchValue)

          .then(
            userAccDetails => {
              this.userAccountDetails = userAccDetails;
             this.loader_count = this.loader_count - 1;
                        if(this.loader_count == 0){
                               this.SpinnerService.hide();
                               }
            },
            error => {
              this.alerts = [
                {
                  type: "danger",
                  msg: error,
                  timeout: 5000
                }
              ];
            }
          );
      }
    }

  /*********************************Method to Fetch transaction history by user id************************************/
  getTransactionHistoryByMobileNumber() {
  this.SpinnerService.show();
  this.loader_count = this.loader_count +1;
    this.transactionHistoryService
      .getTransactionHistory(
        "mobile",
        this.userBasicDetails.userDetails.mobile,
        this.pageNumber
      )
      .then(
        transactionHistory => {
          this.transactionHistory = transactionHistory;
          this.loader_count = this.loader_count - 1;
                     if(this.loader_count == 0){
                            this.SpinnerService.hide();
                            }
        },
        error => {
          this.alerts = [
            {
              type: "danger",
              msg: error,
              timeout: 5000
            }
          ];
        }
      );
  }

  getUserLoyaltySummaryUserId() {
    this.userLoyaltySummaryService
      .getUserLoyaltySummaryByUserId(this.userBasicDetails.userDetails.user_uid)
      .then(
        userLoyaltySummary => {
          this.userLoyaltySummary = userLoyaltySummary;
        },
        error => {
          this.alerts = [
            {
              type: "danger",
              msg: error,
              timeout: 5000
            }
          ];
        }
      );
  }

  /*********************************Method to Fetch loyalty details by user id***************************************/
  getLoyaltyDetailsForUser() {
    this.userService
      .getUserLoyaltyDetails(
        this.userBasicDetails.userDetails.user_uid,
        this.pageNumber
      )
      .then(
        loyaltyDetails => {
          this.loyaltyDetails = loyaltyDetails;
        },
        error => {
          this.alerts = [
            {
              type: "danger",
              msg: error,
              timeout: 5000
            }
          ];
        }
      );
  }

  /*********************************Method to fetch user details by device id****************************************/
  getUserDetailsByDeviceId() {
    this.userService
      .getUserByDeviceUid(this.searchValue, this.pageNumber)
      .then(
        userDetails => {
          this.userDetails = userDetails;
        },
        error => {
          this.alerts = [
            {
              type: "danger",
              msg: error,
              timeout: 5000
            }
          ];
        }
      );
  }

  /********************Method to fetch transaction history details based on other search params************************/
  getTransactionHistoryDetails() {
    let searchMap = new Map();
    searchMap.set(searchParameters[0], "mobileNumber");
    searchMap.set(searchParameters[1], "analyticsId");
    searchMap.set(searchParameters[2], "customerId");
    searchMap.set(searchParameters[3], "transactionIds");
    searchMap.set(searchParameters[4], "deviceId");
   this.loader_count = this.loader_count + 1;
   console.log(this.loader_count);
        this.SpinnerService.show();
    this.transactionHistoryService
      .getTransactionHistory(
        searchMap.get(this.searchKey),
        this.searchValue,
        this.pageNumber
      )
      .then(
        transactionHistory => {
          this.transactionHistory = transactionHistory;
          this.loader_count = this.loader_count -1;
          if(this.loader_count == 0){
          this.SpinnerService.hide();
          }
        },
        error => {
          this.alerts = [
            {
              type: "danger",
              msg: error,
              timeout: 5000
            }
          ];
        }
      );
  }

  // Capturing the event to update page number for transaction history
  // from the TransactionHistory Component.
  updateTransactionHistoryPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    if (this.userBasicDetails != null) {
      this.getTransactionHistoryByMobileNumber();
    } else if (
      this.userBasicDetails == null &&
      this.transactionHistory.length != null
    ) {
      this.getTransactionHistoryDetails();
    }
  }

  // Capturing the event to update page number for user device details
  // from the UserDeviceDetails Component.
  updateUserDetailsPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getUserDetailsByDeviceId();
  }

  // Capturing the event to update page number for Loyalty details
  // from the LoyaltyDetails Component.
  updateLoyaltyDetailsPage(pageNumber: number) {
    this.loyaltyDetailsPageNumber = pageNumber;
    this.getLoyaltyDetailsForUser();
  }

  // Capturing the event of selected user from UserDeviceDetails
  // component.
  selectedUser(user: UserBasicDetails) {
    this.router.navigate(['/search'], {
      queryParams: {
        key: 'Mobile Number',
        value: user.userDetails.mobile,
      }
    });
  }

  clearAllData() {
    this.userBasicDetails = null;
    this.userDetails = null;
    this.transactionHistory = null;
    this.loyaltyDetails = null;
  }

  openDownloadModal() {
    this.modalRef = this.modalService.show(TransactionReportComponent);
    this.modalRef.content.list = this.transactionHistory;
    this.modalRef.content.closeBtnName = "Close";
  }

  emptyScreen() : void {
    this.commonservice.showEmptyScreen();
  }
}
