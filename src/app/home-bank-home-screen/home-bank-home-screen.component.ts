import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-home-bank-home-screen',
  templateUrl: './home-bank-home-screen.component.html',
  styleUrls: ['./home-bank-home-screen.component.css']
})
export class HomeBankHomeScreenComponent implements OnInit {

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
