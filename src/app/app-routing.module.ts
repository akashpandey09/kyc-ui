import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ForgotPwdComponent} from './forgot-pwd/forgot-pwd.component';
import {ResetPwdComponent} from './reset-pwd/reset-pwd.component';
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {OrderInfoComponent} from "./order-info/order-info.component";
import {TransactionReportComponent} from "./transaction-report/transaction-report.component";
import {SearchResultComponent} from "./search-result/search-result.component";
import {EmptyScreenComponent} from "./empty-screen/empty-screen.component";
import {UserKycInfoComponent} from "./user-kyc-info/user-kyc-info.component";
import {SelectBankComponent} from "./select-bank/select-bank.component";



const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "index", component: SearchResultComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpwd', component: ForgotPwdComponent},
  {path: 'resetpwd/:id', component: ResetPwdComponent},
  {path: "search", component: SearchResultComponent},
  {path: "report", component: TransactionReportComponent},
  {path: "order", component: OrderInfoComponent},
  {path: "search-bar", component: SearchBarComponent},
  {path: "empty-screen", component: EmptyScreenComponent},
  {path: "kyc-info", component: UserKycInfoComponent},
  {path: "select-bank", component: SelectBankComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
