import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss']
})


export class EmptyScreenComponent implements OnInit {

  constructor(public router: Router) {
  }

  doKyc() {
      // stop here if form is invalid
  //     if (this.loginForm.invalid) {
  //       return;
  //     }

       window.location.href = 'kyc-info';
    }

    verifyKyc() {
          // stop here if form is invalid
      //     if (this.loginForm.invalid) {
      //       return;
      //     }

           window.location.href = 'select-bank';
        }

  ngOnInit() {
  }

}
