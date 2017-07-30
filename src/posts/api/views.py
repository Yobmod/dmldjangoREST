from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, CreateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly

from posts.models import Post
from .serializers import PostListSerializer, PostDetailSerializer, PostCreateUpdateSerializer

class PostListAPIView(ListAPIView):
	queryset = Post.objects.all()
	serializer_class = PostListSerializer
	permission_classes = [AllowAny]
	#def get_queryset():
		#pass

class PostDetailAPIView(RetrieveAPIView):
		queryset = Post.objects.all()
		serializer_class = PostDetailSerializer
		permission_classes = [AllowAny]
		lookup_field = 'slug'

class PostUpdateAPIView(RetrieveUpdateAPIView):
		queryset = Post.objects.all()
		serializer_class = PostCreateUpdateSerializer
		permission_classes = [IsOwnerOrReadOnly, IsAdminUser]
		lookup_field = 'slug'

		def perform_update(self, serializer):
			#serializer.save(editor=self.request.user)   if had editor model
			pass

class PostCreateAPIView(CreateAPIView):
		queryset = Post.objects.all()
		serializer_class = PostCreateUpdateSerializer
		permission_classes = [IsAuthenticated, IsAdminUser]

		def perform_create(self, serializer):
			serializer.save(user=self.request.user)

class PostDeleteAPIView(DestroyAPIView):
		queryset = Post.objects.all()
		serializer_class = PostDetailSerializer
		permission_classes = [IsOwnerOrReadOnly, IsAdminUser]
		lookup_field = 'slug'
