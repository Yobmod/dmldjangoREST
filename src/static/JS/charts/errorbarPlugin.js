var errorbarPlugin = {

	afterRender: function(chartInstance) {

	    var ctx = chartInstance.chart.ctx
		console.log(ctx)
		// ctx.beginPath();
		// ctx.strokeStyle = "black";
		// ctx.lineWidth = 6;
		// ctx.moveTo(0, 0);
		// ctx.lineTo(400, 400);
		//
		// ctx.stroke();
		// //ctx.restore();

		var yValue;
		var yScale = chartInstance.scales['y-axis-0'];
		var yPixel;
		var xValue;
		var xScale = chartInstance.scales['x-axis-0'];
		var xPixel;

		var showErrors = true  // make function listen to button event
		var showCap = true
		var capLen = 3

		var errColor = true
		var errStyle = "rgba(169,169,169, 1)"; // default gray
		var errWidth = true
		var errWidthDef = 2 //default line width

		var ds = chartInstance.data.datasets
		// console.log(ds)
		for(var ds_num = 0; ds_num < ds.length; ds_num++){
			var data_list = ds[ds_num].data // list of x, y values for ds
			//console.log(ds[ds_num])
			if(ds[ds_num].errors){
			var errors = ds[ds_num].errors
			//console.log(err_list)
			} else {errors = 0}

			var isHiddenMeta = ds[ds_num]._meta[Object.keys(chartInstance.data.datasets[ds_num]._meta)[0]].hidden;

			for(var i = 0; i < data_list.length; i++){
				// console.log(data_list[i]) // x, y values
				yValue = data_list[i].y
				yPixel = yScale.getPixelForValue(yValue)

				xValue = data_list[i].x
				xPixel = xScale.getPixelForValue(xValue)

				if (!isHiddenMeta && showErrors) {  //if data not hidden AND show error button clicked
				   console.log(xPixel, yPixel)
				   if(errColor){
				   ctx.strokeStyle = ds[ds_num].borderColor
			   		} else ctx.strokeStyle = errStyle
				   if(errWidth){
					  ctx.lineWidth = ds[ds_num].borderWidth
				  } else ctx.lineWidth = errWidthDef;
				  var j = 500
				  //for(var j = 1; j <= 1000; j++){
					  // console.log(j)
				   ctx.beginPath();
				   ctx.moveTo(xPixel, yPixel+errors[i]);
				   ctx.lineTo(xPixel, yPixel-errors[i]);

				   if(showCap){
				   ctx.moveTo(xPixel-capLen, yPixel+errors[i]);
				   ctx.lineTo(xPixel+capLen, yPixel+errors[i]);
				   ctx.moveTo(xPixel-capLen, yPixel-errors[i]);
				   ctx.lineTo(xPixel+capLen, yPixel-errors[i]);
			   		}

					ctx.strokeStyle = "rgba(0, 0, 0, " + j/1000 + ")"
				   	ctx.stroke();
			   		//}
				}
			}


			//var meta = chartInstance.getDatasetMeta(ds_num)  //why 0? gets all of dataset
			//console.log(meta.data[ds_num]._model.y)	// list of data in datasets
			//console.log(meta.data[ds_num]._model) // list of pixels x, y + formatting (x y skip radius pointStyle borderColor ...)
			// for(var i = 0; i < meta.data.length ; i++) {
			// 	console.log(meta.data[ds_num]._model.y)
		// }
		}

	}
}
//Chart.pluginService.register(errorbarPlugin);
