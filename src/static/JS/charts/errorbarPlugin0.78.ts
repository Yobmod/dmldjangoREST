"use strict";
//import * as Chart from "typings/chartjs";
//import "typings/EBPlugin"

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
            var meta: Chart.ChartDSMeta = chart.getDatasetMeta(i);

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
                meta.data.forEach((element: Chart.MetaPoints, index: number) => {
                    var x_point = element._model.x
                    var y_point = element._model.y
                    var errColor = element._view.borderColor
					var errFillColor = "rgba(0,0,0,0)"  // element._view.fillColor
					var dataPoint = <Chart.ChartPoint>ds.data[index]

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
