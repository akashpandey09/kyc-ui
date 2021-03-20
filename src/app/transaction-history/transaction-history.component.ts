import {Component, EventEmitter, Input, Output, ViewEncapsulation, OnChanges, OnInit} from '@angular/core';
import {TransactionHistory} from '../model/transaction-history';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {DatePipe} from '@angular/common';
import {CommonService} from '../services/common.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
  providers: [DatePipe]
})
export class TransactionHistoryComponent implements OnChanges, OnInit {

  pageNumber: number = 1;
  pageSize: number = environment.page_size;
  rows_on_page: Map<number, number> = new Map<number, number>();
  alerts: any[];
  @Input() transactionHistory: TransactionHistory[];
  rowData: any[] = [];
  @Output() pageNumberChange = new EventEmitter();

  constructor(private router: Router, private datePipe: DatePipe, public commonService : CommonService) {
  }

  ngOnInit() {
    this.onChangeTable(this.config);
    this.rows_on_page[-1] = 0;
    this.rows_on_page[0] = 0;
  }

  ngOnChanges() {
    if (this.transactionHistory) {
      this.commonService.fetchPrevPage().subscribe(page => {
        this.pageNumber = page;
      });
      this.rows_on_page.set(this.pageNumber, this.transactionHistory.length);
      this.addAndFormatRow();
    }
  }

  public columns: Array<any> = [
    {title: 'SI no', name: 'si_no', sort: ''},
//     {title: 'Transaction ID', name: 'transaction_id', className: ['column-header']},
    {title: 'Order ID', name: 'order_uid'},
    {title: 'Order CBS ID', name: 'order_cbs'},
    {title: 'Order OID', name: 'order_oid'},
    {title: 'Order UTR', name: 'order_utr'},
    {title: 'Amount', name: 'total_amount'},
    {title: 'Category', name: 'category_name'},
    {title: 'Order Status', name: 'order_state'},
    {title: 'Status Desc', name: 'status_desc'},
//     {title: 'Transaction Date', name: 'transaction_date'},
    {title: 'Txn Mode', name: 'txn_mode'},
    {title: 'Debit Account', name: 'debit_acc_no'},
    {title: 'Credit Account', name: 'credit_acc_no'},
    {title: 'Payment Initiated At', name: 'payment_initiated_at'},
    {title: 'Payment Success At', name: 'payment_success_at'},
//     {title: 'Updated Date', name: 'updated_date'},
//     {title: 'Inserted Date', name: 'inserted_date'},
    {title: 'Notiid', name: 'notiid'},
    {title: 'Status', name: 'status'},
//     {title: 'MBS Ref Number', name: 'mbs_ref_number'},
//     {title: 'Coupon Code', name: 'coupon_code'},
//     {title: 'Company', name: 'company_name'},
//     {title: 'Subscriber Number', name: 'subscriber_no'}
  ];

  private addAndFormatRow() {
    let start_serial_number: number = 0;
    this.commonService.fetchPageDetailsMap().subscribe(map => {
      if(Object.keys(map).length > 0){
        this.rows_on_page = map;
      }
    });
    this.rows_on_page.forEach((value, key) => {
      if (key < this.pageNumber) {
        start_serial_number += value;
      }
    });
    for (let i = 0; i < this.transactionHistory.length; i++) {
      this.rowData.push({
          'transaction_id': this.transactionHistory[i].transaction_id || 'Not Available',
//           'transaction_date': this.datePipe.transform(this.transactionHistory[i].transaction_date, 'd MMM y-h:mm a') || 'Not Available',
//           'company_name': this.transactionHistory[i].company_name || 'Not Available',
//           'subscriber_no': this.transactionHistory[i].subscriber_no || 'Not Available',
          'category_name': this.transactionHistory[i].category_name || 'Not Available',
          'total_amount': this.transactionHistory[i].total_amount || 'Not Available',
          'order_state': this.transactionHistory[i].order_state || 'Not Available',
          'order_uid': this.transactionHistory[i].order_uid || 'Not Available',
          'order_cbs': this.transactionHistory[i].order_cbs || 'Not Available',
          'order_oid': this.transactionHistory[i].order_oid || 'Not Available',
          'order_utr': this.transactionHistory[i].order_utr || 'Not Available',
          'status_desc': this.transactionHistory[i].status_desc || 'Not Available',
          'status': this.transactionHistory[i].status || 'Not Available',
//           'coupon_code': this.transactionHistory[i].coupon_code || 'Not Available',
          'user_uid': this.transactionHistory[i].user_uid || 'Not Available',
          'si_no': start_serial_number + i + 1,
          'debit_acc_no': this.transactionHistory[i].debit_acc_no || 'Not Available',
          'txn_mode': this.transactionHistory[i].txn_mode || 'Not Available',
          'credit_acc_no': this.transactionHistory[i].credit_acc_no || 'Not Available',
          'payment_initiated_at': this.commonService.dateParser(this.transactionHistory[i].payment_initiated_at)  || 'Not Available',
          'payment_success_at': this.commonService.dateParser(this.transactionHistory[i].payment_success_at) || 'Not Available',
//           'updated_date': this.commonService.dateParser(this.transactionHistory[i].updated_date) || 'Not Available',
//           'inserted_date': this.commonService.dateParser(this.transactionHistory[i].inserted_date) || 'Not Available',
          'notiid': this.transactionHistory[i].category_id || 'Not Available',
//           'mbs_ref_number': this.transactionHistory[i].mbs_ref_number || 'Not Available'
        }
      );
    }
  }

  public config: any = {
    sorting: {columns: this.columns}
  };

  // private formatDate(row)

  public onChangeTable(config: any): any {
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
  }

  updatePage(sign: number) {
    this.rowData = [];
    if (sign == -1 && this.pageNumber > 1) {
      this.pageNumber += -1;
    } else if (sign == 1) {
      this.pageNumber += 1;
    } else {
      this.pageNumber = 1;
    }
    console.log('page number');
    console.log(this.pageNumber);
    this.commonService.sendPrevPage(this.pageNumber);
    this.commonService.sendPageDetailMap({});
    this.pageNumberChange.emit(this.pageNumber);
  }

  selectedRow(selectedTransaction: any) {
    this.commonService.sendPrevPage(this.pageNumber);
    this.commonService.sendPageDetailMap(this.rows_on_page);
    this.router.navigate(['/order'], {
      queryParams: {
        order_uid: selectedTransaction.row.order_uid,
        user_uid: selectedTransaction.row.user_uid,
        notiid: selectedTransaction.row.notiid,
        category_name: selectedTransaction.row.category_name
      }
    });
  }

  /******************************* Create infinite scrolling ***********************************/
  /* @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if(pos == max )   {
    this.updatePage(1);
    }
  }
  */

}
