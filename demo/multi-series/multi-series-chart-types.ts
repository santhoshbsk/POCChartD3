const MultiSeriesChartGroups = [
  {
    name: 'Bar Charts',
    charts: [
      {
        name: 'Vertical Bar Chart',
        selector: 'bar-vertical',
        inputFormat: 'singleSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
          'showGridLines', 'roundDomains', 'tooltipDisabled', 'roundEdges', 'yScaleMax'
        ]
      },
      {
        name: 'Horizontal Bar Chart',
        selector: 'bar-horizontal',
        inputFormat: 'singleSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
          'showGridLines', 'roundDomains', 'tooltipDisabled', 'roundEdges', 'xScaleMax'
        ],
        defaults: {
          yAxisLabel: 'Y-axis',
          xAxisLabel: 'X-axis',
        }
      },
      {
        name: 'Grouped Vertical Bar Chart',
        selector: 'bar-vertical-2d',
        inputFormat: 'multiSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding', 'groupPadding',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
          'showGridLines', 'roundDomains', 'tooltipDisabled', 'roundEdges', 'yScaleMax'
        ]
      },
      {
        name: 'Grouped Horizontal Bar Chart',
        selector: 'bar-horizontal-2d',
        inputFormat: 'multiSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding', 'groupPadding',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
          'showGridLines', 'roundDomains', 'tooltipDisabled', 'roundEdges', 'xScaleMax'
        ],
        defaults: {
          yAxisLabel: 'Y-axis',
          xAxisLabel: 'X-axis',
        }
      },
      {
        name: 'Stacked Vertical Bar Chart',
        selector: 'bar-vertical-stacked',
        inputFormat: 'multiSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
          'showGridLines', 'roundDomains', 'tooltipDisabled', 'yScaleMax'
        ]
      },
      {
        name: 'Stacked Horizontal Bar Chart',
        selector: 'bar-horizontal-stacked',
        inputFormat: 'multiSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
          'showGridLines', 'roundDomains', 'tooltipDisabled', 'xScaleMax'
        ],
        defaults: {
          yAxisLabel: 'Y-axis',
          xAxisLabel: 'X-axis',
        }
      }

    ]
  },
  {
    name: 'Line/Area Charts',
    charts: [
      {
        name: 'Line Chart',
        selector: 'line-chart',
        inputFormat: 'multiSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
          'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve',
          'rangeFillOpacity', 'roundDomains', 'tooltipDisabled', 'showRefLines',
          'referenceLines', 'showRefLabels',
          'xScaleMin', 'xScaleMax', 'yScaleMin', 'yScaleMax'
        ],
        defaults: {
          yAxisLabel: 'Y-axis',
          xAxisLabel: 'X-axis',
          linearScale: true
        }
      },
      {
        name: 'Area Chart',
        selector: 'area-chart',
        inputFormat: 'multiSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
          'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve',
          'roundDomains', 'tooltipDisabled',
          'xScaleMin', 'xScaleMax', 'yScaleMin', 'yScaleMax'
        ],
        defaults: {
          yAxisLabel: 'Y-axis',
          xAxisLabel: 'X-axis',
          linearScale: true
        }
      },
      {
        name: 'Stacked Area Chart',
        selector: 'area-chart-stacked',
        inputFormat: 'multiSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
          'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve',
          'roundDomains', 'tooltipDisabled',
          'xScaleMin', 'xScaleMax', 'yScaleMin', 'yScaleMax'
        ],
        defaults: {
          yAxisLabel: 'Y-axis',
          xAxisLabel: 'X-axis',
          linearScale: true
        }
      },
      {
        name: 'Normalized Area Chart',
        selector: 'area-chart-normalized',
        inputFormat: 'multiSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
          'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve',
          'roundDomains', 'tooltipDisabled'
        ],
        defaults: {
          yAxisLabel: 'Y-axis',
          xAxisLabel: 'X-axis',
          linearScale: true
        }
      },
    ]
  },
  {
    name: 'Other Charts',
    charts: [
      {
        name: 'Bubble Chart',
        selector: 'bubble-chart',
        inputFormat: 'bubble',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'showLegend', 'legendTitle',
          'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'showGridLines',
          'roundDomains', 'autoScale', 'minRadius', 'maxRadius', 'tooltipDisabled',
          'xScaleMin', 'xScaleMax', 'yScaleMin', 'yScaleMax'
        ],
        defaults: {
          yAxisLabel: 'Y-axis',
          xAxisLabel: 'X-axis',
        }
      },
      {
        name: 'Combo Chart',
        selector: 'combo-chart',
        inputFormat: 'comboChart',
        options: [
          'animations', 'showXAxis', 'showYAxis', 'gradient',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
          'showGridLines', 'roundDomains', 'tooltipDisabled'
        ]
      },
      {
        name: 'Histogram',
        selector: 'histogram',
        inputFormat: 'histogram',
        options: [
          'animations', 'showXAxis', 'showYAxis', 'gradient',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
          'showGridLines', 'roundDomains', 'tooltipDisabled'
        ]
      },
      {
        name: 'Boxplot',
        selector: 'boxplot',
        inputFormat: 'boxplot',
        options: [
          'animations', 'showXAxis', 'showYAxis', 'gradient',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
          'showGridLines', 'roundDomains', 'tooltipDisabled'
        ]
      }

    ]
  }
];

export default MultiSeriesChartGroups;
