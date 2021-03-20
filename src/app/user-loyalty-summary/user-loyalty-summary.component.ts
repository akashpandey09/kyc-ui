import { UserLoyaltySummary } from '../model/user-loyalty-summary';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-user-loyalty-summary',
  templateUrl: './user-loyalty-summary.component.html',
  styleUrls: ['./user-loyalty-summary.component.scss']
})
export class UserLoyaltySummaryComponent {

  constructor() { }

  @Input() userLoyaltySummary: UserLoyaltySummary;
 

}
