import { Component, OnInit } from '@angular/core';

import { IChart, ChartDefaults } from '../../src/lib/model/chart'


import { colorSets } from '../../src/lib/charts/utils';

@Component({
    selector: 'histogram-demo-component',
    template: `<ana-charts-histogram
    class="chart-container"
    [view]="view"
    [scheme]="colorScheme"
    [schemeType]="schemeType"
    [customColors]="customColors"
    [results]="chartData"
    [animations]="animations"
    [gradient]="gradient"
    [xAxis]="showXAxis"
    [yAxis]="showYAxis"
    [legend]="showLegend"
    [legendTitle]="legendTitle"
    [showXAxisLabel]="showXAxisLabel"
    [showYAxisLabel]="showYAxisLabel"
    [tooltipDisabled]="tooltipDisabled"
    [xAxisLabel]="xAxisLabel"
    [yAxisLabel]="yAxisLabel"
    [showGridLines]="showGridLines"
    [barPadding]="barPadding"
    [roundDomains]="roundDomains"
    [roundEdges]="roundEdges"
    [yScaleMax]="yScaleMax"
    (select)="select($event)"
    (legendLabelClick)="onLegendLabelClick($event)">
  </ana-charts-histogram>`
})
export class HistogramDemoComponent implements OnInit {

    chartData = [];

    chartType: string;
    chart: any;

    MultiSeriesChartGroups: any[];

    view: any[];
    width: number = 700;
    height: number = 300;
    fitContainer: boolean = false;


    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
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
    animations: boolean = true;
    xScaleMin: any;
    xScaleMax: any;
    yScaleMin: number;
    yScaleMax: number;

    colorSets: any;
    colorScheme: any;
    schemeType: string = 'ordinal';
    selectedColorScheme: string;
    rangeFillOpacity: number = 0.15;

    constructor() {

        Object.assign(this, {
            colorSets
        });

        this.setColorScheme('cool');
    }

    ngOnInit() {
        // this.selectChart('bar-horizontal');
        // this.selectChart('bar-vertical');
        this.chartData = [{ 'LowerBound': -5e-324, 'UpperBound': 212940, 'Count': 243 },
        { 'LowerBound': 212940, 'UpperBound': 425880, 'Count': 0 },
        { 'LowerBound': 425880, 'UpperBound': 638820, 'Count': 0 },
        { 'LowerBound': 638820, 'UpperBound': 851760, 'Count': 0 },
        { 'LowerBound': 851760, 'UpperBound': 1064700, 'Count': 0 },
        { 'LowerBound': 1064700, 'UpperBound': 1277640, 'Count': 0 },
        { 'LowerBound': 1277640, 'UpperBound': 1490580, 'Count': 0 },
        { 'LowerBound': 1490580, 'UpperBound': 1703520, 'Count': 0 },
        { 'LowerBound': 1703520, 'UpperBound': 1916460, 'Count': 3 },
        { 'LowerBound': 1916460, 'UpperBound': 2129400, 'Count': 6 }];
        this.draw();

    }

    draw() {
        if (!this.fitContainer) {
            this.applyDimensions();
        }

    }

    select($event) {

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

        for (const group of this.MultiSeriesChartGroups) {
            this.chart = group.charts.find(x => x.selector === chartSelector);
            if (this.chart) { break; }
        }

        this.width = 700;
        this.height = 300;

        Object.assign(this, this.chart.defaults);

        this.xAxisLabel = 'xAxis';
        this.yAxisLabel = 'yAxis';


        if (!this.fitContainer) {
            this.applyDimensions();
        }
    }


}
