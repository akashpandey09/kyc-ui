import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [DatePipe]
})
export class CardComponent implements OnInit {

  @Input() data: any;
  @Input() title: any;
  dataKeys: string[] = [];

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    this.data = Object.values(this.data);
    this.dataKeys = Object.keys(this.data[0]);
  }

  isDate(data: any, key: string): any {
    if (key.toLowerCase().search(/date/gi) != -1) {
      try {
        return this.datePipe.transform(data, 'd MMM y-h:mm a');
      } catch (error) {
        return data;
      }
    } else {
      return data;
    }
  }

  formatKeyHeaders(key: string): string {
    return key.replace(/_/gi, ' ');
  }

}
