import { Injectable } from '@angular/core';

import { IChart, ChartDefaults } from '../model/chart'

@Injectable()
export class UnifiedService {

  constructor() { }

  public static validateData(options: IChart): IChart {
    let defaultData = ChartDefaults;

    options.width = defaultData.width;
    options.height = defaultData.height;
    options.margin.top = defaultData.margin.top;
    options.margin.right = defaultData.margin.right;
    options.margin.bottom = defaultData.margin.bottom;
    options.margin.left = defaultData.margin.left;
    options.visualType = options.visualType || defaultData.visualType;
    options.isStacked = options.isStacked || defaultData.isStacked;
    options.suppressZero = options.suppressZero || defaultData.suppressZero;
    options.suppressNegative = options.suppressNegative || defaultData.suppressNegative;
    options.axis.x = options.axis.x || defaultData.axis.x;
    options.axis.y = options.axis.y || defaultData.axis.y;
    if (options.visualType == 'bar') {
      options.axis.z = defaultData.axis.z;
    } else {
      options.axis.z = options.axis.z || defaultData.axis.z;
    }
    options.axis.series = options.axis.series || defaultData.axis.series;
    if (options.style.palette.length > 0) {
      options.style.palette = options.style.palette;
    } else {
      options.style.palette = defaultData.style.palette;
    }
    options.style.axis.font = options.style.axis.font || defaultData.style.axis.font;
    options.style.axis.size = options.style.axis.size || defaultData.style.axis.size;
    options.style.axis.color = options.style.axis.color || defaultData.style.axis.color;
    options.style.axis.bold = options.style.axis.bold || defaultData.style.axis.bold;
    options.style.axis.italic = options.style.axis.italic || defaultData.style.axis.italic;
    options.style.axis.underline = options.style.axis.underline || defaultData.style.axis.underline;
    options.style.axis.x.format = options.style.axis.x.format || defaultData.style.axis.x.format;
    options.style.axis.x.show = options.style.axis.x.show || defaultData.style.axis.x.show;
    options.style.axis.x.aliasName = options.style.axis.x.aliasName || defaultData.style.axis.x.aliasName;
    options.style.axis.x.style = options.style.axis.x.style || defaultData.style.axis.x.style;
    options.style.axis.x.maxWidth = options.style.axis.x.maxWidth || defaultData.style.axis.x.maxWidth;
    options.style.axis.y.format = options.style.axis.y.format || defaultData.style.axis.y.format;
    options.style.axis.y.show = options.style.axis.y.show || defaultData.style.axis.y.show;
    options.style.axis.y.aliasName = options.style.axis.y.aliasName || defaultData.style.axis.y.aliasName;
    options.style.axis.y.style = options.style.axis.y.style || defaultData.style.axis.y.style;
    options.style.axis.y.scaleType = options.style.axis.y.scaleType || defaultData.style.axis.y.scaleType;
    options.style.axis.z.format = options.style.axis.z.format || defaultData.style.axis.z.format;
    options.style.axis.z.show = options.style.axis.z.show || defaultData.style.axis.z.show;
    options.style.axis.z.aliasName = options.style.axis.z.aliasName || defaultData.style.axis.z.aliasName;
    options.style.axis.z.style = options.style.axis.z.style || defaultData.style.axis.z.style;
    options.style.axis.z.scaleType = options.style.axis.z.scaleType || defaultData.style.axis.z.scaleType;
    options.style.data.font = options.style.data.font || defaultData.style.data.font;
    options.style.data.size = options.style.data.size || defaultData.style.data.size;
    options.style.data.color = options.style.data.color || defaultData.style.data.color;
    options.style.data.bold = options.style.data.bold || defaultData.style.data.bold;
    options.style.data.italic = options.style.data.italic || defaultData.style.data.italic;
    options.style.data.underline = options.style.data.underline || defaultData.style.data.underline;
    options.style.legend.show = options.style.legend.show || defaultData.style.legend.show;
    options.style.legend.position = options.style.legend.position || defaultData.style.legend.position;
    options.style.legend.font = options.style.legend.font || defaultData.style.legend.font;
    options.style.legend.size = options.style.legend.size || defaultData.style.legend.size;
    options.style.legend.color = options.style.legend.color || defaultData.style.legend.color;
    options.style.legend.bold = options.style.legend.bold || defaultData.style.legend.bold;
    options.style.legend.italic = options.style.legend.italic || defaultData.style.legend.italic;
    options.style.legend.underline = options.style.legend.underline || defaultData.style.legend.underline;
    options.style.ticks.font = options.style.ticks.font || defaultData.style.ticks.font;
    options.style.ticks.size = options.style.ticks.size || defaultData.style.ticks.size;
    options.style.ticks.color = options.style.ticks.color || defaultData.style.ticks.color;
    options.style.ticks.bold = options.style.ticks.bold || defaultData.style.ticks.bold;
    options.style.ticks.italic = options.style.ticks.italic || defaultData.style.ticks.italic;
    options.style.ticks.underline = options.style.ticks.underline || defaultData.style.ticks.underline;

    return options;
  }

  public static replaceWithAlias(array: Array<any>, name, alias) {
    var index = array.indexOf(name);
    if (index != -1) {
      array[index] = alias;
    }
    return array;
  }

  public static getDistinctValueCollection(data: Array<any>, seriesList: Array<any>) {
    var arrKeys = new Array();
    seriesList.forEach(function (sName) {
      var sValues = [];
      data.forEach(function (row) {
        if (sValues.indexOf(row[sName]) == -1)
          sValues.push(row[sName]);
      });
      arrKeys.push({ key: sName, values: sValues });
    });

    return arrKeys;
  }

  public static toCartesian(a) { // a = []
    var i, j, l, m, a1, o = [];
    if (!a || a.length == 0) return a;

    a1 = a.splice(0, 1);
    a = UnifiedService.toCartesian(a);
    for (i = 0, l = a1[0].length; i < l; i++) {
      if (a && a.length) {
        for (j = 0, m = a.length; j < m; j++) {
          o.push([a1[0][i]].concat(a[j]));
        }
      }
      else {
        o.push([a1[0][i]]);
      }

    }
    return o;
  }

  public static isNumber(value, undefined?) {

    if (value == null || value == '') {
      return false;
    }

    if (value == undefined || value == 'undefined') {
      return false;
    }

    return !isNaN(value);
  }

  public static getLegendDataByPlotType(chartDirective: any, plotName, filteredData) {
    var legItemArr = [];
    var plotList = chartDirective.ChartData.plotList;
    var measureNames = plotList.map((p) => {
      return p.plot == plotName ? p.measureName : null;
    });
    legItemArr = filteredData.map((item) => {
      if (item) {
        return measureNames.indexOf(item.measureName) != -1 ? item : null;
      }
    });
    return legItemArr;
  }

  public static buildLogAxisArray(chartDirective: any, axis) {
    var logValues = [1];
    var logAxisMax = 1;
    var base = chartDirective.config.logBase;
    for (var i = 1; i < 10; i++) {
      logAxisMax = Math.pow(base, i);
      logValues.push(logAxisMax);
    }
    if (axis == 'y' && chartDirective.ChartData.measureMaxObj.yAxisMax > logAxisMax) {
      logAxisMax = chartDirective.ChartData.measureMaxObj.yAxisMax;
      logValues.push(logAxisMax);
    }

    if (axis == 'z' && chartDirective.ChartData.measureMaxObj.zAxisMax > logAxisMax) {
      logAxisMax = chartDirective.ChartData.measureMaxObj.zAxisMax;
      logValues.push(logAxisMax);
    }

    return logValues;
  }

  public static buildLegendItemData(xAxisValue, legendData) {

    var shapeDataList = [];
    if (legendData == null || legendData.length <= 0) {
      return shapeDataList;
    }
    //each item of shapeDataList will be used to render a shape on xAxis for each xAxisValue
    legendData.forEach(function (legendItem) {
      if (legendItem != null) {
        var value = +legendItem.dataSet[xAxisValue];
        shapeDataList.push({
          legendItem: legendItem,
          value: value,//value of current legendItem for current xAxisValue
          xAxisValue: xAxisValue// e.g. USA | AUS | IND
        });
      }
    });
    return shapeDataList;
  }

  public static replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  public static isDefined(arg, defaultRet) {
    var isdefined = (typeof arg !== "undefined");
    if (arg == null)
      isdefined = false;

    if (arguments.length == 2) {

      if (isdefined)
        return arg;
      else
        return defaultRet;
    }
    //true or false if argument count is 1
    return isdefined;
  }

  public static getTranslation(transform) {
    // Create a dummy g for calculation purposes only. This will never
    // be appended to the DOM and will be discarded once this function 
    // returns.
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // Set the transform attribute to the provided string value.
    g.setAttributeNS(null, "transform", transform);

    // consolidate the SVGTransformList containing all transformations
    // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
    // its SVGMatrix. 
    var matrix = g.transform.baseVal.consolidate().matrix;

    // As per definition values e and f are the ones for the translation.
    return [matrix.e, matrix.f];
  }

}
