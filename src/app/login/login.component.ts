import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {LoginService} from '../services/login.service';
import {Constants} from '../common/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  alerts: any[];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService) {
    // redirect to home if already logged in
    if (this.loginService.currentUserValue) {
      this.router.navigate(['empty-screen']);
    }
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      accEmailAddFld: ['', [Validators.required, Validators.email]],
      accPwdFld: ['', [Validators.required, Validators.minLength(6)]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'empty-screen';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /*********************************Method to Submit Login Form***************************************/
  onLoginFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return;
//     }

      localStorage.setItem('id_token', "abcd");
     window.location.href = this.returnUrl;
  }
}
