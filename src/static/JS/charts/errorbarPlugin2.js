var errorbarPlugin = {

	calcContext: function(chartInstance){
		var ctx = chartInstance.chart.ctx
		return ctx
	},

	calcData: function(chartInstance){
		var ds = chartInstance.data.datasets
		return ds
	},

	calcXPoints: function(chartInstance){
		var ds = this.calcData(chartInstance)
		var xScale = chartInstance.scales['x-axis-0'];
		var xList = []

		for(var ds_num = 0; ds_num < ds.length; ds_num++){
			var data_list = ds[ds_num].data

			for(var i = 0; i < data_list.length; i++){
				var xValue = data_list[i].x
				var xPixel = xScale.getPixelForValue(xValue)
				xList.push(xPixel)
			}
		}
		return xList
	},

	calcYPoints: function(chartInstance, dataList){
		var ds = this.calcData(chartInstance)
		var yScale = chartInstance.scales['y-axis-0'];
		var yList = []

			for(var i = 0; i < data_list.length; i++){
				var yValue = data_list[i].y
				var yPixel = yScale.getPixelForValue(yValue)
				yList.push(yPixel)
			}

		return yList
	},

	calcErrors: function(chartInstance){
		var ds = this.calcData(chartInstance)
		var errors = []
		for(var ds_num = 0; ds_num < ds.length; ds_num++){
			if(ds[ds_num].errors){
				var err = ds[ds_num].errors
				errors = errors.concat(err)
			} else {errors = 0}
		}
		return errors
	},

	calcErrorbars: function(chartInstance){
		var ds = this.calcData(chartInstance);
		var ctx = this.calcContext(chartInstance)
		var showErrors = true
		var errColor
		var errWidth
		var errStyle = "rgba(169,169,169, 1)"; // default gray
		var errWidthDef = 2 //default line width

		if(errColor){
	   		ctx.strokeStyle = ds[ds_num].borderColor
		} else {ctx.strokeStyle = errStyle};

		if(errWidth){
		  	ctx.lineWidth = ds[ds_num].borderWidth
		} else {ctx.lineWidth = errWidthDef};

	},

	sleep: function(milliseconds) {
  		var start = new Date().getTime();
  		for (var i = 0; i < 1e7; i++) {
  	  		if ((new Date().getTime() - start) > milliseconds){
  				break;
  	  		}
  		}
    },

	drawErrorbars: function(chartInstance, showCap, capLen){
		this.calcErrorbars(chartInstance)
		var ctx = this.calcContext(chartInstance)
		var xList = this.calcXPoints(chartInstance)

		var errors = this.calcErrors(chartInstance)
		var ds = this.calcData(chartInstance)
		var showCap = true
		var capLen = 3

		for(var ds_num = 0; ds_num < ds.length; ds_num++){
			var data_list = ds[ds_num].data
			var isHiddenMeta = ds[ds_num]._meta[Object.keys(chartInstance.data.datasets[ds_num]._meta)[0]].hidden;
			var yList = this.calcYPoints(chartInstance, data_list)


			ctx.lineWidth = 3
			ctx.strokeStyle = "rgba(0, 0, 0, 1)" //+ 1 + ")"

		for(var k = 0; k < xList.length; k++){
			ctx.beginPath();
			ctx.moveTo(xList[k], yList[k]-errors[k]);
			ctx.lineTo(xList[k], yList[k]+errors[k]);

			if(showCap){
				ctx.moveTo(xList[k]-capLen, yList[k]+errors[k]);
				ctx.lineTo(xList[k]+capLen, yList[k]+errors[k]);
				ctx.moveTo(xList[k]-capLen, yList[k]-errors[k]);
				ctx.lineTo(xList[k]+capLen, yList[k]-errors[k]);
			}
			ctx.stroke()
		}
		}
	},

	afterRender: function(chartInstance) {
		var ctx = this.calcContext(chartInstance)
		var ds = this.calcData(chartInstance)

		var showErrors = true  // make function listen to button event
		var showCap = true
		var capLen = 3
		var errColor = true
		var errStyle = "rgba(169,169,169, 1)"; // default gray
		var errWidth = true
		var errWidthDef = 2 //default line width

		var xList = this.calcXPoints(chartInstance)
		var yList = this.calcYPoints(chartInstance)
		var errors = this.calcErrors(chartInstance)

		this.drawErrorbars(chartInstance)
	},

}
//Chart.pluginService.register(errorbarPlugin);
// for(var ds_num = 0; ds_num < ds.length; ds_num++){
// 	var isHiddenMeta = ds[ds_num]._meta[Object.keys(chartInstance.data.datasets[ds_num]._meta)[0]].hidden;
//
// 	if (!isHiddenMeta && showErrors) {  //if data not hidden AND show error button clicked
