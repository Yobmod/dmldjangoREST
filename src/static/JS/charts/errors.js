var errorbarPlugin = {
  id: 'error-bars',

  afterDatasetDraw: function(chartInstance, chart, args) {
    var type = chartInstance.chart.options.type
    var moe = chartInstance.chart.options.plugins.errorBar.marginsOfError // [100, 19, 3, 5, 2, 3] //13 // chart.config.config.moe),
	console.log(moe)
    if( type !== "bar" ){
      return false;
    }

    var elements = args.meta.data || [];
    var ilen = elements.length;
    var i, el, label;

    if (moeIsArray && ilen !== moe.length) {
      console.error("The length of the MOE array must match the length of the data array");
      return false;
    }

    for (i = 0; i < ilen; ++i) {
      var el = elements[i],
          view = el._view,
          border = view.borderWidth;

      if( moeIsArray ) {
        elMoe = moe[i];
      } else {
        elMoe = moe;
      }

      drawVerticalErrorBars(chart, view, border, elMoe);
    }
  }
};

function drawVerticalErrorBars(chart, view, border, value) {

  leftX = view.x - 4,
  rightX = view.x + 4,
  bottomY = view.y + value + border,
  topY = view.y - value;

  chart.ctx.beginPath();
  chart.ctx.strokeStyle = '#000000';
  chart.ctx.moveTo(view.x, bottomY);
  chart.ctx.lineTo(view.x, view.y);
  chart.ctx.stroke();

  chart.ctx.beginPath();
  chart.ctx.strokeStyle = '#000000';
  chart.ctx.moveTo(view.x, topY);
  chart.ctx.lineTo(view.x, view.y);
  chart.ctx.stroke();

  chart.ctx.beginPath();
  chart.ctx.strokeStyle = '#000000';
  chart.ctx.moveTo(leftX, topY);
  chart.ctx.lineTo(rightX, topY);
  chart.ctx.stroke();

  chart.ctx.beginPath();
  chart.ctx.strokeStyle = '#000000';
  chart.ctx.moveTo(leftX, bottomY);
  chart.ctx.lineTo(rightX, bottomY);
  chart.ctx.stroke();
}
