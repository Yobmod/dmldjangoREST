var errorbarPlugin = {

	// beforeInit: function(chartInstance){
	// 	var ctx = chartInstance.chart.ctx
	// 	return ctx
	// },

	calcContext: function(chartInstance){
		var ctx = chartInstance.chart.ctx
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
		var showErrors = true;
		var errColor = "border";
		var errWidth = true;

		if(errColor == "border"){
   			errColor = ds[ds_num].borderColor
		} else if(typeof(errColor) === "string"){
				errColor = errColor
		} else errColor = "rgba(169,169,169, 1)"

		if(errWidth){
			 errWidth = ds[ds_num].borderWidth
		} else errWidth = 1

		return {errColor:errColor, errWidth:errWidth}
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
		var ctx = this.calcContext(chartInstance)
		var ds = this.calcData(chartInstance)
		var showCap = true
		var capLen = 3
		var showErrors = true  // make function listen to button event
		ctx.lineWidth = 2
		ctx.strokeStyle = "rgba(0, 0, 0, 1)" //+ 1 + ")"

		for(var ds_num = 0; ds_num < ds.length; ds_num++){
			var isHidden = this.calcErrorbars(chartInstance, ds_num)[3]
			var yList = this.calcErrorbars(chartInstance, ds_num)[1]
			var xList = this.calcErrorbars(chartInstance, ds_num)[0]
			var errors = this.calcErrorbars(chartInstance, ds_num)[2]
			var errColor = this.formatErrorbars(chartInstance, ds_num).errColor

			if(!isHidden && showErrors == true){
				for(var k = 0; k < xList.length; k++){
					ctx.beginPath();
					ctx.strokeStyle = errColor
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
		}
	},

	afterRender: function(chartInstance) {
		this.drawErrorbars(chartInstance)
	},

}
//Chart.pluginService.register(errorbarPlugin);
// for(var ds_num = 0; ds_num < ds.length; ds_num++){
// 	var isHiddenMeta = ds[ds_num]._meta[Object.keys(chartInstance.data.datasets[ds_num]._meta)[0]].hidden;
//
// 	if (!isHiddenMeta && showErrors) {  //if data not hidden AND show error button clicked
