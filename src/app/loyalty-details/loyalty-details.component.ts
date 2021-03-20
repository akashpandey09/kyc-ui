import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { LoyaltyDetails } from '../model/loyalty-details';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-loyalty-details',
  templateUrl: './loyalty-details.component.html',
  styleUrls: ['./loyalty-details.component.scss'],
  providers: [DatePipe]
})
export class LoyaltyDetailsComponent implements OnInit, OnChanges {

  dataSource: any;
  pageSize = environment.page_size;
  pageNumber: number = 1;
  alerts: any[];
  @Input() loyaltyDetails: LoyaltyDetails[];
  @Output() pageNumberChange = new EventEmitter();
  rowData: any[] = [];

  constructor(private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.onChangeTable(this.config);
  }

  ngOnChanges() {
    if (this.loyaltyDetails) {
      this.addAndFormatRow();
    }
  }

  public columns:Array<any> = [
    {title: 'SI no', name: 'si_no', sort: ''},
    {title: 'Transaction ID', name: 'transaction_id'},
    {title: 'Credit Status', name: 'credit_status'},
    {title: 'Credit Type', name: 'credit_type'},
    {title: 'Credit Effective Date', name: 'credit_effective_date'},
    {title: 'Points Credited', name: 'points_credited'},
    {title: 'Points Redeemed', name: 'points_redeemed'},
    {title: 'Redeemed Date', name: 'redeemed_date'}
  ];

  private addAndFormatRow() {
    for (let i=0;i<this.loyaltyDetails.length; i++) {
      let data = this.loyaltyDetails[i];
      this.rowData.push({
        'transaction_id':this.loyaltyDetails[i].transaction_id || 'Not Available',
        'redeemed_date':this.datePipe.transform(this.loyaltyDetails[i].redeemed_date, 'd MMM y-h:mm a' || 'Not Available'),
        'credit_status':this.loyaltyDetails[i].credit_status || 'Not Available',
        'credit_type':this.loyaltyDetails[i].credit_type || 'Not Available',
        'credit_effective_date':this.datePipe.transform(this.loyaltyDetails[i].credit_effective_date, 'd MMM y-h:mm a' || 'Not Available'),
        'points_credited':this.loyaltyDetails[i].points_credited || 'Not Available',
        'points_redeemed':this.loyaltyDetails[i].points_redeemed || 'Not Available',
        'order_uid':this.loyaltyDetails[i].order_uid || 'Not Available',
        'si_no': (this.pageNumber-1)*this.pageSize + i+1
      }
        );
    }
  }

  public config:any = {
    sorting: {columns: this.columns}
  };

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  // private formatDate(row)

  public onChangeTable(config:any):any {
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    let sortedData = this.changeSort(this.rowData, this.config);
  }

  updatePage(sign: number) {
    if (this.loyaltyDetails.length < 20 && sign > 0) {
      return;
    }
    this.rowData = [];
    if (sign == -1 && this.pageNumber > 1) {
      this.pageNumber += -1;
    } else if (sign == 1){
      this.pageNumber += 1;
    } else {
      this.pageNumber = 1;
    }
    this.pageNumberChange.emit(this.pageNumber);
  }

  selectedRow(selectedLoyalty: any) {
    console.log(selectedLoyalty);
    this.router.navigate(['/order'], {
      queryParams:{
        order_uid: selectedLoyalty.row.order_uid, 
        user_uid: selectedLoyalty.row.user_uid,
      }
    });
  }

}
