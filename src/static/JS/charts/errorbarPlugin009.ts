"use strict";
/// <reference types="./chartjs" />
//import * as Chart from "typings/chartjs";

const errorbarPlugin = {
//Chart.plugins.register({

    afterDraw: (chart: Chart) => {
        const type = chart.config.type
		const plugConfig = chart.config.options.errorbarPlugin
        let showErrors: boolean;

		if (plugConfig) {
			if (plugConfig.showErrors) {
				showErrors = plugConfig.showErrors
			}
		} else showErrors = true
		//console.log(showErrors)
        
        if(showErrors !== false){
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
        const plugConfig = chart.config.options.errorbarPlugin
        //const yScale = chartInstance.scales[meta.yAxisID];
		//const xScale = chartInstance.scales[meta.xAxisID];

        chart.data.datasets.forEach((dataset: Chart.ChartDataSets, i: number) => {
            let ds = dataset
			let meta = chart.getDatasetMeta(i);

            let showErrors: boolean;
            (ds.showErrors === false) ? showErrors = false : showErrors = true
           
            let errWidth: number;
            (ds.errWidth) ? errWidth = ds.errWidth : errWidth = 1

            let showCap: boolean;
            (ds.showCap) ? showCap = ds.showCap : showCap = true

            let capLen: number;
            (ds.capLen) ? capLen = ds.capLen : capLen = 3

            let errStyle: string;
            (ds.errStyle) ? errStyle = ds.errStyle : errStyle = "T"

            let errFillColor: string;
            (ds.errFillColor) ? errFillColor = ds.errFillColor : errFillColor = "rgba(0,0,0,0)"

            if (!meta.hidden && showErrors) {
                meta.data.forEach((element: Chart.MetaPoints, index: number) => {
                    let x_point = element._model.x
                    let y_point = element._model.y

                    let errColor: string;
                    (ds.errColor) ? errColor = ds.errColor : errColor = element._view.borderColor

    				let dataPoint = ds.data[index] //<Chart.ChartPoint>ds.data[index]
					let yError: number;
					let xError: number;

                    if (typeof(dataPoint) === "object" && 'r' in dataPoint) { //for scatter with r, bubble
                        yError = dataPoint.r
                    } else								//for scatter or line
                    if (ds.errors){
                        yError = ds.errors[index]
                    } else {yError = null}

                    if (typeof(dataPoint) === "object" && dataPoint.e){
                        xError = dataPoint.e
                    } else
                    if (ds.xErrors){
                        xError = ds.xErrors[index]
                    } else {xError = null}
                    // console.log(x_point, y_point, yError, xError, errColor)

                    let position = element.tooltipPosition();
					// ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                    // let fontSize = 16;
                    // let fontStyle = 'normal';
                    // let fontFamily = 'Helvetica Neue';
                    // ctx.textAlign = 'center';
                    // ctx.textBaseline = 'middle';
                    // let padding = 5;
                    // ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    // // Just naively convert to string for now
                    // let dataString = dataset.data[index].toString();
                    // // Make sure alignment settings are correct
                    // ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);

                    if (errStyle == "circle"){
                        ctx.beginPath();
                        ctx.arc(position.x, position.y, yError, 0, 2 * Math.PI, false);
                        						
						if (ds.hidden === true && meta.hidden === null){
                            ctx.strokeStyle = "rgba(0,0,0,0)";
                            ctx.fillStyle = "rgba(0,0,0,0)"
						} else {
                            ctx.strokeStyle = errColor
                            ctx.fillStyle = errFillColor;
                        }
                        ctx.fill();
                        ctx.stroke();
                    }
                    else if (errStyle == "oval" || errStyle == "ellipse") {
                        let scaleFac: number;
                        if (xError) {
                            scaleFac = (xError)/yError
                        } else scaleFac = 10/yError //10 should be based on xScale?
                        ctx.beginPath();
                        ctx.save()
                        ctx.scale(scaleFac, 1);
                        ctx.arc(position.x/scaleFac, position.y, yError, 0, 2 * Math.PI, false);
                        ctx.restore()
                        if (ds.hidden === true && meta.hidden === null) {
                            ctx.strokeStyle = "rgba(0,0,0,0)";
                            ctx.fillStyle = "rgba(0,0,0,0)"
                        } else {
                            ctx.strokeStyle = errColor
                            ctx.fillStyle = errFillColor;
                        }
                        ctx.fill();
                        ctx.stroke();
                    }
                    else {
                        ctx.beginPath();
                        ctx.moveTo(position.x, position.y - yError);
                        ctx.lineTo(position.x, position.y + yError);
						if (xError) {
							ctx.moveTo(position.x - xError, position.y);
							ctx.lineTo(position.x + xError, position.y);
						}
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
							if (xError) {
								ctx.moveTo(position.x - xError, position.y-capLen);
								ctx.lineTo(position.x - xError, position.y+capLen);
								ctx.moveTo(position.x + xError, position.y-capLen);
								ctx.lineTo(position.x + xError, position.y+capLen);
							}
                            ctx.stroke()
                        }
                	}
                });
            }
        });
    }
};
