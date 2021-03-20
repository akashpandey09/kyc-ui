import { UserBasicDetails } from "./../model/user-details";
import { UserAccountDetails } from "./../model/user-account-details";
import { UserDetailsService } from "./../services/user-details.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { OrderInfoService } from "../services/order-info.service";
import {ActivatedRoute, Router} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-order-info",
  templateUrl: "./order-info.component.html",
  styleUrls: ["./order-info.component.scss"]
})
export class OrderInfoComponent implements OnInit {
  alerts: any[];

  orderUid: string;
  userUid: string;
  notiid: string;
  category_name: string;

  userBasicDetails: UserBasicDetails;
  userAccountDetails: UserAccountDetails;

  orderInfoDetails: any;

  constructor(
    private orderInfoService: OrderInfoService,
    private userService: UserDetailsService,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderUid = params["order_uid"];
      this.userUid = params["user_uid"];
      this.notiid = params["notiid"];
      this.category_name = params["category_name"];

      this.getOrderInfoDetailsByOrderUid();
      this.userService.getUserByOrderUid(this.orderUid);
      this.userService.getAccountDetailsByOrderUid(this.orderUid);
    });
  }

  /*********************************Method to Fetch user details by user id***************************************/
  getOrderInfoDetailsByOrderUid() {
  this.SpinnerService.show();
    this.orderInfoService.getOrderInfoDetailsByOrderUid(this.orderUid ,this.notiid ,this.category_name)
      .then(
      orderInfoDetails =>{
        this.orderInfoDetails = orderInfoDetails;
        this.SpinnerService.hide();
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
    console.log(this.orderInfoDetails)
  }

  getLastSearchedCustomerDetails() {
    return this.userService.getLastSearchedCustomerDetails();
  }

  getLastSearchedCustomerAccountDetails() {
      return this.userService.getLastSearchedCustomerAccountDetails();
  }

  formatKeyHeaders(key: string): string {
    return key.replace(/_/gi, ' ').toUpperCase();
  }

}
