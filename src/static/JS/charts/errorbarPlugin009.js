"use strict";
var errorbarPlugin = {
    afterDraw: function (chart) {
        var type = chart.config.type;
        var plugConfig = chart.config.options.errorbarPlugin;
        if (plugConfig) {
            if (plugConfig.showErrors) {
                var showErrors = plugConfig.showErrors;
            }
        }
        else
            showErrors = true;
        if (showErrors !== false) {
            if (["line", "scatter"].includes(type)) {
                errorbarPlugin.scatterErrorbars(chart);
            }
            else if (type == "bar") {
                console.log("Bar charts not supported yet");
            }
        }
    },
    scatterErrorbars: function (chart) {
        var ctx = chart.ctx;
        var plugConfig = chart.config.options.errorbarPlugin;
        chart.data.datasets.forEach(function (dataset, i) {
            var ds = dataset;
            var meta = chart.getDatasetMeta(i);
            var showErrors;
            (ds.showErrors === false) ? showErrors = false : showErrors = true;
            var errWidth;
            (ds.errWidth) ? errWidth = ds.errWidth : errWidth = 1;
            var showCap;
            (ds.showCap) ? showCap = ds.showCap : showCap = true;
            var capLen;
            (ds.capLen) ? capLen = ds.capLen : capLen = 3;
            var errStyle;
            (ds.errStyle) ? errStyle = ds.errStyle : errStyle = "T";
            var errFillColor;
            (ds.errFillColor) ? errFillColor = ds.errFillColor : errFillColor = "rgba(0,0,0,0)";
            if (!meta.hidden && showErrors) {
                meta.data.forEach(function (element, index) {
                    var x_point = element._model.x;
                    var y_point = element._model.y;
                    var errColor;
                    (ds.errColor) ? errColor = ds.errColor : errColor = element._view.borderColor;
                    var dataPoint = ds.data[index];
                    var yError;
                    var xError;
                    if (typeof (dataPoint) === "object" && 'r' in dataPoint) {
                        yError = dataPoint.r;
                    }
                    else if (ds.errors) {
                        yError = ds.errors[index];
                    }
                    else {
                        yError = null;
                    }
                    if (typeof (dataPoint) === "object" && dataPoint.e) {
                        xError = dataPoint.e;
                    }
                    else if (ds.xErrors) {
                        xError = ds.xErrors[index];
                    }
                    else {
                        xError = null;
                    }
                    var position = element.tooltipPosition();
                    if (errStyle == "circle") {
                        ctx.beginPath();
                        ctx.arc(position.x, position.y, yError, 0, 2 * Math.PI, false);
                        if (ds.hidden === true && meta.hidden === null) {
                            ctx.strokeStyle = "rgba(0,0,0,0)";
                            ctx.fillStyle = "rgba(0,0,0,0)";
                        }
                        else {
                            ctx.strokeStyle = errColor;
                            ctx.fillStyle = errFillColor;
                        }
                        console.log(meta.hidden);
                        ctx.fill();
                        ctx.stroke();
                    }
                    else if (errStyle == "oval" || errStyle == "ellipse") {
                        if (xError) {
                            var scaleFac = (xError) / yError;
                        }
                        else
                            scaleFac = 10 / yError;
                        ctx.beginPath();
                        ctx.save();
                        ctx.scale(scaleFac, 1);
                        ctx.arc(position.x / scaleFac, position.y, yError, 0, 2 * Math.PI, false);
                        ctx.restore();
                        if (ds.hidden === true && meta.hidden === null) {
                            ctx.strokeStyle = "rgba(0,0,0,0)";
                        }
                        else {
                            ctx.strokeStyle = errColor;
                        }
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
                        if (ds.hidden === true && meta.hidden === null) {
                            ctx.strokeStyle = "rgba(0,0,0,0)";
                        }
                        else {
                            ctx.strokeStyle = errColor;
                        }
                        ctx.stroke();
                        if (showCap) {
                            ctx.beginPath();
                            ctx.moveTo(position.x - capLen, position.y - yError);
                            ctx.lineTo(position.x + capLen, position.y - yError);
                            ctx.moveTo(position.x - capLen, position.y + yError);
                            ctx.lineTo(position.x + capLen, position.y + yError);
                            if (xError) {
                                ctx.moveTo(position.x - xError, position.y - capLen);
                                ctx.lineTo(position.x - xError, position.y + capLen);
                                ctx.moveTo(position.x + xError, position.y - capLen);
                                ctx.lineTo(position.x + xError, position.y + capLen);
                            }
                            ctx.stroke();
                        }
                    }
                });
            }
        });
    }
};
