import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { scaleBand, scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';

import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';

@Component({
  selector: 'ana-charts-boxplot',
  template: `
  <ana-charts-chart
  [view]="[width, height]"
  [showLegend]="legend"
  [animations]="animations"
  [legendOptions]="legendOptions"
  (legendLabelClick)="onClick($event)">
  <svg:g [attr.transform]="transform" class="box-ploat chart">
    <svg:g ana-charts-x-axis
      *ngIf="xAxis"
      [xScale]="xScale"
      [dims]="dims"
      [showLabel]="showXAxisLabel"
      [labelText]="xAxisLabel"
      [tickFormatting]="xAxisTickFormatting"
      (dimensionsChanged)="updateXAxisHeight($event)">
    </svg:g>
    <svg:g ana-charts-y-axis
      *ngIf="yAxis"
      [yScale]="yScale"
      [dims]="dims"
      [showLabel]="showYAxisLabel"
      [labelText]="yAxisLabel"
      [tickFormatting]="yAxisTickFormatting"
      (dimensionsChanged)="updateYAxisWidth($event)">
    </svg:g>
    <svg:g ana-charts-boxplot-series
      [xScale]="xScale"
      [yScale]="yScale"
      [colors]="colors"
      [series]="results"
      [dims]="dims"
      [gradient]="gradient"
      [tooltipDisabled]="tooltipDisabled"
      [tooltipTemplate]="tooltipTemplate"
      [animations]="animations"
      (activate)="onActivate($event)"
      (deactivate)="onDeactivate($event)"
      (select)="onClick($event)">
    </svg:g>
  </svg:g>
</ana-charts-chart>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BoxplotComponent extends BaseChartComponent {

  @Input() legend;
  @Input() legendTitle: string = 'Legend';
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() gradient: boolean;
  @Input() innerPadding: number | number[] = 8;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipText: any;

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  xDomain: any[];
  yDomain: any[];
  xScale: any;
  yScale: any;
  xRange: any;
  yRange: any;
  color: any;
  colors: ColorHelper;
  colorScale: any;
  transform: string;
  margin = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  scaleType: string = 'linear';
  maxBoxWidth = null;

  legendOptions: any;

  getX = function (d) { return d.name }; // Default data model selectors.
  getQ1 = function (d) { return d.value.Q1 };
  getQ2 = function (d) { return d.value.Q2 };
  getQ3 = function (d) { return d.value.Q3 };
  getWl = function (d) { return d.value.whisker_low };
  getWh = function (d) { return d.value.whisker_high };
  getOlItems = function (d) { return d.value.outliers };
  getOlValue = function (d, i, j) { return d };

  update(): void {
    super.update();

    this.xDomain = this.getXDomain();
    this.yDomain = this.getYDomain();

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      legendType: this.scaleType
    });

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
  }

  getXDomain(): any {
    let self = this;
    return this.results.map(function (d, i) {
      return self.getX(d);
    });
  }

  getYDomain(): any[] {
    let self = this;
    // (y-range is based on quartiles, whiskers and outliers)
    var values = [], yMin, yMax;
    this.results.forEach(function (d, i) {
      var q1 = self.getQ1(d), q3 = self.getQ3(d), wl = self.getWl(d), wh = self.getWh(d);
      var olItems = self.getOlItems(d);
      if (olItems) {
        olItems.forEach(function (e, i) {
          values.push(self.getOlValue(e, i, undefined));
        });
      }
      if (wl) { values.push(wl) }
      if (q1) { values.push(q1) }
      if (q3) { values.push(q3) }
      if (wh) { values.push(wh) }
    });
    yMin = min(values) || 0;
    yMax = max(values) || 0

    return [yMin, yMax];
  }

  /**
   * Converts the input to gap paddingInner in fraction
   * Supports the following inputs:
   *    Numbers: 8
   *    Strings: "8", "8px", "8%"
   *    Arrays: [8,2], "8,2", "[8,2]"
   *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
   *
   * @param {(string | number | Array<string | number>)} value
   * @param {number} [index=0]
   * @param {number} N
   * @param {number} L
   * @returns {number}
   *
   * @memberOf HeatMapComponent
   */
  getDimension(value: string | number | Array<string | number>, index = 0, N: number, L: number): number {
    if (typeof value === 'string') {
      value = value
        .replace('[', '')
        .replace(']', '')
        .replace('px', '')
        .replace('\'', '');

      if (value.includes(',')) {
        value = value.split(',');
      }
    }
    if (Array.isArray(value) && typeof index === 'number') {
      return this.getDimension(value[index], null, N, L);
    }
    if (typeof value === 'string' && value.includes('%')) {
      return +value.replace('%', '') / 100;
    }
    return N / (L / +value + 1);
  }

  getXScale(): any {
    const f = this.getDimension(this.innerPadding, 0, this.xDomain.length, this.dims.width);
    return scaleBand()
      .rangeRound([0, this.dims.width])
      .domain(this.xDomain)
      .paddingInner(f);
  }

  getYScale(): any {
    const f = this.getDimension(this.innerPadding, 1, this.yDomain.length, this.dims.height);
    return scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.yDomain);
    //.paddingInner(f);
  }

  getBoxPlots(): any[] {
    const boxplots = [];

    this.xDomain.map((xVal) => {
      this.yDomain.map((yVal) => {
        boxplots.push({
          x: this.xScale(xVal),
          y: this.yScale(yVal),
          rx: 3,
          width: this.xScale.bandwidth(),
          height: this.yScale.bandwidth(),
          fill: 'rgba(200,200,200,0.03)'
        });
      });
    });

    return boxplots;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  getScaleType(values): string {
    let num = true;

    for (const value of values) {
      if (typeof value !== 'number') {
        num = false;
      }
    }

    if (num) return 'linear';
    return 'ordinal';
  }

  setColors(): void {
    let domain: any;
    if (this.schemeType === 'ordinal') {
      domain = this.xDomain;
    } else {
      domain = this.yDomain;
    }
    this.colors = new ColorHelper(this.scheme, this.schemeType, domain);
  }

  getLegendOptions() {
    const opts = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: [],
      title: undefined
    };
    if (opts.scaleType === 'ordinal') {
      opts.domain = this.xDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.yDomain;
      opts.colors = this.colors.scale;
    }
    return opts;
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

}
