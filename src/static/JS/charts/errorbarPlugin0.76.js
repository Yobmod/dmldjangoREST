"use strict";
var errorbarPlugin = {
    afterDatasetsDraw: function (chart) {
        var type = chart.config.type;
        var plugConfig = chart.options.errorbarPlugin;
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
                this.scatterErrorbars(chart);
            }
            else if (type == "bar") {
                console.log("Bar charts not supported yet");
            }
        }
    },
    scatterErrorbars: function (chart) {
        const ctx = chart.ctx;
        chart.data.datasets.forEach(function (dataset, i) {
            let ds = dataset;
            let meta = chart.getDatasetMeta(i);
            if (ds.showErrors == false) {
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
                    const x_point = element._model.x;
                    const y_point = element._model.y;
                    var errColor = element._view.borderColor;
					var dataPoint = ds.data[index]

                    if (dataPoint.r) {
						console.log(typeof(dataPoint.r))
                        var yError = ds.data[index].r;
                    }
                    else if (ds.errors) {
                        yError = ds.errors[index];
                    }
                    else {
                        yError = 0;
                    }
                    if (ds.data[index].e) {
                        var xError = ds.data[index].e;
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
                        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                        ctx.fill();
                        ctx.strokeStyle = errColor;
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
                        ctx.fill();
                        ctx.stroke();
                    }
                    else {
                        ctx.beginPath();
                        ctx.moveTo(position.x, position.y - yError);
                        ctx.lineTo(position.x, position.y + yError);
                        ctx.strokeStyle = errColor;
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
//# sourceMappingURL=tsc.js.map
