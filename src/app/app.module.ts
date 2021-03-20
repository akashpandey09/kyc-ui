import { Ng2TableModule } from "ngx-datatable";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BnNgIdleService } from 'bn-ng-idle';
import { DatePipe } from '@angular/common';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import { TopNavComponent } from "./top-nav/top-nav.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { TransactionReportComponent } from "./transaction-report/transaction-report.component";
import { TransactionHistoryComponent } from "./transaction-history/transaction-history.component";
import { UserDeviceDetailsComponent } from "./user-details/user-device-details/user-device-details.component";
import { OrderInfoComponent } from "./order-info/order-info.component";
import { LoyaltyDetailsComponent } from "./loyalty-details/loyalty-details.component";

import {ForgotPwdComponent} from './forgot-pwd/forgot-pwd.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginService} from './services/login.service';
import {CommonService} from './services/common.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, BsDropdownModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {ResetPwdComponent} from './reset-pwd/reset-pwd.component';
import {UserLoyaltySummaryComponent} from "./user-loyalty-summary/user-loyalty-summary.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {UserDetailsService} from "./services/user-details.service";
import {TransactionHistoryService} from "./services/transaction-history.service";
import {TransactionReportService} from "./services/transaction-report.service";
import {UserLoyaltySummaryService} from "./services/user-loyalty-summary.service";
import {OrderInfoService} from "./services/order-info.service";
import {CardComponent} from "./card/card.component";
import {EmptyScreenComponent} from "./empty-screen/empty-screen.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { UserKycInfoComponent } from './user-kyc-info/user-kyc-info.component';
import { SelectBankComponent } from './select-bank/select-bank.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopNavComponent,
    ForgotPwdComponent,
    ResetPwdComponent,
    CardComponent,
    UserLoyaltySummaryComponent,
    UserDetailsComponent,
    SearchResultComponent,
    TransactionReportComponent,
    TransactionHistoryComponent,
    UserDeviceDetailsComponent,
    OrderInfoComponent,
    LoyaltyDetailsComponent,
    SearchBarComponent,
    EmptyScreenComponent,
    UserKycInfoComponent,
    SelectBankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    Ng2TableModule,
    NgxSpinnerModule
  ],
  providers: [
    CommonService,
    LoginService,
    Title,
    UserDetailsService,
    TransactionHistoryService,
    UserLoyaltySummaryService,
    OrderInfoService,
    TransactionReportService,
    BnNgIdleService,
    DatePipe,
    NgxSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
