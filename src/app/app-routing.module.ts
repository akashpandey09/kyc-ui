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
import {HomeBankLoginComponent} from "./home-bank-login/home-bank-login.component";
import {IcicBankLoginComponent} from "./icic-bank-login/icic-bank-login.component";
import {HomeBankHomeScreenComponent} from "./home-bank-home-screen/home-bank-home-screen.component";
import {IcicBankHomeScreenComponent} from "./icic-bank-home-screen/icic-bank-home-screen.component";







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
  {path: "select-bank", component: SelectBankComponent},
  {path: "home-bank-login", component: HomeBankLoginComponent},
  {path: "icic-bank-login", component: IcicBankLoginComponent},
  {path: "home-bank-home-screen", component: HomeBankHomeScreenComponent},
  {path: "icic-bank-home-screen", component: IcicBankHomeScreenComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
