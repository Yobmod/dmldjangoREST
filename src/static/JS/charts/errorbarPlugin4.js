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
		return yList
	},

	calcErrorbars: function(chartInstance, ds_num){
		var ds = this.calcData(chartInstance)
			var data_list = ds[ds_num].data
			var isHidden = ds[ds_num]._meta[Object.keys(chartInstance.data.datasets[ds_num]._meta)[0]].hidden;
			var yList = this.calcYPoints(chartInstance, data_list)
			var xList = this.calcXPoints(chartInstance, data_list)
			if(ds[ds_num].errors){
				var errors = ds[ds_num].errors
			} else {errors = 0}
		return [xList, yList, errors, isHidden]
	},

	formatErrorbars: function(chartInstance, ds_num){
		var ds = this.calcData(chartInstance);
		var ctx = this.calcContext(chartInstance)
		var showErrors = ds[ds_num].showErrors
		var errColor = ds[ds_num].errColor
		var errWidth = ds[ds_num].errWidth
		var capLen = ds[ds_num].capLen
		var showCap = ds[ds_num].showCap

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

		return {showErrors: showErrors,
				errColor:errColor,
				errWidth:errWidth,
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
			var errors = errCalc[2]
			var showErrors = errForm.showErrors
			var errColor = errForm.errColor
			var errWidth = errForm.errWidth
			var showCap = errForm.showCap
			var capLen = errForm.capLen

			if(!isHidden && showErrors == true){
				for(var k = 0; k < xList.length; k++){
					ctx.strokeStyle = errColor
					//for(i = 0; i < 100; i++){
					//	ctx.strokeStyle = "rgba(0,0,0," + i/100 + ")"
						ctx.beginPath();
						ctx.moveTo(xList[k], yList[k]-errors[k]);
						ctx.lineTo(xList[k], yList[k]+errors[k]);
						ctx.stroke()
					//}

					if(showCap){
						ctx.beginPath();
						ctx.moveTo(xList[k]-capLen, yList[k]+errors[k]);
						ctx.lineTo(xList[k]+capLen, yList[k]+errors[k]);
						ctx.moveTo(xList[k]-capLen, yList[k]-errors[k]);
						ctx.lineTo(xList[k]+capLen, yList[k]-errors[k]);
						ctx.stroke()
					}
				}
			}
		}
	},

	afterDraw: function(chartInstance) {
		var type = chartInstance.chart.config.type
		if(type == "line" || type == "scatter"){
			this.drawErrorbars(chartInstance)
		}
	 },
}
//Chart.pluginService.register(errorbarPlugin);
