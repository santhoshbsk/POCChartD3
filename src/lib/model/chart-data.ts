import { IMargin } from './interfaces'

export class ChartData {
    callback: any;
    width: number;
    height: number;
    margin: IMargin;

    x: any;
    y: any;
    z: any;
    x1: any;
    y1: any;

    xScale: any;
    yScale: any;

    xAxis: any;
    yAxis: any;
    zAxis: any;

    xAxisg: any;
    yAxisg: any;
    zAxisg: any;

    legendData = new Array<any>();
    measureFieldsZForBubble = new Array<any>();
    plotList = new Array<any>();

    measureMaxObj: any;
    legendSizeInfo: any;
    tooltip: any;

    isHorizental: boolean;
    showZAxis: boolean;

    dataFormat: any;
    yAxisFormat: any;
    zAxisFormat: any;

    xColValues: any;
    yColValues: any;

    dataLabelObj: any;
    dataLabelStyleObj: any;

    xAxisLableDefaultHeight: number;
    animationDuration: number;
    legendColorScale: (data: any) => any;

    constructor() {

    }

}
