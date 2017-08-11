from django.conf.urls import url

from . import views

app_name = 'trials'
urlpatterns = [
	url(r'^$', views.trials_home, name='home'),

	url(r'^brython/$', views.brython, name='brython'),

	url(r'^deck_slides1/$', views.deck_slidesOne, name='deck_slidesOne'),
	url(r'^particles/$', views.particles, name='particles'),
	url(r'^progressbar/$', views.progressbar, name='progressbar'),
	]