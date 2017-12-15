import { Component, OnInit, Input } from '@angular/core';

import { colorSets } from '../../src/lib/charts/utils';
import MultiSeriesChartGroups from './multi-series-chart-types';

import { barChart, lineChartSeries } from '../data/combo-chart-data';
import { bubble } from '../data/data';
import { IChart } from '../../src/lib/model/chart'

@Component({
  selector: 'app-multi-series',
  templateUrl: './multi-series.component.html',
  styleUrls: ['./multi-series.component.css']
})
export class MultiSeriesComponent implements OnInit {

  @Input() Options: IChart;

  chartData = [];

  chartType: string;
  chart: any;

  MultiSeriesChartGroups: any[];

  view: any[];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;
 

  // options
  isSingleSeries = true;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';
  showGridLines = true;
  innerPadding = '10%';
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  showSeriesOnHover = true;
  roundEdges: boolean = true;
  animations: boolean = false;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;

  colorSets: any;
  colorScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;
  rangeFillOpacity: number = 0.15;


  // Combo Chart
  barChart: any[] = barChart;
  lineChartSeries: any[] = lineChartSeries;
  lineChartScheme = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#01579b', '#7aa3e5', '#a8385d', '#00bfa5'
    ]
  };

  comboBarScheme = {
    name: 'singleLightBlue',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#01579b'
    ]
  };

  showRightYAxisLabel: boolean = true;
  yAxisLabelRight: string = 'Utilization';


  constructor() {

    Object.assign(this, {
      MultiSeriesChartGroups,
      colorSets
    });

    this.setColorScheme('cool');
  }

  ngOnInit() {
    // this.selectChart('bar-horizontal');
    // this.selectChart('bar-vertical');

    this.draw();

  }

  draw() {
    if (!this.Options || !this.Options.chartTypeSelector || !this.Options.data) { return; }

    this.selectChart(this.Options.chartTypeSelector);
    this.chartData = this.Options.data; // JSON.parse(JSON.stringify($event));
    if (!this.fitContainer) {
      this.applyDimensions();
    }

    if (this.Options && this.Options.axis) {
      switch (this.chartType) {
        case 'histogram':
          this.yAxisLabel = 'Frequency';
          this.xAxisLabel = 'Distribution';
          break;
        case 'boxplot':
          this.yAxisLabel = '';
          this.xAxisLabel = '';
          break;
        default:
          this.xAxisLabel = this.Options.axis.x.join('/');
          this.yAxisLabel = this.Options.axis.y.join('/');
          break;
      }
      this.isSingleSeries = true;
      if (this.Options.axis.y.length > 1) {
        this.isSingleSeries = false;
      }
    }

  }

  select($event) {
    alert('clicked on: ' + $event.name + ';    value:' + $event.value);
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  selectChart(chartSelector) {
    this.chartType = chartSelector = chartSelector.replace('/', '');
    // C-SK
    this.showLegend = this.chartType !== 'histogram' && this.chartType !== 'boxplot';
    for (const group of this.MultiSeriesChartGroups) {
      this.chart = group.charts.find(x => x.selector === chartSelector);
      if (this.chart) { break; }
    }

    this.width = 700;
    this.height = 300;

    Object.assign(this, this.chart.defaults);

    this.xAxisLabel = this.Options.axis.x.join('/');
    this.yAxisLabel = this.Options.axis.y.join('/');


    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }


}
