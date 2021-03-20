import {CHECK_FIELDS} from '../model/transaction-report';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {TransactionReportService} from '../services/transaction-report.service';
import {TopNavComponent} from "../top-nav/top-nav.component";
import {searchParameters} from "../model/search-param";
import {environment} from "../../environments/environment";
import {CommonService} from '../services/common.service'

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss']
})
export class TransactionReportComponent implements OnInit {

  fileName: string = '';
  title: string = 'Generate Report';
  checkedFields: any[];
  isSelectAll: boolean = false;
  alerts: any[];
  disableDownload: boolean = true;
  sharedSearchBarKey: string = '';
  sharedSearchBarValue: string = '';
  private csr_search_url: string = environment.search_url;
  topNavComponent: TopNavComponent

  reportFieldMapper = new Map();

  constructor(private reportService: TransactionReportService,
              public modalRef: BsModalRef,
              public commonService: CommonService) {
  }

  ngOnInit() {
    this.checkedFields = JSON.parse(JSON.stringify(CHECK_FIELDS));

    //this.reportFieldMapper.set(CHECK_FIELDS[0].name, 'transaction_id');
    this.reportFieldMapper.set(CHECK_FIELDS[0].name, 'order_uid');
    this.reportFieldMapper.set(CHECK_FIELDS[1].name, 'order_cbs');
    this.reportFieldMapper.set(CHECK_FIELDS[2].name, 'order_oid');
    this.reportFieldMapper.set(CHECK_FIELDS[3].name, 'order_utr');
    this.reportFieldMapper.set(CHECK_FIELDS[4].name, 'total_amount');
    this.reportFieldMapper.set(CHECK_FIELDS[5].name, 'category_name');
    this.reportFieldMapper.set(CHECK_FIELDS[6].name, 'order_state');
    this.reportFieldMapper.set(CHECK_FIELDS[7].name, 'status_desc');
    this.reportFieldMapper.set(CHECK_FIELDS[8].name, 'debit_acc_no');
    this.reportFieldMapper.set(CHECK_FIELDS[9].name, 'credit_acc_no');
    this.reportFieldMapper.set(CHECK_FIELDS[10].name, 'status');
    this.reportFieldMapper.set(CHECK_FIELDS[11].name, 'txn_mode');
    this.reportFieldMapper.set(CHECK_FIELDS[12].name, 'payment_initiated_at');
    this.reportFieldMapper.set(CHECK_FIELDS[13].name, 'payment_success_at');
    this.reportFieldMapper.set(CHECK_FIELDS[14].name, 'updated_date');
    this.reportFieldMapper.set(CHECK_FIELDS[15].name, 'inserted_date');
    this.reportFieldMapper.set(CHECK_FIELDS[16].name, 'notiid');
    //this.reportFieldMapper.set(CHECK_FIELDS[14].name, 'mbs_ref_number');
    //this.reportFieldMapper.set(CHECK_FIELDS[15].name, 'coupon_code');
    //this.reportFieldMapper.set(CHECK_FIELDS[16].name, 'subscriber_no');
    //this.reportFieldMapper.set(CHECK_FIELDS[17].name, 'company_name');

    console.log(this.reportFieldMapper);

    this.commonService.sharedSearchBarKey.subscribe(key => this.sharedSearchBarKey = key);
    this.commonService.sharedSearchBarValue.subscribe(value => this.sharedSearchBarValue = value);
  }

  downloadReport() {
    this.reportService.formAndUploadReport(this.formObjectForReport()),
      error => {
        this.alerts = [{
          type: 'danger',
          msg: error,
          timeout: 5000
        }];
      };
  }

  toggleCheck(event: any, index: number) {
    if (index >= 0) {
      this.checkedFields[index].isChecked = event.target.checked;
      this.isSelectAll = false;

    } else {
      this.checkedFields.map(field => field.isChecked = event.target.checked);
      this.isSelectAll = event.target.checked;
    }
    this.validateRequest(this.fileName, this.checkedFields.filter(field => field.isChecked == true));
  }

  formObjectForReport(): any {
    let list = this.modalRef.content.list;

    let checkedFields = this.checkedFields.filter(field => field.isChecked == true);
    let fields;
    if (checkedFields && checkedFields.length > 0) {
      fields = checkedFields.map(field => this.reportFieldMapper.get(field.name)).filter(data => data != "");
    }
    let lastSearchedQuery = {
      key: this.sharedSearchBarKey,
      value: this.sharedSearchBarValue
    };
    console.log(lastSearchedQuery);

    let searchMap = new Map();
    searchMap.set(searchParameters[0], "mobileNumber");
    searchMap.set(searchParameters[1], "analyticsId");
    searchMap.set(searchParameters[2], "customerId");
    searchMap.set(searchParameters[3], "transactionIds");
    searchMap.set(searchParameters[4], "deviceId");

    let param = searchMap.get(lastSearchedQuery.key);
    let paramValue = lastSearchedQuery.value;

    let query_url: string = "None";

    if (param == "mobileNumber") {
      query_url = this.csr_search_url + `/v1/report/download?mobileNumber=${paramValue}`;
    } else if (param == "analyticsId") {
      query_url = this.csr_search_url + `/v1/report/download?analyticsId=${paramValue}`;
    } else if (param == "customerId") {
      query_url = this.csr_search_url + `/v1/report/download?customerId=${paramValue}`;
    } else if (param == "transactionIds") {
      query_url = this.csr_search_url + `/v1/report/download?transactionIds=${paramValue}`;
    } else {
      return;
    }

    console.log(query_url);

    return {
      fileName: this.fileName,
      fields: fields,
      query_url_prefix: query_url
    };
  }

  validateRequest(fileName?: string, fields?: any[]) {
    this.disableDownload = !(fields && fields.length > 0 && fileName && fileName != '');
  }

  validateFilename() {
    if (this.fileName == '') {
      this.disableDownload = true;
    } else {
      this.validateRequest(this.fileName, this.checkedFields.filter(field => field.isChecked == true));
    }
  }

}
