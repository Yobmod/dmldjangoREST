from django.shortcuts import render

def trials_home(request):
	return render(request, 'trials/trials_main.html')

def deck_slidesOne(request):
	return render(request, 'slides1/deck_slidesOne.html')

def reveal_slides(request):
	return render(request, 'reveal/reveal_slides.html')

def reveal_demo(request):
	return render(request, 'reveal/index.html')

def brython(request):
    return render(request, 'trials/brython.html')

def particles(request):
    return render(request, 'trials/particles_main.html')

def progressbar(request):
    return render(request, 'trials/progressbar.html')
