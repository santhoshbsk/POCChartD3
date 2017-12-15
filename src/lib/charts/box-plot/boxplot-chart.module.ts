import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BoxplotComponent } from './boxplot.component';
import { BoxplotSeriesComponent } from './boxplot-series.component';
import { BoxploatBoxComponent } from './box-group/boxplot-box.component';
import { BoxploatOutlierComponent } from './box-group/boxplot-outlier.component';
import { BoxploatWhiskerComponent } from './box-group/boxplot-whisker.component';

export {
  BoxplotComponent, BoxplotSeriesComponent,
  BoxploatBoxComponent, BoxploatOutlierComponent, BoxploatWhiskerComponent
};

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    BoxplotComponent,
    BoxplotSeriesComponent,
    BoxploatBoxComponent,
    BoxploatOutlierComponent,
    BoxploatWhiskerComponent
  ],
  exports: [
    BoxplotComponent,
    BoxplotSeriesComponent,
    BoxploatBoxComponent,
    BoxploatOutlierComponent,
    BoxploatWhiskerComponent
  ]
})
export class BoxplotChartModule { }
