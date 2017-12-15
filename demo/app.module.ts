import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF, Location } from '@angular/common';

import { AppComponent } from './app.component';

import { ChartCommonModule } from '../src/lib/charts/common/chart-common.module';
import { AnaChartsModule } from '../src/lib/charts/ana-charts.module';
import { HistogramChartModule } from '../src/lib/charts/histogram/histogram-chart.module';

import { ChartOptionsComponent } from './chart-options/chart-options.component';

import { MultiSeriesComponent } from './multi-series/multi-series.component';
import { BoxplotDemoComponent } from './advanced/boxplot-demo.component';
import { HistogramDemoComponent } from './advanced/histogram-demo.component';

import { ComboChartComponent, ComboSeriesVerticalComponent } from './ngx-charts/combo-chart';

@NgModule({
  declarations: [
    AppComponent,
    ChartOptionsComponent,
    MultiSeriesComponent,
    BoxplotDemoComponent,
    HistogramDemoComponent,
    ComboChartComponent,
    ComboSeriesVerticalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartCommonModule,
    AnaChartsModule,
    HistogramChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
