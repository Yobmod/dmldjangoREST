"use strict";
var errorbarPlugin = {
    afterDatasetsDraw: function (chart) {
        var type = chart.config.type;
        var plugConfig = chart.config.options.errorbarPlugin;
        var showErrors;
        if (plugConfig) {
            if (plugConfig.showErrors) {
                showErrors = plugConfig.showErrors;
            }
        }
        else
            showErrors = true;
        if (showErrors != false) {
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
        chart.data.datasets.forEach(function (dataset, i) {
            var ds = dataset;
            var meta = chart.getDatasetMeta(i);
            if (ds.showErrors === false) {
                var showErrors = false;
            }
            else
                showErrors = true;
            var showCap;
            (ds.showCap) ? showCap = ds.showCap : showCap = true;
            var capLen;
            (ds.capLen) ? capLen = ds.capLen : capLen = 3;
            var errStyle;
            (ds.errStyle) ? errStyle = ds.errStyle : errStyle = "T";
            if (!meta.hidden && showErrors) {
                meta.data.forEach(function (element, index) {
                    var x_point = element._model.x;
                    var y_point = element._model.y;
                    var errColor = element._view.borderColor;
                    var errFillColor = "rgba(0,0,0,0)";
                    var dataPoint = ds.data[index];
                    if (dataPoint.r) {
                        var yError = dataPoint.r;
                    }
                    else if (ds.errors) {
                        yError = ds.errors[index];
                    }
                    else {
                        yError = 0;
                    }
                    if (dataPoint.e) {
                        var xError = dataPoint.e;
                    }
                    else if (ds.xErrors) {
                        xError = ds.xErrors[index];
                    }
                    else {
                        xError = 0;
                    }
                    console.log(x_point, y_point, yError, xError, errColor);
                    var position = element.tooltipPosition();
                    if (errStyle == "circle") {
                        ctx.beginPath();
                        ctx.arc(position.x, position.y, yError, 0, 2 * Math.PI, false);
                        ctx.fillStyle = errFillColor;
                        ctx.fill();
                        if (ds.hidden === true && meta.hidden === null) {
                            ctx.strokeStyle = "rgba(0,0,0,0)";
                        }
                        else {
                            ctx.strokeStyle = errColor;
                        }
                        ctx.stroke();
                    }
                    else if (errStyle == "oval" || errStyle == "ellipse") {
                        if (xError != 0) {
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
                            ctx.stroke();
                        }
                    }
                });
            }
        });
    }
};
//# sourceMappingURL=errorbarPlugin0.78.js.map