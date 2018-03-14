"use strict";

declare class Chart {
    static readonly Chart: typeof Chart;
    constructor(
        context: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
        options: Chart.ChartConfiguration
    );
    config: Chart.ChartConfiguration;
	//options: Chart.ChartOptions;			//plugin defs
    data: Chart.ChartData;
    destroy: () => {};
    update: (duration?: any, lazy?: any) => {};
    render: (duration?: any, lazy?: any) => {};
    stop: () => {};
    resize: () => {};
    clear: () => {};
    toBase64: () => string;
    generateLegend: () => {};
    getElementAtEvent: (e: any) => {};
    getElementsAtEvent: (e: any) => Array<{}>;
    getDatasetAtEvent: (e: any) => Array<{}>;
    ctx: CanvasRenderingContext2D|null;
    canvas: HTMLCanvasElement|null;
    chartArea: Chart.ChartArea;
	getDatasetMeta: (i: number) => Chart.ChartDSMeta;			//plugin defs
    static pluginService: PluginServiceStatic;

    static defaults: {
        global: Chart.ChartOptions & Chart.ChartFontOptions;
        [key: string]: any;
    };

    static controllers: {
        [key: string]: any;
    };

    // Tooltip Static Options
    static Tooltip: Chart.ChartTooltipsStaticConfiguration;
}
declare class PluginServiceStatic {
    register(plugin: PluginServiceRegistrationOptions): void;
    unregister(plugin: PluginServiceRegistrationOptions): void;
}

interface PluginServiceRegistrationOptions {
    beforeInit?(chartInstance: Chart): void;
    afterInit?(chartInstance: Chart): void;

    resize?(chartInstance: Chart, newChartSize: Size): void;

    beforeUpdate?(chartInstance: Chart): void;
    afterScaleUpdate?(chartInstance: Chart): void;
    beforeDatasetsUpdate?(chartInstance: Chart): void;
    afterDatasetsUpdate?(chartInstance: Chart): void;
    afterUpdate?(chartInstance: Chart): void;

    // This is called at the start of a render. It is only called once, even if the animation will run for a number of frames. Use beforeDraw or afterDraw
    // to do something on each animation frame
    beforeRender?(chartInstance: Chart): void;

    // Easing is for animation
    beforeDraw?(chartInstance: Chart, easing: string): void;
    afterDraw?(chartInstance: Chart, easing: string): void;
    // Before the datasets are drawn but after scales are drawn
    beforeDatasetsDraw?(chartInstance: Chart, easing: string): void;
    afterDatasetsDraw?(chartInstance: Chart, easing: string): void;

    // Called before drawing the `tooltip`. If any plugin returns `false`,
    // the tooltip drawing is cancelled until another `render` is triggered.
    beforeTooltipDraw?(chartInstance: Chart): void;
    // Called after drawing the `tooltip`. Note that this hook will not,
    // be called if the tooltip drawing has been previously cancelled.
    afterTooltipDraw?(chartInstance: Chart): void;

    destroy?(chartInstance: Chart): void;

    // Called when an event occurs on the chart
    beforeEvent?(chartInstance: Chart, event: Event): void;
    afterEvent?(chartInstance: Chart, event: Event): void;
}

interface Size {
    height: number;
    width: number;
}

declare namespace Chart {
    type ChartType = 'line' | 'bar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie';

    type TimeUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

    type ScaleType = 'category' | 'linear' | 'logarithmic' | 'time' | 'radialLinear';

    type PointStyle = 'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle';

    type PositionType = 'left' | 'right' | 'top' | 'bottom';

    interface ChartArea {
        top: number;
        right: number;
        bottom: number;
        left: number;
    }

	interface ChartDSMeta {			//plugin defs
		hidden: boolean;
		data: MetaPoints[]
	}

	interface MetaPoints {			//plugin defs
		tooltipPosition: () => {x: number, y: number, padding: number};
		_datasetIndex: number;
		_index: number;
	 	_model: {
	 		x: number;
	 		y: number;
			skip: boolean;
			radius: number;
			xScale: object;
			yScale: object;
		}
		_view: {
			x: number;
			y: number;
			skip: boolean;
			radius: number;
			borderColor: string;
			fillColor: string;
		}
		_chart: object;
	}

    interface ChartLegendItem {
        text?: string;
        fillStyle?: string;
        hidden?: boolean;
        lineCap?: string;
        lineDash?: number[];
        lineDashOffset?: number;
        lineJoin?: string;
        lineWidth?: number;
        strokeStyle?: string;
        pointStyle?: PointStyle;
    }

    interface ChartTooltipItem {
        xLabel?: string;
        yLabel?: string;
        datasetIndex?: number;
        index?: number;
    }

    interface ChartTooltipLabelColor {
        borderColor: ChartColor;
        backgroundColor: ChartColor;
    }

    interface ChartTooltipCallback {
        beforeTitle?(item: ChartTooltipItem[], data: ChartData): string | string[];
        title?(item: ChartTooltipItem[], data: ChartData): string | string[];
        afterTitle?(item: ChartTooltipItem[], data: ChartData): string | string[];
        beforeBody?(item: ChartTooltipItem[], data: ChartData): string | string[];
        beforeLabel?(tooltipItem: ChartTooltipItem, data: ChartData): string | string[];
        label?(tooltipItem: ChartTooltipItem, data: ChartData): string | string[];
        labelColor?(tooltipItem: ChartTooltipItem, chart: Chart): ChartTooltipLabelColor;
        labelTextColor?(tooltipItem: ChartTooltipItem, chart: Chart): string;
        afterLabel?(tooltipItem: ChartTooltipItem, data: ChartData): string | string[];
        afterBody?(item: ChartTooltipItem[], data: ChartData): string | string[];
        beforeFooter?(item: ChartTooltipItem[], data: ChartData): string | string[];
        footer?(item: ChartTooltipItem[], data: ChartData): string | string[];
        afterFooter?(item: ChartTooltipItem[], data: ChartData): string | string[];
    }

    interface ChartAnimationParameter {
        chartInstance?: any;
        animationObject?: any;
    }

    interface ChartPoint {
        x?: number | string | Date;
        y?: number;
    }

	interface ChartPoint { 		//plugin defs
		r?: number;
		e?: number;
	}

    interface ChartConfiguration {
        type?: ChartType | string;
        data?: ChartData;
        options?: ChartOptions;
        // Plugins can require any options
        plugins?: any;
    }

    interface ChartData {
        labels?: Array<string | string[]>;
        datasets?: ChartDataSets[];
    }

    interface ChartOptions {
        responsive?: boolean;
        responsiveAnimationDuration?: number;
        aspectRatio?: number;
        maintainAspectRatio?: boolean;
        events?: string[];
        onClick?(event?: MouseEvent, activeElements?: Array<{}>): any;
        title?: ChartTitleOptions;
        legend?: ChartLegendOptions;
        tooltips?: ChartTooltipOptions;
        hover?: ChartHoverOptions;
        animation?: ChartAnimationOptions;
        elements?: ChartElementsOptions;
        layout?: ChartLayoutOptions;
        scales?: ChartScales;
        showLines?: boolean;
        spanGaps?: boolean;
        cutoutPercentage?: number;
        circumference?: number;
        rotation?: number;
	}


	interface ChartOptions {
		errorbarPlugin?: errorBarPlug;		//plugin defs
   }

	interface errorBarPlug {
		showErrors?: boolean;			//plugin defs
	}

    interface ChartFontOptions {
        defaultFontColor?: ChartColor;
        defaultFontFamily?: string;
        defaultFontSize?: number;
        defaultFontStyle?: string;
    }

    interface ChartTitleOptions {
        display?: boolean;
        position?: PositionType;
        fullWdith?: boolean;
        fontSize?: number;
        fontFamily?: string;
        fontColor?: ChartColor;
        fontStyle?: string;
        padding?: number;
        text?: string;
    }

    interface ChartLegendOptions {
        display?: boolean;
        position?: PositionType;
        fullWidth?: boolean;
        onClick?(event: MouseEvent, legendItem: ChartLegendItem): void;
        onHover?(event: MouseEvent, legendItem: ChartLegendItem): void;
        labels?: ChartLegendLabelOptions;
        reverse?: boolean;
    }

    interface ChartLegendLabelOptions {
        boxWidth?: number;
        fontSize?: number;
        fontStyle?: string;
        fontColor?: ChartColor;
        fontFamily?: string;
        padding?: number;
        generateLabels?(chart: any): any;
        filter?(item: ChartLegendItem, data: ChartData): any;
        usePointStyle?: boolean;
    }

    interface ChartTooltipOptions {
        enabled?: boolean;
        custom?(a: any): void;
        mode?: string;
        intersect?: boolean;
        backgroundColor?: ChartColor;
        titleFontFamily?: string;
        titleFontSize?: number;
        titleFontStyle?: string;
        titleFontColor?: ChartColor;
        titleSpacing?: number;
        titleMarginBottom?: number;
        bodyFontFamily?: string;
        bodyFontSize?: number;
        bodyFontStyle?: string;
        bodyFontColor?: ChartColor;
        bodySpacing?: number;
        footerFontFamily?: string;
        footerFontSize?: number;
        footerFontStyle?: string;
        footerFontColor?: ChartColor;
        footerSpacing?: number;
        footerMarginTop?: number;
        xPadding?: number;
        yPadding?: number;
        caretSize?: number;
        cornerRadius?: number;
        multiKeyBackground?: string;
        callbacks?: ChartTooltipCallback;
        filter?(item: ChartTooltipItem): boolean;
        itemSort?(itemA: ChartTooltipItem, itemB: ChartTooltipItem): number;
        position?: string;
        caretPadding?: number;
        displayColors?: boolean;
        borderColor?: ChartColor;
        borderWidth?: number;
    }

    interface ChartTooltipsStaticConfiguration {
        positioners: {[mode: string]: ChartTooltipPositioner};
    }

    type ChartTooltipPositioner = (elements: any[], eventPosition: Point) => Point;

    interface ChartHoverOptions {
        mode?: string;
        animationDuration?: number;
        intersect?: boolean;
        onHover?(active: any): void;
    }

    interface ChartAnimationObject {
        currentStep?: number;
        numSteps?: number;
        easing?: string;
        render?(arg: any): void;
        onAnimationProgress?(arg: any): void;
        onAnimationComplete?(arg: any): void;
    }

    interface ChartAnimationOptions {
        duration?: number;
        easing?: string;
        onProgress?(chart: any): void;
        onComplete?(chart: any): void;
    }

    interface ChartElementsOptions {
        point?: ChartPointOptions;
        line?: ChartLineOptions;
        arc?: ChartArcOptions;
        rectangle?: ChartRectangleOptions;
    }

    interface ChartArcOptions {
        backgroundColor?: ChartColor;
        borderColor?: ChartColor;
        borderWidth?: number;
    }

    interface ChartLineOptions {
        tension?: number;
        backgroundColor?: ChartColor;
        borderWidth?: number;
        borderColor?: ChartColor;
        borderCapStyle?: string;
        borderDash?: any[];
        borderDashOffset?: number;
        borderJoinStyle?: string;
        capBezierPoints?: boolean;
        fill?: 'zero' | 'top' | 'bottom' | boolean;
        stepped?: boolean;
    }

    interface ChartPointOptions {
        radius?: number;
        pointStyle?: PointStyle;
        backgroundColor?: ChartColor;
        borderWidth?: number;
        borderColor?: ChartColor;
        hitRadius?: number;
        hoverRadius?: number;
        hoverBorderWidth?: number;
    }

    interface ChartRectangleOptions {
        backgroundColor?: ChartColor;
        borderWidth?: number;
        borderColor?: ChartColor;
        borderSkipped?: string;
    }

    interface ChartLayoutOptions {
      padding?: ChartLayoutPaddingObject | number;
    }

    interface ChartLayoutPaddingObject {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }

    interface GridLineOptions {
        display?: boolean;
        color?: ChartColor;
        borderDash?: number[];
        borderDashOffset?: number;
        lineWidth?: number;
        drawBorder?: boolean;
        drawOnChartArea?: boolean;
        drawTicks?: boolean;
        tickMarkLength?: number;
        zeroLineWidth?: number;
        zeroLineColor?: ChartColor;
        zeroLineBorderDash?: number[];
        zeroLineBorderDashOffset?: number;
        offsetGridLines?: boolean;
    }

    interface ScaleTitleOptions {
        display?: boolean;
        labelString?: string;
        fontColor?: ChartColor;
        fontFamily?: string;
        fontSize?: number;
        fontStyle?: string;
    }

    interface TickOptions {
        autoSkip?: boolean;
        autoSkipPadding?: number;
        callback?(value: any, index: any, values: any): string|number;
        display?: boolean;
        fontColor?: ChartColor;
        fontFamily?: string;
        fontSize?: number;
        fontStyle?: string;
        labelOffset?: number;
        maxRotation?: number;
        minRotation?: number;
        mirror?: boolean;
        padding?: number;
        reverse?: boolean;
        min?: any;
        max?: any;
    }
    interface AngleLineOptions {
        display?: boolean;
        color?: ChartColor;
        lineWidth?: number;
    }

    interface PointLabelOptions {
        callback?(arg: any): any;
        fontColor?: ChartColor;
        fontFamily?: string;
        fontSize?: number;
        fontStyle?: string;
    }

    interface TickOptions {
        backdropColor?: ChartColor;
        backdropPaddingX?: number;
        backdropPaddingY?: number;
        maxTicksLimit?: number;
        showLabelBackdrop?: boolean;
    }
    interface LinearTickOptions extends TickOptions {
        beginAtZero?: boolean;
        min?: number;
        max?: number;
        maxTicksLimit?: number;
        stepSize?: number;
        suggestedMin?: number;
        suggestedMax?: number;
    }

    interface LogarithmicTickOptions extends TickOptions {
        min?: number;
        max?: number;
    }

    type ChartColor = string | CanvasGradient | CanvasPattern | string[];

    interface ChartDataSets {
        cubicInterpolationMode?: 'default' | 'monotone';
        backgroundColor?: ChartColor | ChartColor[];
        borderWidth?: number | number[];
        borderColor?: ChartColor | ChartColor[];
        borderCapStyle?: string;
        borderDash?: number[];
        borderDashOffset?: number;
        borderJoinStyle?: string;
        borderSkipped?: PositionType;
        data?: ChartPoint[];
        fill?: boolean | number | string;
        hoverBackgroundColor?: string | string[];
        hoverBorderColor?: string | string[];
        hoverBorderWidth?: number | number[];
        label?: string;
        lineTension?: number;
        steppedLine?: 'before' | 'after' | boolean;
        pointBorderColor?: ChartColor | ChartColor[];
        pointBackgroundColor?: ChartColor | ChartColor[];
        pointBorderWidth?: number | number[];
        pointRadius?: number | number[];
        pointHoverRadius?: number | number[];
        pointHitRadius?: number | number[];
        pointHoverBackgroundColor?: ChartColor | ChartColor[];
        pointHoverBorderColor?: ChartColor | ChartColor[];
        pointHoverBorderWidth?: number | number[];
        pointStyle?: PointStyle | HTMLImageElement | Array<PointStyle | HTMLImageElement>;
        xAxisID?: string;
        yAxisID?: string;
        type?: string;
        hidden?: boolean;
        hideInLegendAndTooltip?: boolean;
        showLine?: boolean;
        stack?: string;
        spanGaps?: boolean;
	}


	interface ChartDataSets {
		showErrors?: boolean;		//plugin defs
		showCap?: boolean;
		capLen?: number;
		errStyle?: "circle" | "oval" | "ellipse" | "line"| "T" | "rect";
		errors?: number[];
		xErrors?: number[];
		yErrors?: number[];
    }

    interface ChartScales {
        type?: ScaleType | string;
        display?: boolean;
        position?: PositionType | string;
        gridLines?: GridLineOptions;
        scaleLabel?: ScaleTitleOptions;
        ticks?: TickOptions;
        xAxes?: ChartXAxe[];
        yAxes?: ChartYAxe[];
    }

    interface CommonAxe {
        type?: ScaleType | string;
        display?: boolean;
        id?: string;
        stacked?: boolean;
        position?: string;
        ticks?: TickOptions;
        gridLines?: GridLineOptions;
        barThickness?: number;
        scaleLabel?: ScaleTitleOptions;
        beforeUpdate?(scale?: any): void;
        beforeSetDimension?(scale?: any): void;
        beforeDataLimits?(scale?: any): void;
        beforeBuildTicks?(scale?: any): void;
        beforeTickToLabelConversion?(scale?: any): void;
        beforeCalculateTickRotation?(scale?: any): void;
        beforeFit?(scale?: any): void;
        afterUpdate?(scale?: any): void;
        afterSetDimension?(scale?: any): void;
        afterDataLimits?(scale?: any): void;
        afterBuildTicks?(scale?: any): void;
        afterTickToLabelConversion?(scale?: any): void;
        afterCalculateTickRotation?(scale?: any): void;
        afterFit?(scale?: any): void;
    }

    interface ChartXAxe extends CommonAxe {
        categoryPercentage?: number;
        barPercentage?: number;
        time?: TimeScale;
    }

    // tslint:disable-next-line no-empty-interface
    interface ChartYAxe extends CommonAxe {
    }

    interface LinearScale extends ChartScales {
        ticks?: LinearTickOptions;
    }

    interface LogarithmicScale extends ChartScales {
        ticks?: LogarithmicTickOptions;
    }

    interface TimeDisplayFormat {
        millisecond?: string;
        second?: string;
        minute?: string;
        hour?: string;
        day?: string;
        week?: string;
        month?: string;
        quarter?: string;
        year?: string;
    }

    interface TimeScale extends ChartScales {
        displayFormats?: TimeDisplayFormat;
        isoWeekday?: boolean;
        max?: string;
        min?: string;
        parser?: string | ((arg: any) => any);
        round?: TimeUnit;
        tooltipFormat?: string;
        unit?: TimeUnit;
        unitStepSize?: number;
        stepSize?: number;
        minUnit?: TimeUnit;
    }

    interface RadialLinearScale {
        lineArc?: boolean;
        angleLines?: AngleLineOptions;
        pointLabels?: PointLabelOptions;
        ticks?: TickOptions;
    }

    interface Point {
        x: number;
        y: number;
    }
}

//     formatErrorbars: function(chartInstance, ds_num){
//         var ds = this.calcData(chartInstance);
//         var ctx = this.calcContext(chartInstance)
//         var showErrors = ds[ds_num].showErrors
//         var errColor = ds[ds_num].errColor
//         var errWidth = ds[ds_num].errWidth
//         var capLen = ds[ds_num].capLen
//         var showCap = ds[ds_num].showCap
//         var errShape = ds[ds_num].errShape
//
//         if(errColor == "border"){
//                errColor = ds[ds_num].borderColor
//         } else if(typeof(errColor) === "string"){
//                 errColor = errColor
//         } else errColor = "rgba(169,169,169, 1)"
//
//         if(errWidth == "border"){
//              errWidth = ds[ds_num].borderWidth
//          } else if(typeof(errColor) === "number"){
//                  errWidth = errWidth
//         } else errWidth = 1
//
//         if(capLen == "border"){
//              capLen = ds[ds_num].borderWidth
//         } else if(typeof(capLen) === "number"){
//                  capLen = capLen
//         } else capLen = 3
//
//         if(showCap === false){
//             showCap = false
//         } else {showCap = true}
//
//         if(showErrors === false){
//             showErrors = false
//         } else if(showErrors === true || errColor || showCap)
//             showErrors = true
//
//         if(["circle", "oval", "ellipse",].includes(errShape)){
//              errShape = "oval"
//         } else errShape = "T"
//
//
//         return {showErrors: showErrors,
//                 errColor:errColor,
//                 errWidth:errWidth,
//                 errShape:errShape,
//                 showCap:showCap,
//                 capLen:capLen,
//                 }
//     },
////             var errCalc = this.calcErrorbars(chartInstance, ds_num)
//             var errForm = this.formatErrorbars(chartInstance, ds_num)
///             var isHidden = errCalc[3]
//             var yList = errCalc[1]
//             var xList = errCalc[0]
//             var errList = errCalc[2]
//             var showErrors = errForm.showErrors
//             var errColor = errForm.errColor
//             var errWidth = errForm.errWidth
//             var showCap = errForm.showCap
//             var capLen = errForm.capLen
//             var errShape = errForm.errShape
//
var errorbarPlugin = {
//Chart.plugins.register({

    afterDatasetsDraw: (chart: Chart) => {
        var type = chart.config.type
		var plugConfig = chart.config.options.errorbarPlugin
		var showErrors
		if (plugConfig) {
			if (plugConfig.showErrors) {
				showErrors = plugConfig.showErrors
			}
		} else showErrors = true
		//console.log(showErrors)

        if(showErrors != false){
            if(["line", "scatter"].includes(type)){  //if(type == "line" || type == "scatter"){
                errorbarPlugin.scatterErrorbars(chart)
            } else
            if (type == "bar"){
                console.log("Bar charts not supported yet")
            }
        }
    },


    scatterErrorbars: (chart: Chart) => {
        const ctx = chart.ctx;

        chart.data.datasets.forEach((dataset: Chart.ChartDataSets, i: number) => {
            var ds = dataset
            var meta = chart.getDatasetMeta(i);

            if (ds.showErrors === false){
				var showErrors = false
            } else showErrors = true

            var showCap: boolean
            (ds.showCap) ? showCap = ds.showCap : showCap = true

            var capLen: number
            (ds.capLen) ? capLen = ds.capLen : capLen = 3

            var errStyle: string
            (ds.errStyle) ? errStyle = ds.errStyle : errStyle = "T"

            if (!meta.hidden && showErrors) {
                meta.data.forEach((element, index: number) => {
                    var x_point = element._model.x
                    var y_point = element._model.y
                    var errColor = element._view.borderColor
					var errFillColor = "rgba(0,0,0,0)"  // element._view.fillColor
					var dataPoint: Chart.ChartPoint = ds.data[index]

                    if (dataPoint.r) {
                        var yError = dataPoint.r
                    } else
                    if (ds.errors){
                        yError = ds.errors[index]
                    } else {yError = 0}

                    if (dataPoint.e){
                        var xError = dataPoint.e
                    } else
                    if (ds.xErrors){
                        xError = ds.xErrors[index]
                    } else {xError = 0}
                    console.log(x_point, y_point, yError, xError, errColor)

                    var position = element.tooltipPosition();
					// ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                    // var fontSize = 16;
                    // var fontStyle = 'normal';
                    // var fontFamily = 'Helvetica Neue';
                    // ctx.textAlign = 'center';
                    // ctx.textBaseline = 'middle';
                    // var padding = 5;
                    // ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    // // Just naively convert to string for now
                    // var dataString = dataset.data[index].toString();
                    // // Make sure alignment settings are correct
                    // ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);

                    if (errStyle == "circle"){
                        ctx.beginPath();
                        ctx.arc(position.x, position.y, yError, 0, 2 * Math.PI, false);
                        ctx.fillStyle = errFillColor;
						ctx.fill();
						if (ds.hidden === true && meta.hidden === null){
							ctx.strokeStyle = "rgba(0,0,0,0)";
						} else {
							ctx.strokeStyle = errColor
						}
                        ctx.stroke();
                    }
                    else if (errStyle == "oval" || errStyle == "ellipse"){
                        if(xError != 0){
                            var scaleFac = (xError)/yError
                        } else scaleFac = 10/yError //10 should be based on xScale?
                        ctx.beginPath();
                        ctx.save()
                        ctx.scale(scaleFac, 1);
                        ctx.arc(position.x/scaleFac, position.y, yError, 0, 2 * Math.PI, false);
                        ctx.restore()
						if (ds.hidden === true && meta.hidden === null){
							ctx.strokeStyle = "rgba(0,0,0,0)";
						} else {
							ctx.strokeStyle = errColor
						}
                        //ctx.fill();
                        ctx.stroke();
                    }
                    else {
                        ctx.beginPath();
                        ctx.moveTo(position.x, position.y - yError);
                        ctx.lineTo(position.x, position.y + yError);
						if (ds.hidden === true && meta.hidden === null){
							ctx.strokeStyle = "rgba(0,0,0,0)";
						} else {
							ctx.strokeStyle = errColor
						}
                        ctx.stroke();
                        if(showCap){
                            ctx.beginPath();
                            ctx.moveTo(position.x-capLen, position.y - yError);
                            ctx.lineTo(position.x+capLen, position.y - yError);
                            ctx.moveTo(position.x-capLen, position.y + yError);
                            ctx.lineTo(position.x+capLen, position.y + yError);
                            ctx.stroke()
                        }

                	}
                });
            }
        });
    }
};
