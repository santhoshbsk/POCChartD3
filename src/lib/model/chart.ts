import { ChartStyle } from './chart-style'
import { IMargin, IAxis, ITicks } from './interfaces'

export class IChart {
    // renderAt: string;
    width: number;
    height: number;
    margin: IMargin;
    visualType: string;
    chartTypeSelector?: string;
    seriesType?= 'multiple'; // single/multiple
    isStacked: boolean;
    data: Array<any> = new Array<any>();
    suppressZero: boolean;
    suppressNegative: boolean;
    axis: IAxis;
    style: ChartStyle;
}

export const ChartDefaults: IChart = {
    // renderAt: "#chart-container",
    // default colors: ['#80B1D3', '#FB8072', '#FDB462', '#B3DE69', '#FFED6F', '#BC80BD', '#8DD3C7', '#CCEBC5', '#FFFFB3', '#BEBADA', '#FCCDE5', '#D9D9D9'],
    width: 700,
    height: 500,
    margin: {
        top: 50,
        right: 20,
        bottom: 30,
        left: 25
    },
    visualType: 'combo',
    isStacked: false,
    data: new Array<any>(),
    suppressZero: false,
    suppressNegative: false,
    axis: {
        x: new Array<string>(),
        y: new Array<string>(),
        z: new Array<string>(),
        series: new Array<string>()
    },
    style: {
        palette: 'vivid',
        axis: {
            font: 'Inherit',
            size: 'Inherit',
            color: 'black',
            bold: false,
            italic: false,
            underline: false,
            x: {
                format: false,
                show: true,
                aliasName: '',
                style: 'Slant',
                maxWidth: 10
            },
            y: {
                format: false,
                show: true,
                aliasName: '',
                style: '',
                scaleType: 'Default'
            },
            z: {
                format: false,
                show: false,
                aliasName: '',
                style: '',
                scaleType: 'Default'
            }
        },
        data: {
            font: 'Inherit',
            size: 'Inherit',
            color: 'black',
            bold: false,
            italic: false,
            underline: false
        },
        legend: {
            show: true,
            position: 'Top',
            font: 'Inherit',
            size: 'Inherit',
            color: 'black',
            bold: false,
            italic: false,
            underline: false
        },
        ticks: {
            font: 'Inherit',
            size: 'Inherit',
            color: 'black',
            bold: false,
            italic: false,
            underline: false
        }
    }

};
