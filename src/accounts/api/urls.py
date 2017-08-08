from django.conf.urls import url
from django.contrib import admin

from .views import (
	UserCreateAPIView,
	UserLoginAPIView,
	)

app_name = 'accounts-api'
urlpatterns = [
	#url(r'^$', PostListAPIView.as_view(), name='list'),
    url(r'^register/$', UserCreateAPIView.as_view(), name='register'),
	url(r'^login/$', UserLoginAPIView.as_view(), name='login'),
    #url(r'^(?P<slug>[\w-]+)/$', PostDetailAPIView.as_view(), name='detail'),
    #url(r'^(?P<slug>[\w-]+)/edit/$', PostUpdateAPIView.as_view(), name='update'),
    #url(r'^(?P<slug>[\w-]+)/delete/$', PostDeleteAPIView.as_view(), name='delete'),
]
