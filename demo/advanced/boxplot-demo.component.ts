import { Component, OnInit } from '@angular/core';

import { IChart, ChartDefaults } from '../../src/lib/model/chart';


import { colorSets } from '../../src/lib/charts/utils';

@Component({
    selector: 'boxplot-demo-component',
    template: `<ana-charts-boxplot
    class="chart-container"
    [view]="view"
    [scheme]="colorScheme"
    [schemeType]="schemeType"
    [results]="chartData"
    [animations]="animations"
    [legend]="showLegend"
    [legendTitle]="legendTitle"
    [gradient]="gradient"
    [xAxis]="showXAxis"
    [yAxis]="showYAxis"
    (legendLabelClick)="onLegendLabelClick($event)"
    [showXAxisLabel]="showXAxisLabel"
    [showYAxisLabel]="showYAxisLabel"
    [xAxisLabel]="xAxisLabel"
    [yAxisLabel]="yAxisLabel"
    [tooltipDisabled]="tooltipDisabled"
    (select)="select($event)"
    ></ana-charts-boxplot>`
})
export class BoxplotDemoComponent implements OnInit {
    title = 'app';
    Options: IChart = null;

    constructor() {

        Object.assign(this, {
            colorSets
        });

        this.setColorScheme('cool');
    }

    ngOnInit() {
        this.Options = ChartDefaults;
        this.draw();
    }

    chartData = [];

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



    draw() {
        if (!this.Options || !this.Options.chartTypeSelector || !this.Options.data)
            return;

        this.selectChart(this.Options.chartTypeSelector);
        ///this.chartData = this.Options.data; //JSON.parse(JSON.stringify($event));
        this.loadData();
        if (!this.fitContainer) {
            this.applyDimensions();
        }

        if (this.Options && this.Options.axis) {
            this.xAxisLabel = "X-Axis";
            this.yAxisLabel = "Y-Axis";
        }

    }

    loadData() {
        this.chartData = [
            {
                name: "Sample A",
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
                name: "Sample B",
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
                name: "Sample C",
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
                name: "Sample D",
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
                name: "Sample E",
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

        this.width = 700;
        this.height = 300;

        if (!this.fitContainer) {
            this.applyDimensions();
        }
    }
}
