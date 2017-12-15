import { Component } from '@angular/core';

import { IChart, ChartDefaults } from '../src/lib/model/chart'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  Options: IChart = null;

  ngOnInit() {
    this.Options = ChartDefaults;
  }


}
