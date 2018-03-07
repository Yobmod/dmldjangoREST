var errorbarPlugin = {

	// beforeInit: function(chartInstance){
	// 	var ctx = chartInstance.chart.ctx
	// 	return ctx
	// },

	calcContext: function(chartInstance){
		var ctx = chartInstance.chart.ctx
		var type = chartInstance.chart.type

		return ctx
	},

	calcData: function(chartInstance){
		var ds = chartInstance.data.datasets
		return ds
	},

	calcXPoints: function(chartInstance, dataList){
		var ds = this.calcData(chartInstance)
		var xScale = chartInstance.scales['x-axis-0'];
		var xList = []
			for(var i = 0; i < dataList.length; i++){
				var xValue = dataList[i].x
				var xPixel = xScale.getPixelForValue(xValue)
				xList.push(xPixel)
			}
		return xList
	},

	calcYPoints: function(chartInstance, dataList){
		var ds = this.calcData(chartInstance)
		var yScale = chartInstance.scales['y-axis-0'];
		var yList = []
			for(var i = 0; i < dataList.length; i++){
				var yValue = dataList[i].y
				var yPixel = yScale.getPixelForValue(yValue)
				yList.push(yPixel)
			}
		//console.log(yList)
		return yList
	},

	calcYErrors: function(chartInstance, dataList, errors){
		var ds = this.calcData(chartInstance)
		var type = chartInstance.chart.config.type
		var yScale = chartInstance.scales['y-axis-0'];
		var errList;

		if(errors){
			errList = errors;
		} else
		if(type == "scatter"){
			errList = []
				for(var i = 0; i < dataList.length; i++){
					var errValue = dataList[i].r
					var maxValue = errValue + dataList[i].y
					var maxPixel = yScale.getPixelForValue(maxValue)
					var yPixel = this.calcYPoints(chartInstance, dataList)
					var errPixel = maxPixel - yPixel[i]
					errList.push(errPixel)
				}
		} else {errList = 0}
		//console.log(errors)
		return errList
	},

	calcErrorbars: function(chartInstance, ds_num){
		var ds = this.calcData(chartInstance)
		var data_list = ds[ds_num].data
		var errors = ds[ds_num].errors
		var isHidden = ds[ds_num]._meta[Object.keys(chartInstance.data.datasets[ds_num]._meta)[0]].hidden;
		var yList = this.calcYPoints(chartInstance, data_list)
		var xList = this.calcXPoints(chartInstance, data_list)
		var errList = this.calcYErrors(chartInstance, data_list, errors)

		return [xList, yList, errList, isHidden]
	},

	formatErrorbars: function(chartInstance, ds_num){
		var ds = this.calcData(chartInstance);
		var ctx = this.calcContext(chartInstance)
		var showErrors = ds[ds_num].showErrors
		var errColor = ds[ds_num].errColor
		var errWidth = ds[ds_num].errWidth
		var capLen = ds[ds_num].capLen
		var showCap = ds[ds_num].showCap
		var errShape = ds[ds_num].errShape

		if(errColor == "border"){
   			errColor = ds[ds_num].borderColor
		} else if(typeof(errColor) === "string"){
				errColor = errColor
		} else errColor = "rgba(169,169,169, 1)"

		if(errWidth == "border"){
			 errWidth = ds[ds_num].borderWidth
	 	} else if(typeof(errColor) === "number"){
				 errWidth = errWidth
		} else errWidth = 1

		if(capLen == "border"){
			 capLen = ds[ds_num].borderWidth
		} else if(typeof(capLen) === "number"){
				 capLen = capLen
		} else capLen = 3

		if(showCap === false){
			showCap = false
		} else {showCap = true}

		if(showErrors === false){
			showErrors = false
		} else if(showErrors === true || errColor || showCap)
			showErrors = true

		if(["circle", "oval", "ellipse",].includes(errShape)){
			 errShape = "oval"
		} else errShape = "T"


		return {showErrors: showErrors,
				errColor:errColor,
				errWidth:errWidth,
				errShape:errShape,
				showCap:showCap,
				capLen:capLen,
				}
	},

	sleep: function(milliseconds) {
  		var start = new Date().getTime();
  		for (var i = 0; i < 1e7; i++) {
  	  		if ((new Date().getTime() - start) > milliseconds){
  				break;
  	  		}
  		}
    },

	drawErrorbars: function(chartInstance){
		var ctx = this.calcContext(chartInstance)
		var ds = this.calcData(chartInstance)
		var animSet = chartInstance.chart.options.animation.duration

		for(var ds_num = 0; ds_num < ds.length; ds_num++){
			var errCalc = this.calcErrorbars(chartInstance, ds_num)
			var errForm = this.formatErrorbars(chartInstance, ds_num)

			var isHidden = errCalc[3]
			var yList = errCalc[1]
			var xList = errCalc[0]
			var errList = errCalc[2]
			var showErrors = errForm.showErrors
			var errColor = errForm.errColor
			var errWidth = errForm.errWidth
			var showCap = errForm.showCap
			var capLen = errForm.capLen
			var errShape = errForm.errShape

			if(!isHidden && showErrors == true){
				for(var k = 0; k < xList.length; k++){
					ctx.strokeStyle = errColor
					ctx.lineWidth = errWidth
					ctx.fillStyle = "rgba(1,1,1,0)";

					//for(i = 0; i < 100; i++){
					//	ctx.strokeStyle = "rgba(0,0,0," + i/100 + ")"
						if (errShape == "T"){
							ctx.beginPath();
							ctx.moveTo(xList[k], yList[k]-errList[k]);
							ctx.lineTo(xList[k], yList[k]+errList[k]);
							ctx.stroke()
							if(showCap){
								ctx.beginPath();
								ctx.moveTo(xList[k]-capLen, yList[k]+errList[k]);
								ctx.lineTo(xList[k]+capLen, yList[k]+errList[k]);
								ctx.moveTo(xList[k]-capLen, yList[k]-errList[k]);
								ctx.lineTo(xList[k]+capLen, yList[k]-errList[k]);
								ctx.stroke()
							}
						} else
						if (errShape == "circle"){
							ctx.beginPath();
							ctx.arc(xList[k], yList[k], errList[k], 0, 2 * Math.PI, false);
      						ctx.fill();
      						ctx.stroke();
						} else
						if (errShape == "oval"){
							var scaleFac = 10/errList[k]
							ctx.beginPath();
							ctx.save()
							ctx.scale(scaleFac, 1);
							ctx.arc(xList[k]/scaleFac, yList[k], errList[k], 0, 2 * Math.PI, false);
							ctx.restore()
      						ctx.fill();
      						ctx.stroke();

						}
					//}
				}
			}
		}
	},

	afterDraw: function(chartInstance) {
		var type = chartInstance.chart.config.type
		if(["line", "scatter"].includes(type)){  //if(type == "line" || type == "scatter"){
			this.drawErrorbars(chartInstance)
		} else
		if (type == "bar"){
			console.log("Bar charts not supported yet")
		}
	},
}
//Chart.pluginService.register(errorbarPlugin);
