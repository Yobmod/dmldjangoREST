from django.conf.urls import url

from . import views

app_name = 'trials'
urlpatterns = [
	url(r'^$', views.trials_home, name='home'),

	url(r'^brython/$', views.brython, name='brython'),

	url(r'^deck_slides1/$', views.deck_slidesOne, name='deck_slidesOne'),
	url(r'^reveal_slides/$', views.reveal_slides, name='reveal_slides'),
	url(r'^reveal_demo/$', views.reveal_demo, name='reveal_demo'),
	url(r'^distinctive_slides/$', views.distinctive_slides, name='distinctive_slides'),

	url(r'^particles/$', views.particles, name='particles'),
	url(r'^progressbar/$', views.progressbar, name='progressbar'),
	]
