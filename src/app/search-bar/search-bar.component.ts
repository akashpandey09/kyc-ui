import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener
} from "@angular/core";
import { Constants } from "../common/constants";
import { searchParameters } from "../model/search-param";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from "../services/common.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  searchParams: string[];
  selectedSearchKey: string;
  searchValue: string;
  dataType: string = "text";

  isSelected: boolean = false;
  alerts: any[];
  changePwdPrmsn: boolean = true;

  ngOnInit(): void {
    this.titleService.setTitle(Constants.CSR_SEARCH);
    this.commonService.setTitle(Constants.CSR_SEARCH);
    this.searchParams = searchParameters;
    this.route.queryParams.subscribe(params => {
      this.selectedSearchKey =
        params["key"] || params["key"] == "" ? params["key"] : "Select";
      this.searchValue = params["value"];
    });
  }

  constructor(
    public commonService: CommonService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {
    /*****************Section wise permission check based on role******************/
  }

  @HostListener("mouseleave") closeDropdown() {
    this.isSelected = false;
  }

  searchResults(data) {
    this.searchValue = "";
    this.selectedSearchKey = data;
    if (data.search(/mobile/gi) != -1) {
      this.dataType = "number";
    }
  }

  onKeydown(event) {
    this.storeSearchResultsAndRoute();
  }

  storeSearchResultsAndRoute() {
    this.router.navigate(["/search"], {
      queryParams: {
        key: this.selectedSearchKey,
        value: this.searchValue
      }
    });
  }
}
