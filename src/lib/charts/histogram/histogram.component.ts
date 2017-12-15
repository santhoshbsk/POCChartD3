import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { scaleBand, scaleLinear } from 'd3-scale';
import { range, histogram, min, max } from 'd3-array';

import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { format } from 'd3';

@Component({
  selector: 'ana-charts-histogram',
  template: `
    <ana-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onLegendLabelClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g ana-charts-x-axis
          *ngIf="xAxis"
          [xScale]="xScaleDisplay"
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
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [tickFormatting]="yAxisTickFormatting"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <svg:g ana-charts-histogram-series
          [xScale]="xScale"
          [yScale]="yScale"
          [bins]="bins"
          [colors]="colors"
          [series]="results"
          [dims]="dims"
          [gradient]="gradient"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [activeEntries]="activeEntries"
          [roundEdges]="roundEdges"
          [animations]="animations"
          (activate)="onActivate($event)"
          (deactivate)="onDeactivate($event)"
          (select)="onClick($event)">
        </svg:g>
      </svg:g>
    </ana-charts-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistogramComponent extends BaseChartComponent {

  @Input() legend = false;
  @Input() legendTitle: string = 'Legend';
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() tooltipDisabled: boolean = false;
  @Input() gradient: boolean;
  @Input() showGridLines: boolean = true;
  @Input() activeEntries: any[] = [];
  @Input() schemeType: string;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() barPadding = 8;
  @Input() roundDomains: boolean = false;
  @Input() roundEdges: boolean = true;
  @Input() yScaleMax: number;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  xScaleDisplay: any;
  xScale: any;
  yScale: any;
  xDomain: any;
  yDomain: any;
  transform: string;
  colors: ColorHelper;
  margin: any[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: any;
  activeSeries = this.results;

  bins = [];

  update(): void {
    super.update();
    this.activeSeries = this.getActiveSeries();

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
      legendType: this.schemeType
    });

    this.buildBins();

    var xMin = min(this.bins, function (d) { return d.lower; });
    var xMax = max(this.bins, function (d) { return d.upper; });
    var xBand = this.bins[0].upper - this.bins[0].lower;
    if (xBand == 0)
      xBand = 1;

    this.xScaleDisplay = this.getXScaleDisplay(xMin, xMax, xBand)
    this.xScale = this.getXScale(xMin, xMax, xBand);
    this.yScale = this.getYScale();
    this.setColors();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
  }

  buildBins() {
    this.bins = this.results.map((d) => {
      var _lbandDiff = d.UpperBound - d.LowerBound;
      var _d = {};
      if (_lbandDiff > 1) {
        _d = {
          range: Math.round(d.LowerBound) + "-" + Math.round(d.UpperBound),
          lower: Math.round(d.LowerBound),
          upper: Math.round(d.UpperBound),
          count: d.Count
        };
      }
      else {
        _d = {
          range: d.LowerBound + "-" + d.UpperBound,
          lower: d.LowerBound,
          upper: d.UpperBound,
          count: d.Count
        };
      }
      return _d;
    });
  }

  private genereateBands(xMin, xMax, xBand) {
    var ranges = [xMin];
    for (let i = 1; i < ((xMax - xMin) / xBand) + 1; i++) {
      ranges.push(xMin + (xBand * i));
    }
    return ranges;
  }

  getXScale(xMin, xMax, xBand): any {
    this.xDomain = this.getXDomain(xMin, xMax, xBand);
    // const spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
    return scaleBand()
      .rangeRound([0, this.dims.width])
      // .paddingInner(spacing)
      .domain(this.xDomain);
  }

  getXScaleDisplay(xMin, xMax, xBand) {
    const xMinMax = [xMin - xBand, xMax + xBand];
    const displayDomain = this.genereateBands(xMin, xMax, xBand);

    return scaleLinear()
      .domain(xMinMax)
      .range([0, this.dims.width])
    // .ticks(displayDomain)
    // .tickFormat(format('.2s'));
  }

  getYScale(): any {
    this.yDomain = this.getYDomain();
    const scale = scaleLinear()
      .range([this.dims.height, 0])
      .clamp(true)
      .domain(this.yDomain);
    return this.roundDomains ? scale.nice() : scale;
  }

  getXDomain(xMin, xMax, xBand): any[] {
    const xDomain = [];
    xDomain.push((xMin - xBand) + '-' + xMin);
    this.bins.forEach((d) => {
      xDomain.push(d.range);
    });
    xDomain.push(xMax + '-' + (xMax + xBand));
    return xDomain;
  }

  getYDomain() {
    const countMin = min(this.results, (d: any) => {
      return d.Count;
    })
    const countMax = max(this.results, (d: any) => {
      return d.Count;
    })
    return [countMin, countMax];
  }

  onClick(data) {
    this.select.emit(data);
  }

  getActiveSeries() {
    return this.results.filter(d => !d.isToggled);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.xDomain, this.customColors);
  }

  getLegendOptions(legendDomain) {
    const opts = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: [],
      title: undefined
    };
    if (opts.scaleType === 'ordinal') {
      // opts.domain = this.xDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      // opts.domain = this.yDomain;
      opts.colors = this.colors.scale;
    }
    opts.domain = legendDomain;
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

  onActivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [item, ...this.activeEntries];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

}
