import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Constants} from '../common/constants';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {
  forgotPwdForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  showSuccessLink = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService) {
  }

  ngOnInit() {
    // redirect to home if already logged in
    if (this.loginService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.forgotPwdForm = this.formBuilder.group({
      emailFld: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPwdForm.controls;
  }

  /*******************************Method to submit Forgot Password Form***************************************** */
  forgotPwdFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotPwdForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginService.forgotUserPwd(this.f.emailFld.value).then(
      res => {
        this.loading = false;
        if (res === `Record stored successfully.`) {// success
          this.showSuccessLink = true;
        } else {
          this.alerts = [{
            type: 'danger',
            msg: res.message,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
      },
      error => {
        this.alerts = [{
          type: 'danger',
          msg: JSON.parse(error).message,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
        this.loading = false;
      });
  }

}
