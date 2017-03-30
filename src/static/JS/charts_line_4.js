/*jshint esversion: 6 */

var ctx4 = document.getElementById("myChart");

var XPImage = new Image();
    XPImage.src ='http://www.lespaulforum.com/forum/images/smilies/feiertag-smiley-018.gif';
	//XPImage.src ="/static/js/skull.png";

var ChillImage = new Image();
    ChillImage.src ='http://www.lespaulforum.com/forum/images/smilies/feiertag-smiley-018.gif';
	//ChillImage.src ="/static/js/skull.png";

class DataPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var days = 85;
var chillax = 72.5;

// XP DATA SET
var XPData = {
  label: 'XP Earned',
  fill: false,
  backgroundColor: "rgba(0,0,0,1)",
  borderColor: "rgba(0,0,0,1)",
  //pointBorderColor: "#444",
  //pointBackgroundColor: "#444",
  pointStyle: XPImage,
  //pointRadius: 5,
  data: [],
  //showLine: false,
  }



// XP Data generation
var total = 0;
for (var i = 0; i < 35; i++) {
  total += 10 * Math.floor(Math.random() + 0.5);
  total += 5 * Math.floor(Math.random() + 0.5);
  total += 5 * Math.floor(Math.random() + 0.5);

  var p = new DataPoint(i + 1, total);
  XPData.data.push(p);
}


// XP Trend Data
var XPTrendData = {
  label: 'XP Trend',
  fill: false,
  pointRadius: 0,
  lineTension: 0,
  borderDash: [5, 5],
  borderColor: "#ccc",
  backgroundColor: "rgba(0,0,0,0)",
  pointBorderColor: "#444",
  pointStyle: 'rect',
  data: [],
};

// XP Trend calculaion
var total = 0;
var days_so_far = XPData.data.length;
total = XPData.data[days_so_far - 1].y;
var average_per_day = total / days_so_far;

var trend_total = total;
for (i = days_so_far; i < days; i++) {

  p = new DataPoint(i, trend_total);
  XPTrendData.data.push(p);
  trend_total += average_per_day;

}

// Chillax Line Data Set
var ChillaxLineData = {
  label: 'Chillax Line',
  pointRadius: 0,
  backgroundColor: "rgba(0,0,0,0)",
  borderColor: "#337AB7",
  data: [],
};

// Chill Line Generation
for (i = 1; i < days; i++) {
  p = new DataPoint(i, Math.floor(i * chillax * 10 / days));
  ChillaxLineData.data.push(p);

}



var options = {
  scaleUse2Y: true,

  scales: {

    xAxes: [{
      type: 'linear',
      position: 'bottom',
      ticks: {
        max: days,
        min: 0,
        stepSize: 5,
      },
      scaleLabel: {
        display: true,
        labelString: 'Days of Class'
      },

    }],

    yAxes: [{
   			id: "y-axis-XP",
        position: 'right',
        ticks: {
          max: 1000,
          min: 0,
          stepSize: 50,
        },

        scaleLabel: {
          display: true,
          labelString: 'XP'
        },

        gridLines: {
        },
      },
      {
        id: "y-axis-percent",
        position: 'left',

        ticks: {
          max: 100,
          min: 0,
          stepSize: 5,
        },

        scaleLabel: {
          display: true,
          labelString: 'Percent'
        },

        gridLines: {
          /*show: true,
          color: "rgba(255, 255, 255, 1)",
          lineWidth: 1,
          drawOnChartArea: true,
          drawTicks: true,
          zeroLineWidth: 1,
          zeroLineColor: "rgba(255,255,255,1)", */
        },
      }


    ],
  },

  title: {
    text: 'A Map of Your Progress',
    display: true,
  },

  legend: {
    position: 'top',
    labels: {usePointStyle: true},
  },

};

var data = {
  datasets: [XPData,
    XPTrendData,
    ChillaxLineData,
  ]
};

var myChart = new Chart(ctx4, {
  type: 'line',
  data: data,
  options: options,
});
