import { NgModule } from '@angular/core';
import { HistogramBarComponent } from './histogram-bar.component';
import { HistogramSeriesComponent } from './histogram-series.component';
import { HistogramComponent } from './histogram.component';
import { ChartCommonModule } from '../common/chart-common.module';

export {
  HistogramComponent,
  HistogramSeriesComponent,
  HistogramBarComponent
};

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    HistogramComponent,
    HistogramSeriesComponent,
    HistogramBarComponent
  ],
  exports: [
    HistogramComponent,
    HistogramSeriesComponent,
    HistogramBarComponent
  ]
})
export class HistogramChartModule { }
