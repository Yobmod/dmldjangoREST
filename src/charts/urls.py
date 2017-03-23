"""charts URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
	https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
	1. Add an import:  from my_app import views
	2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
	1. Add an import:  from other_app.views import Home
	2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
	1. Import the include() function: from django.conf.urls import url, include
	2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url


from .views import (HomeView, #get_data,
					ChartView, ChartData,
					ChartViewTwo, ChartDataTwo,
					ChartViewLine, ChartDataLineOne, ChartDataLineTwo,
					)


urlpatterns = [
	url(r'^$', HomeView.as_view(), name='home'),
#	url(r'^api/data/$', get_data, name='api-data'), in html can use <url-endpoint="{url 'api-data'}">
	url(r'^api/chart/data/$', ChartData.as_view()),

	url(r'^chart1/$', ChartView.as_view(), name='chart1'),
	url(r'^api/chart1/data/$', ChartData.as_view()),

	url(r'^chart2/$', ChartViewTwo.as_view(), name='chart2'),
	url(r'^api/chart2/data/$', ChartDataTwo.as_view()),

	url(r'^chart_line/$', ChartViewLine.as_view(), name='chart_line'),
	url(r'^api/chart_line1/data/$', ChartDataLineOne.as_view(), name='chart_line_data1'),
	url(r'^api/chart_line2/data/$', ChartDataLineTwo.as_view(), name='chart_line_data2'),

	url(r'^chart_Bars_Radar/$', ChartViewTwo.as_view(), name='chart_Bars_Radar'),
	url(r'^chart_Pi_Donut_Polar/$', ChartViewTwo.as_view(), name='chart_Pi_Donut_Polar'),
	url(r'^chart_scatter_bubble/$', ChartViewTwo.as_view(), name='chart_scatter_bubble'),
	url(r'^chart_scatter_bubble/$', ChartViewTwo.as_view(), name='chart_scatter_bubble'),
	url(r'^chart_humidity/$', ChartViewTwo.as_view(), name='chart_humidity'),
	url(r'^chart_temparature/$', ChartViewTwo.as_view(), name='chart_temparature'),

	]
