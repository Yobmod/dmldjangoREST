var ctxBarChart = document.getElementById("priceComplianceBarChart").getContext("2d");
var priceBarChart = new Chart(ctxBarChart, {
    type: 'bar',
    data: {
        labels: ["Bix Produce", "Capitol City", "Charlies Portland", "Costa Fruit and Produce", "Get Fresh Sales", "Loffredo East", "Loffredo West", "Paragon", "Piazza Produce"],
        datasets: [{
            label: 'Some Values',
            backgroundColor: 'rgba(97, 188, 109, 0.2)',
            borderColor: 'rgba(97, 188, 109, .8)',
            data: [7000, 5565, 3806, 5925, 5721, 6635, 14080, 9027, 25553]
            //data: [17724, 2565, 1506, 3625, 3721, 4635, 7080, 4027, 12553]
        }, {
            label: 'Other Values',
            backgroundColor: 'rgba(236, 107, 86, 0.2)',
            borderColor: 'rgba(236, 107, 86, .8)',
            data: [17724, 2565, 1506, 3625, 3721, 4635, 7080, 4027, 12553]
            //data: [17, 1, 18, 14, 3, 1, 5, 10, 1]
        }]
    },
    options: {
        tooltips: {
            enabled: false
        },
        animation: {
            duration: 0,
            onComplete: function () {
                if (this.data.datasets.length === 2) {
                    // render the value of the chart above the bar
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = this.chart.config.options.defaultFontColor;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    var firstDataSet = this.data.datasets[0];
                    var secondDataSet = this.data.datasets[1];
                    if (firstDataSet.length === secondDataSet.length) {
                        for (var i = 0; i < firstDataSet.data.length; i++) {
                            var firstModel = firstDataSet._meta[Object.keys(firstDataSet._meta)[0]].data[i]._model;
                            var secondModel = secondDataSet._meta[Object.keys(secondDataSet._meta)[0]].data[i]._model;
                            var total = firstDataSet.data[i] + secondDataSet.data[i];
                            if (firstDataSet.data[i] >= secondDataSet.data[i]) {
                                ctx.fillText((firstDataSet.data[i] * 100 / total).toFixed(2) + '%', firstModel.x, firstModel.y + 30);
                            } else {
                                ctx.fillText((secondDataSet.data[i] * 100 / total).toFixed(2) + '%', secondModel.x, secondModel.y + 30);
                            }
                        }
                    }
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                stacked: true
            }],
            xAxes: [{
                stacked: true,
            }]
        }
    }
});
