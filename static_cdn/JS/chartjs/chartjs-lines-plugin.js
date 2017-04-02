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
