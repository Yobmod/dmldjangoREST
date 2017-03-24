var pinktr = 'rgba(255, 99, 132, 0.2)';
var bluetr = 'rgba(54, 162, 235, 0.2)';
var yellowtr = 'rgba(255, 206, 86, 0.2)';
var greentr = 'rgba(75, 192, 192, 0.2)';
var purpletr = 'rgba(153, 102, 255, 0.2)';
var orangetr = 'rgba(255, 159, 64, 0.2)';
var greytr = 'rgba(255, 255, 255, 0.2)';

var pink = 'rgba(255,99,132,1)';
var blue = 'rgba(54, 162, 235, 1)';
var yellow = 'rgba(255, 206, 86, 1)';
var green = 'rgba(75, 192, 192, 1)';
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
		//const data1String = JSON.stringify(data.line1)
	//	const data1 = JSON.stringify(data.line1).replace(/\"/g, "");
		//const data2 = JSON.parse(data1);
		var data1 = data.line1
		console.log(data1)
		//console.log(data1String)
		setChart2()

    },
    error: function(error_data){
        console.log("error")
        console.log(error_data)
    }
})

function setChart2(){
	const ctx2 = document.getElementById("lineChart2");
	var lineChart2 = new Chart(ctx2, {
	    type: 'line',
		data: {
	        //labels: labels,					//x axis labels, from server or []
	        datasets: [
				{
				data: data1,
	            label: 'Number of things',		//legend for that dataset
	          	fill : false,
				//yAxisID: ''
				pointStyle: 'circle', 		//'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash', Image, Array.
	            backgroundColor: 'rgba(0, 0, 0 ,0)',	//if fill: true
	            borderColor: 'rgba(0, 0, 0 ,0)',
	            borderWidth: 2,
				pointBorderColor: blue,
				pointBackgroundColor: bluetr,
	        	}
			]

	    },
	    options: {
	        scales: {
	            yAxes: [{
					display: true,
					position: 'right',
					ticks: {
							min: -1, 	//beginAtZero:true,
							steps: 10,
                            stepValue: 1,
                            max: 10 },
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
	        }
	    }
	});

}
