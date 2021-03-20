import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Constants} from '../common/constants';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html'
})
export class ResetPwdComponent implements OnInit {
  inviteId: string;
  isInvitationValid = true;
  invalidAlerts: any[];
  alerts: any[];
  setPwdForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private loginService: LoginService) {
  }

  ngOnInit() {
    // redirect to home if already logged in
    if (this.loginService.currentUserValue) {
      this.router.navigate(['/']);
    } else {
      this.inviteId = this.route.snapshot.paramMap.get('id');
      this.checkIfInvitationValid();
    }
    /****************Set Password Form Validation****************** */
    this.setPwdForm = this.formBuilder.group({
      newPwdFld: ['', [Validators.required, Validators.minLength(6)]],
      confPwdFld: ['', [Validators.required]]
    }, {validator: this.checkIfMatchingPasswords('newPwdFld', 'confPwdFld')});
  }

  /*******************************Custom Method to Validate New and Confirm Password Fields***************************************** */
  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (changePwdForm: FormGroup) => {
      const passwordInput = changePwdForm.controls[passwordKey];
      const passwordConfirmationInput = changePwdForm.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.setPwdForm.controls;
  }

  /*******************************Method to submit Set Password Form***************************************** */
  setPwdFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.setPwdForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginService.setUserPwd(this.f.newPwdFld.value, this.f.confPwdFld.value, this.inviteId).then(
      res => {
        this.loading = false;
        if (res) {// success
          this.alerts = [{
            type: 'success',
            msg: res,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        } else {
          this.alerts = [{
            type: 'danger',
            msg: `Failed to set the password. Please try again later.`,
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

  /*******************************Method to Check Whether the Set Password Token is Valid or Not*******************************/
  checkIfInvitationValid() {
    this.loginService.verifyPwdToken(this.inviteId).then(
      res => {
        if (res === 'User invite token verified successfully') {
          this.isInvitationValid = true;
        } else {
          this.isInvitationValid = false;
          this.invalidAlerts = [{
            type: 'danger',
            msg: `User invite token has expired.`,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
      },
      error => {
        this.isInvitationValid = false;
        this.invalidAlerts = [{
          type: 'danger',
          msg: JSON.parse(error).message,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
      });
  }
}
