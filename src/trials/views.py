from django.shortcuts import render

def trials_home(request):
	return render(request, 'trials/trials_main.html')

def deck_slidesOne(request):
	return render(request, 'slides1/deck_slidesOne.html')

def brython(request):
    return render(request, 'trials/brython.html')

def particles(request):
    return render(request, 'trials/particles_main.html')

def progressbar(request):
    return render(request, 'trials/progressbar.html')
