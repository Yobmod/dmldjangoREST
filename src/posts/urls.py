from django.conf.urls import url
from django.contrib import admin

from .views import (
	post_list,
	post_create,
	post_detail,
	post_update,
	post_delete_req,
	post_delete_confirm,
	)

app_name = 'posts'
urlpatterns = [
	url(r'^$', post_list, name='list'),
    url(r'^create/$', post_create),
    url(r'^(?P<slug>[\w-]+)/$', post_detail, name='detail'),
    url(r'^(?P<slug>[\w-]+)/edit/$', post_update, name='update'),
    url(r'^(?P<slug>[\w-]+)/delete/$', post_delete_req, name='delete'),
	url(r'^(?P<slug>[\w-]+)/delete/confirm/$', post_delete_confirm, name='delete_confirm'),
    #url(r'^posts/$', "<appname>.views.<function_name>"),
]
