
var redtr = 'rgba(214, 13, 13, 0.2)';
var pinktr = 'rgba(255, 99, 132, 0.2)';
var bluetr = 'rgba(54, 105, 235, 0.2)';
var yellowtr = 'rgba(255, 206, 86, 0.2)';
var greentr = 'rgba(30, 184, 59, 0.2)';
var purpletr = 'rgba(153, 102, 255, 0.2)';
var orangetr = 'rgba(255, 159, 64, 0.2)';
var greytr = 'rgba(255, 255, 255, 0.2)';

var red = 'rgba(214, 13, 13, 1)';
var pink = 'rgba(255,99,132,1)';
var blue = 'rgba(54, 105, 235, 1)';
var yellow = 'rgba(255, 206, 86, 1)';
var green = 'rgba(30, 184, 59, 1)';
var purple = 'rgba(153, 102, 255, 1)';
var orange = 'rgba(255, 159, 64, 1)';
var black = 'rgba(255, 255, 255, 1)';

//var data = "{{ customers }}"		//django renders data on pageload
//var defaultData = []
//var labels = [];

var chart_line_2 = '/charts/api/chart_line2/data/'  //'{% url "charts:chart_line_data" %}'
$.ajax({
    method: "GET",
    url: chart_line_2,
    success: function(data){			//takes data from the url specified in var endpoint
		//labels = data.labels			//get from REST api view
        data1 = eval(data.line1)
		data2 = eval(data.line2)
		data3 = eval(data.line3)
		console.log(data)
		setChart2()
    },
    error: function(error_data){
        console.log("error")
        console.log(error_data)
    }
})

var canvas = document.getElementById("crosshair");
var context = canvas.getContext("2d");
context.setLineDash([3, 5]);

canvas.addEventListener("mousemove", function(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(0,y);
    context.lineTo(500,y);
    context.moveTo(x,0);
    context.lineTo(x,500);
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();
});

function setChart2(){
	const ctx2 = document.getElementById("lineChart2").getContext("2d");

	var lineChart2 = new Chart(ctx2, {
	    type: 'line',
		data: {
	        //labels: labels,					//x axis labels, from server or []
	        datasets: [
				{
				data: data1,
	            label: 'Things',		//legend for that dataset
	          	fill : false,
				//yAxisID: ''
				pointStyle: 'rectRounded', 		//'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash', Image, Array.
	            backgroundColor: bluetr,	//if fill: true
	            borderColor: blue,
	            borderWidth: 2,
				pointBorderColor: blue,
				pointBackgroundColor: bluetr,
				pointRadius: 4,
				pointBorderWidth: 2,
				showLine: false
			},
			{
			data: data2,
			label: 'Mongs',		//legend for that dataset
			fill : false,
			//yAxisID: ''
			pointStyle: 'rectRounded', 		//'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash', Image, Array.
			backgroundColor: redtr,	//if fill: true
			borderColor: red,
			borderWidth: 2,
			pointBorderColor: red,
			pointBackgroundColor: redtr,
			pointRadius: 4,
			pointBorderWidth: 2,
			showLine: false
			},
			{
			data: data3,
			label: 'Frogs',		//legend for that dataset
			fill : false,
			//yAxisID: ''
			pointStyle: 'rectRounded', 		//'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash', Image, Array.
			backgroundColor: greentr,	//if fill: true
			borderColor: green,
			borderWidth: 2,
			pointBorderColor: green,
			pointBackgroundColor: greentr,
			pointRadius: 4,
			pointBorderWidth: 2,
			showLine: false
			}
			]

	    },
	    options: {
	        scales: {
	            yAxes: [{
					display: true,
					position: 'right',
					ticks: {
							min: -20, 	//beginAtZero:true,
							steps: 10,
                            stepValue: 1,
                            max: 20 },
					scaleLabel: {display: true,	labelString: 'Number'},
				}],
				xAxes: [{
					display: true,
					type: 'linear',
					position: 'bottom',
					ticks: {min: -20,
							max: 20 },
					scaleLabel: {display: true,	labelString: 'Month'},
				}]
	        },
			legend: {
				labels: {usePointStyle: true}
			}
	    }
	});

}
