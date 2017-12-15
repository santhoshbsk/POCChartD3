export interface IMargin {
    top: number;
    right: number;
    bottom: number;
    left: number
}
export interface IAxis {
    x: Array<string>;
    y: Array<string>;
    z: Array<string>;
    series: Array<string>
}
export interface ITicks {
    font: string;
    size: any;
    color: string;
    bold: boolean;
    italic: boolean;
    underline: boolean
}
