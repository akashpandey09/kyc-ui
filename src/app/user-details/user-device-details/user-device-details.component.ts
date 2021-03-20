import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UserBasicDetails } from '../../model/user-details';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-user-device-details',
  templateUrl: './user-device-details.component.html',
  styleUrls: ['./user-device-details.component.scss']
})
export class UserDeviceDetailsComponent implements OnInit, OnChanges {

  private pageSize = environment.page_size;
  dataSource: any;
  pageNumber: number = 1;
  alerts: any[];
  rowData: any[] = [];
  @Input() userDetails: UserBasicDetails[];
  @Output() pageNumberChange = new EventEmitter();
  @Output() selectedUser = new EventEmitter();

  ngOnInit(): void {
    this.onChangeTable(this.config);
  }

  ngOnChanges() {
    this.addAndFormatRow();
  }

  constructor() { }

  public columns:Array<any> = [
    {title: 'SI no', name: 'si_no'},
    {title: 'Mobile Number', name: 'mobile'},
    {title: 'Email ID', name: 'email'},
    {title: 'Referred User', name: 'referred_user'},
    {title: 'Partner Name', name: 'partner_name'}
  ];

  private addAndFormatRow() {
    for (let i=0;i<this.userDetails.length; i++) {
      let data = this.userDetails[i];
      this.rowData.push({
        'mobile':this.userDetails[i].userDetails.mobile || 'Not Available',
        'referred_user':this.userDetails[i].userDetails.referred_user || 'Not Available',
        'partner_name':this.userDetails[i].userDetails.partner_name || 'Not Available',
        'email':this.userDetails[i].userDetails.email || 'Not Available',
        'user_uid':this.userDetails[i].userDetails.user_uid || 'Not Available',
        'device_id':this.userDetails[i].userDetails.device_id || 'Not Available',
        'multiple_partners':this.userDetails[i].userDetails.multiple_partners || 'Not Available',
        'is_referred_user':this.userDetails[i].userDetails.is_referred_user || 'Not Available',
        'is_rooted_device':this.userDetails[i].userDetails.is_rooted_device || 'Not Available',
        'app_version_code':this.userDetails[i].userDetails.app_version_code || 'Not Available',
        'si_no': (this.pageNumber-1)*this.pageSize + i+1,
        'login_mode' : this.userDetails[i].userDetails.login_mode || 'Not Available',
        'customer_name' : this.userDetails[i].userDetails.customer_name || 'Not Available',
        'created_time' : this.userDetails[i].userDetails.created_time || 'Not Available',
        'login_date_time' : this.userDetails[i].userDetails.login_date_time || 'Not Available',
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

  public onChangeTable(config:any):any {
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    let sortedData = this.changeSort(this.rowData, this.config);
  }

  updatePage(sign: number) {
    if (this.userDetails.length < 20 && sign > 0) {
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

  selectedRow(selectedUser: any) {
    this.selectedUser.emit(selectedUser.row);
  }

}
