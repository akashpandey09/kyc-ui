import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from "@angular/core";
import { UserBasicDetails } from "../model/user-details";
import { UserAccountDetails } from "../model/user-account-details";
import { UserLoyaltySummary } from "../model/user-loyalty-summary";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UserLoyaltySummaryService } from "../services/user-loyalty-summary.service";
import { UserDetailsService} from "../services/user-details.service";
import {CommonService} from '../services/common.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"]
})
export class UserDetailsComponent implements OnInit {
  @Input() userBasicDetails: UserBasicDetails;
  @Input() userAccountDetails: UserAccountDetails;
  @Input() showLoyaltySummary: boolean = false;
  userLoyaltySummary: UserLoyaltySummary;
  modalRef: BsModalRef;
  alerts: any[];
  accVisibleIndex = 0;
  vidVisibleIndex = 0;
  cardVisibleIndex = 0;
  ghVisibleIndex = 0;
  ngOnInit(): void {
    console.log('inside user details ts');
    console.log(this.userAccountDetails);
    console.log(this.userBasicDetails);
  }

  constructor(
    private userLoyaltySummaryService: UserLoyaltySummaryService,
    private modalService: BsModalService,
    private userDetailsService: UserDetailsService, public commonService : CommonService
  ) {}

  getLastSearchedCustomerDetails() {
    return this.userDetailsService.getLastSearchedCustomerDetails();
  }

  showSubItem(cat) {
      if(cat == 'acc'){
        this.accVisibleIndex = this.accVisibleIndex ^ 1;
      }else if(cat == 'vid'){
        this.vidVisibleIndex = this.vidVisibleIndex ^ 1;
      }else if(cat == 'card'){
        this.cardVisibleIndex = this.cardVisibleIndex ^ 1;
      }else if(cat == 'gh'){
        this.ghVisibleIndex = this.ghVisibleIndex ^ 1;
      }
    }

  getUserLoyaltySummary() {
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

  displayLoyaltySummary() {
    this.showLoyaltySummary = true;
    this.getUserLoyaltySummary();
  }

  displayUserDetails() {
    this.showLoyaltySummary = false;
  }
}
