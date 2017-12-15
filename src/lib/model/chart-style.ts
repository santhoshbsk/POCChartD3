export class ChartStyle {
    palette: string;
    axis: {
        font: string;
        size: any;
        color: string;
        bold: boolean;
        italic: boolean;
        underline: boolean;
        x: {
            format: boolean;
            show: boolean;
            aliasName: string;
            style: string;
            maxWidth: number
        };
        y: {
            format: boolean;
            show: boolean;
            aliasName: string;
            style?: string;
            scaleType: string
        };
        z: {
            format: boolean;
            show: boolean;
            aliasName: string;
            style?: string;
            scaleType: string
        }
    };
    data: {
        font: string;
        size: any;
        color: string;
        bold: boolean;
        italic: boolean;
        underline: boolean
    };
    legend: {
        show: boolean;
        position: string;
        font: string;
        size: any;
        color: string;
        bold: boolean;
        italic: boolean;
        underline: boolean
    };
    ticks: {
        font: string;
        size: any;
        color: string;
        bold: boolean;
        italic: boolean;
        underline: boolean
    }
}
