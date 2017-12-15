import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as d3 from 'd3'

import { DataService } from '../data/data.service'

import { IChart } from '../../src/lib/model/chart'
import { bubble } from '../data/data';
import { colorSets } from 'lib/charts/utils';

@Component({
  selector: 'app-chart-options',
  templateUrl: './chart-options.component.html',
  styleUrls: ['./chart-options.component.css'],
  inputs: ['Options']
})
export class ChartOptionsComponent implements OnInit {

  @Output() draw = new EventEmitter<any>();


  @Input('Options') Options: IChart = new IChart();

  legendPositions = ['Top', 'Right', 'Bottom', 'Left'];

  scaleTypesY = [
    {
      'name': 'Default',
      'value': 'Default'
    },
    {
      'name': 'Percentage',
      'value': '%'
    },
    {
      'name': 'Log',
      'value': 'log'
    }
  ];

  scaleTypesZ = [
    {
      'name': 'Default',
      'value': 'Default'
    },
    {
      'name': 'Percentage',
      'value': '%'
    }
  ];

  labelStylesX = ['Normal', 'Rotated', 'Slant', 'Staggered', 'Wrap'];

  fontsCol = ['Inherit', 'Algerian', 'Arial', 'Arial Black', 'Arial Narrow', 'Bookman Old Style', 'Book Anitqua', 'Calibri',
    'Cambria', 'Candara', 'Garamond', 'Tahoma', 'Times New Roman', 'Tunga', 'Verdana'];

  sizesCol = ['Inherit', 7, 8, 9, 10, 11, 12, 13, 14, 15];

  colors = ['black', 'blue', 'green', 'red', 'yellow', 'aqua', 'yellowgreen'];
  palettes = colorSets.map((d, i, arr) => ({ name: d.name, value: d.name }));
  // palettes = [
  //   {
  //     'name': 'Lazyday Theme',
  //     'colors': ['#ff0000', '#ff4000', '#ff8000', '#ffbf00', '#ffff00']
  //   },
  //   {
  //     'name': 'Spike High Theme',
  //     'colors': ['#bfff00', '#80ff00', '#40ff00', '#00ff00', '#00ff40']
  //   },
  //   {
  //     'name': 'Colorblind Friendly Theme',
  //     'colors': ['#00ff80', '#00ffbf', '#00ffff', '#00bfff', '#0080ff']
  //   },
  //   {
  //     'name': 'Sun Flowerfields Theme',
  //     'colors': ['#0040ff', '#0000ff', '#4000ff', '#8000ff', '#bf00ff']
  //   },
  //   {
  //     'name': 'Infographics Theme',
  //     'colors': ['#ff00ff', '#ff00bf', '#ff0080', '#ff0040', '#ff0000']
  //   }
  // ];

  axisData: any; // loading to axis dropdown
  chartingTypes: any;  // charting types collection
  enableStack: boolean = false;
  ChartingData = [];
  private init() {
    this.ChartingData = DataService.getChartingData();
    this.chartingTypes = DataService.getChartTypes();
    this.axisData = Object.keys(this.ChartingData[0]);

    this.Options.axis.x = ['CategoryName'];
    this.Options.axis.y = ['UnitPrice'];
    // this.Options.style.palette = 'vivid';
    // this.Options.axis.z = ['UnitPrice_Extended'];
  }

  private isYMultiseriesAxis() {
    return this.Options.axis.y.length > 1;
  }

  private isZMultiseriesAxis() {
    return this.Options.axis.z.length > 1;
  }
  ngOnInit() {
    this.init();
    this.drawChart();
  }
  constructor() { }

  drawChart(_visualType?: string) {
    // C-SK
    this.Options.visualType = _visualType || this.Options.visualType || 'line';
    this.updateChartType(this.Options.visualType);
    if (this.Options.chartTypeSelector) {
      this.Options.data = this.createChartData(this.Options.seriesType);
    }
    this.draw.emit(this.Options);
  }
  updateChartType(type) {
    this.enableStack = false;
    if (this.isYMultiseriesAxis()) {
      this.enableStack = true;
    }
    switch (type) {
      case 'column':
        if (this.Options.isStacked) {
          this.Options.chartTypeSelector = 'bar-vertical-stacked';
          this.Options.seriesType = 'multi';
        } else {
          if (this.isYMultiseriesAxis()) {
            this.Options.chartTypeSelector = 'bar-vertical-2d'; // Grouped Vertical Bar Chart
            this.Options.seriesType = 'multi';
          } else {
            this.Options.chartTypeSelector = 'bar-vertical';
            this.Options.seriesType = 'single';
          }
        }
        break;
      case 'bar':
        if (this.Options.isStacked) {
          this.Options.chartTypeSelector = 'bar-horizontal-stacked';
          this.Options.seriesType = 'multi';
        } else {
          if (this.isYMultiseriesAxis()) {
            this.Options.chartTypeSelector = 'bar-horizontal-2d'; // Grouped Column Chart
            this.Options.seriesType = 'multi';
          } else {
            this.Options.chartTypeSelector = 'bar-horizontal';
            this.Options.seriesType = 'single';
          }
        }
        break;
      case 'line':
        if (this.Options.isStacked) {
          this.Options.chartTypeSelector = 'line-chart'; // 'line-chart-stacked'
        } else {
          this.Options.chartTypeSelector = 'line-chart';
        }
        this.Options.seriesType = this.Options.axis.y.length > 1 ? 'multi' : 'single';
        break;
      case 'area':
        if (this.Options.isStacked) {
          this.Options.chartTypeSelector = 'area-chart-stacked';
        } else {
          this.Options.chartTypeSelector = 'area-chart';
        }
        this.Options.seriesType = this.Options.axis.y.length > 1 ? 'multi' : 'single';
        break;
      case 'pie':
        this.Options.chartTypeSelector = 'pie-chart';
        this.Options.seriesType = 'single';
        break;
      case 'combo':
        this.Options.chartTypeSelector = 'combo-chart';
        this.Options.seriesType = 'multi';
        break;
      case 'histogram':
        this.Options.chartTypeSelector = 'histogram';
        this.Options.seriesType = 'single';
        break;
      case 'boxplot':
        this.Options.chartTypeSelector = 'boxplot';
        this.Options.seriesType = 'multi';
        break;
      case 'bubble':
        this.Options.chartTypeSelector = 'bubble-chart';
        this.Options.seriesType = 'multi';
        break;
    }
  }


  createChartData(seriesType) {
    const x = this.Options.axis.x;
    const y = this.Options.axis.y;

    let data = new Array<any>();
    switch (this.Options.visualType) {
      case 'histogram':
        data = [{ 'LowerBound': -5e-324, 'UpperBound': 212940, 'Count': 243 },
        { 'LowerBound': 212940, 'UpperBound': 425880, 'Count': 0 },
        { 'LowerBound': 425880, 'UpperBound': 638820, 'Count': 0 },
        { 'LowerBound': 638820, 'UpperBound': 851760, 'Count': 0 },
        { 'LowerBound': 851760, 'UpperBound': 1064700, 'Count': 0 },
        { 'LowerBound': 1064700, 'UpperBound': 1277640, 'Count': 0 },
        { 'LowerBound': 1277640, 'UpperBound': 1490580, 'Count': 0 },
        { 'LowerBound': 1490580, 'UpperBound': 1703520, 'Count': 0 },
        { 'LowerBound': 1703520, 'UpperBound': 1916460, 'Count': 3 },
        { 'LowerBound': 1916460, 'UpperBound': 2129400, 'Count': 6 }];
        break;
      case 'boxplot':
        data = [
          {
            name: 'Sample A',
            value: {
              Q1: 180,
              Q2: 200,
              Q3: 250,
              whisker_low: 115,
              whisker_high: 400,
              outliers: [50, 100, 425]
            }
          },
          {
            name: 'Sample B',
            value: {
              Q1: 300,
              Q2: 350,
              Q3: 400,
              whisker_low: 225,
              whisker_high: 425,
              outliers: [175, 450, 480]
            }
          },
          {
            name: 'Sample C',
            value: {
              Q1: 100,
              Q2: 200,
              Q3: 300,
              whisker_low: 25,
              whisker_high: 400,
              outliers: [450, 475]
            }
          },
          {
            name: 'Sample D',
            value: {
              Q1: 75,
              Q2: 100,
              Q3: 125,
              whisker_low: 50,
              whisker_high: 300,
              outliers: [450]
            }
          },
          {
            name: 'Sample E',
            value: {
              Q1: 325,
              Q2: 400,
              Q3: 425,
              whisker_low: 225,
              whisker_high: 475,
              outliers: [50, 100, 200]
            }
          }
        ];
        break;
      case 'bubble':
        data = bubble;
        break;
      default:
        if (seriesType === 'single') {

          data = d3.nest<any, any>()
            .key(function (d) {
              return d[x[0]]
            }).rollup(function (values) {
              return d3.sum(values, function (d) {
                return d[y[0]];
              });
            })
            .entries(this.ChartingData)
            .map(function (group) {
              return {
                name: group.key,
                value: group.value
              }
            });

        } else {
          data = d3.nest<any, any>()
            .key(function (d) {
              return d[x[0]]
            }).rollup(function (values) {
              const series = [];
              y.forEach(element => {
                series.push({
                  name: element,
                  value: d3.sum(values, function (d) { return d[element]; })
                });
              });
              return series
            })
            .entries(this.ChartingData)
            .map(function (group) {
              return {
                name: group.key,
                series: group.value
              }
            });

        }
        break;
    }
    return data;
  }
}
