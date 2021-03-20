import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  HostListener,
  HostBinding,
  Input,
  Injectable
} from '@angular/core';
import {CommonService} from '../services/common.service'
import {LoginService} from '../services/login.service';
import {searchParameters} from '../model/search-param';
import {Router, ActivatedRoute} from '@angular/router';
import {UserDetailsService} from "../services/user-details.service";


@Component({
  selector: 'app-select-bank',
  templateUrl: './select-bank.component.html',
  styleUrls: ['./select-bank.component.css']
})
export class SelectBankComponent implements OnInit {
 searchParams: string[];
  selectedSearchKey: string;
  searchValue: string;
  dataType: string = 'text';

  ngOnInit(): void {
    this.searchParams = searchParameters;
    this.route.queryParams.subscribe(params => {
      this.selectedSearchKey = params['key'] || params['key'] == '' ? params['key'] : 'Select';
      this.searchValue = params['value'];
    })
  }

  isSelected: boolean = false;

  constructor(public commonService: CommonService,
              private cdr: ChangeDetectorRef,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private userDetailsService: UserDetailsService) {

  }

  @HostListener('mouseleave') closeDropdown() {
    this.isSelected = false;
  }

  toggleSideNav() {
    this.isSelected = !this.isSelected;
  }

  searchResults(data) {
    this.selectedSearchKey = data;
    if (data.search(/mobile/gi) != -1) {
      this.dataType = 'number';
    }
  }

  onKeydown(event) {
    this.storeSearchResultsAndRoute();
  }

  storeSearchResultsAndRoute() {
    this.userDetailsService.clearLastSearchedCustomerDetails();
    this.router.navigate(['/search'], {
      queryParams: {
        key: this.selectedSearchKey,
        value: this.searchValue,
      }
    });
  }

  logout() {
    this.loginService.logout();
  }

  functionClick($event) {
    if (this.isSelected) {
      this.isSelected = false;
    }
  }

  ngAfterViewInit() {
    this.commonService.currentPage.subscribe(() => {
      this.cdr.detectChanges();
    }, err => {
      console.log(err);
    });
  }

  emptyScreen(): void {
    this.router.navigate(['/empty-screen']);
  }

  getLastSearchQuery(): any {
    return {
      key: this.selectedSearchKey,
      value: this.searchValue,
    }
  }

}
