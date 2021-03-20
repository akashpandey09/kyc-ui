import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LoginService} from './services/login.service';
import {Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Title} from '@angular/platform-browser';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isUserLoggedIn = false;

  @ViewChild('autoShownModal', {static: false}) autoShownModal: ModalDirective;
  isModalShown = false;

  constructor(private loginService: LoginService,
              private router: Router,
              private titleService: Title,
              private bnIdle: BnNgIdleService) {
    // redirect to home if already logged in
    if (this.loginService.currentUserValue) {
      this.isUserLoggedIn = true;
    }
    this.bnIdle.startWatching(600).subscribe((res) => {
          if(res) {
              this.loginService.logout()
          }
        });
  }

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  ngOnInit() {
    this.titleService.setTitle('CSR Search');
  }
}
