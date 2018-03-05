from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.generic import View

from rest_framework.views import APIView
from rest_framework.response import Response

from typing import Any, List, Optional, Dict, Union


User = get_user_model()


class HomeView(View):   # use context in html js tags
	def get(self, request, *args, **kwargs):
		data = {"customers": User.objects.all().count(), }  # can use database info as the data
		context = {'data': data}
		return render(request, 'charts/charts_main.html', context)

# def get_data(request, *args, **kwargs): #data is url, js on page finds it there
# 	data = {
# 		"sales": 100,
# 		"customers": 10,
# 	}
# 	return JsonResponse(data) # http response


class ChartView(View):   # use context in html js tags
	def get(self, request, *args, **kwargs):
		return render(request, 'charts/charts.html')


class ChartData(APIView):
	authentication_classes = []
	permission_classes = []

	def get(self, request, format=None):
		qs_count = User.objects.all().count()
		labels = ["Users", "Blue", "Yellow", "Green", "Purple", "Orange"]  # x values
		default_items = [qs_count, 23, 2, 3, 12, 2]							# y values
		colour_background = [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
			'rgba(255, 159, 64, 0.2)'
		]
		colour_border = [
			'rgba(255,99,232,100)',
			'rgba(54, 162, 235, 1)',
			'rgba(255, 206, 86, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
			'rgba(255, 159, 64, 1)'
		]
		data = {
			"labels": labels,				# API veiw, data json object, access by data.key
			"default": default_items,
			"colour_background": colour_background,
			"colour_border": colour_border, }
		return Response(data)


class ChartViewTwo(View):   # use context in html js tags
	def get(self, request, *args, **kwargs):
		return render(request, 'charts/charts2.html')


class ChartDataTwo(APIView):
	authentication_classes = []
	permission_classes = []

	def get(self, request, format=None):
		qs_count = User.objects.all().count()
		labels = ["Users", "Blue", "Yellow", "Green", "Purple", "Orange"]
		default_items = [qs_count, 23, 2, 3, 12, 2]
		data = {
			"labels": labels,
			"default": default_items, }
		return Response(data)


class ChartViewLine(View):   # use context in html js tags
	def get(self, request, *args, **kwargs):
		return render(request, 'charts/charts_line.html')


class ChartDataLineOne(APIView):
	authentication_classes = []
	permission_classes = []

	def get(self, request, format=None):
		labels = [0, 1, 2, 3, 4, 5]
		line1 = [89, 43, 2, 3, 22, 2]
		line2 = [9, 3, 12, 43, 112, 32]
		data = {
			"labels": labels,
			"line1": line1,
			"line2": line2, }
		return Response(data)


# from rest_framework.views import RetrieveAPIView
class ChartDataLineTwo(APIView):  # scatter takes list of dicts
	authentication_classes = []
	permission_classes = []

	def get(self, request, format=None):
		line1 = "[{x:-10, y:10}, {x:7, y:5}, {x:-3, y:7}, {x:-8, y:9}, {x:6, y:6}, {x:-5, y:8}]"
		line2 = "[{x:0, y:-10}, {x:7, y:2}, {x:-3, y:-7},{x:-5, y:-9}, {x:-15, y:-1}, {x:-1, y:-7}]"
		line3 = "[{x:-10, y:-10}, {x:-7, y:-2}, {x:-3, y:0},{x:5, y:9}, {x:15, y:1}, {x:16, y:7}]"

		data = {
			# "labels": labels,
			"line1": line1,
			"line2": line2,
			"line3": line3, }
		return Response(data)
		#  return JsonResponse(data)


class ChartViewBarFunnel(View):   # use context in html js tags
	def get(self, request, *args, **kwargs):
		return render(request, 'charts/chart_bar_funnel.html')


class ChartViewGamma(View):   # use context in html js tags
	def get(self, request, *args, **kwargs):
		return render(request, 'charts/chart_gamma.html')


class ChartDataGamma(APIView):
	authentication_classes = []
	permission_classes = []

	def get(self, request: HttpRequest, format: Any=None) -> JsonResponse:
		x = [2, 4, 6, 8, 10]  # x values
		y = [10, 20, 30, 40, 50]		# y values
		y_err = [1, 2, 3, 4, 5]
		clr_fill = ["red", "pink"]
		clr_bord = ["red", "pink"]
		pnt_size = [2]
		pnt_shape = "xxx"
		line1 = dict(zip(x, y))
		line1_d = "["
		for key, value in line1.items():
			coord = "{x: " + str(key) + ", y: " + str(value) + "}, "
			line1_d += coord

		line1_d += "]"

		line1_ld = []
		for key, value in line1.items():
			coord_d = {"x": key, "y": value}
			line1_ld.append(coord_d)

		data = {
			"x": x,				# API veiw, data json object, access by data.key
			"y": y,
			"y_err": y_err,
			"clr_fill": clr_fill,
			"clr_bord": clr_bord,
			"pnt_size": pnt_size,
			"pnt_shape": pnt_shape,
			"line1_d": line1_d,
			"line1_ld": line1_ld,
		}
		return Response(data)
