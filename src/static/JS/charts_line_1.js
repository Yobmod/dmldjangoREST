//Line chart regular interval y-axis data

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
var chart_line_1 = '/charts/api/chart_line1/data/'  //'{% url "charts:chart_line_data" %}'
$.ajax({
    method: "GET",
    url: chart_line_1,
    success: function(data){			//takes data from the url specified in var endpoint
        labels = data.labels			//get from REST api view
        data1 = data.line1
		console.log(data)
        setChart1()						//if GETs data then does setchart function
    },
    error: function(error_data){
        console.log("error")
        console.log(error_data)
    }
})

function setChart1(){
	const ctx = document.getElementById("lineChart1");
	var lineChart1 = new Chart(ctx, {
	    type: 'line',
		data: {
	        labels: labels,					//x axis labels, from server or []
	        datasets: [
				{
				data: data1,
	            label: 'Number of things',		//legend for that dataset
	          	fill : true,
				//yAxisID: ''
				pointStyle: 'circle', 		//'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash', Image, Array.
	            backgroundColor: bluetr,	//if fill: true
	            borderColor: blue,
	            borderWidth: 1
	        	}
			]

	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});

}
