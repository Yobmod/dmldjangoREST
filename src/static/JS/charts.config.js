// Chart.defaults.global.animation = true;
// Chart.defaults.global.animationSteps = 160;
//
// Chart.defaults.global.responsive = true;
// Chart.defaults.global.elements.responsive = true;

Chart.defaults.global.defaultFontSize = 14;
// Chart.defaults.global.elements.responsive = true;
// Chart.defaults.global.elements.responsive = true;

var pinktr = 'rgba(255, 99, 132, 0.2)';
var bluetr = 'rgba(54, 162, 235, 0.2)';
var yellowtr = 'rgba(255, 206, 86, 0.2)';
var greentr = 'rgba(30, 184, 59, 0.2)';
var purpletr = 'rgba(153, 102, 255, 0.2)';
var orangetr = 'rgba(255, 159, 64, 0.2)';
var greytr = 'rgba(255, 255, 255, 0.2)';

var pink = 'rgba(255,99,132,1)';
var blue = 'rgba(54, 162, 235, 1)';
var yellow = 'rgba(255, 206, 86, 1)';
var green = 'rgba(30, 184, 59, 1)';
var purple = 'rgba(153, 102, 255, 1)';
var orange = 'rgba(255, 159, 64, 1)';
var black = 'rgba(255, 255, 255, 1)';

Chart.pluginService.register({
    afterDraw: function(chartInstance) {
        var yValue;
        var yScale = chartInstance.scales["y-axis-0"];
        var canvas = chartInstance.chart;
        var ctx = canvas.ctx;
        var index;
        var line;
        var style;

        if (chartInstance.options.horizontalLine) {
            for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
                line = chartInstance.options.horizontalLine[index];

                if (!line.style) {
                    style = "rgba(169,169,169, .6)";
                } else {
                    style = line.style;
                }

                if (line.y) {
                    yValue = yScale.getPixelForValue(line.y);
                } else {
                    yValue = 0;
                }

                ctx.lineWidth = 3;

                if (yValue) {
                    ctx.beginPath();
                    ctx.moveTo(60, yValue);
                    ctx.lineTo(canvas.width, yValue);
                    ctx.strokeStyle = style;
                    ctx.stroke();
                }

                if (line.text) {
                    ctx.fillStyle = style;
                    ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
                }
            }
            return;
        }
    }
});

Chart.pluginService.register({
    afterDraw: function(chartInstance) {
        var xValue;
        var xScale = chartInstance.scales["x-axis-0"];
        var canvas = chartInstance.chart;
        var ctx = canvas.ctx;
        var index;
        var line;
        var style;

        if (chartInstance.options.verticalLine) {
            for (index = 0; index < chartInstance.options.verticalLine.length; index++) {
                line = chartInstance.options.verticalLine[index];

                if (!line.style) {
                    style = "rgba(169,169,169, .6)";
                } else {
                    style = line.style;
                }

                if (line.x) {
                    xValue = xScale.getPixelForValue(line.x);
                } else {
                    xValue = 0;
                }

                ctx.lineWidth = 3;

                if (xValue) {
                    ctx.beginPath();
                    ctx.moveTo(xValue,39);
                    ctx.lineTo(xValue, canvas.height-45);
                    ctx.strokeStyle = style;
                    ctx.stroke();
                }

                if (line.text) {
                    ctx.fillStyle = style;
                    ctx.fillText(line.text, xValue + ctx.lineWidth, 0);
                }
            }
            return;
        }
    }
});
