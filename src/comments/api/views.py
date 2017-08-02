from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, CreateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
#from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

from django.db.models import Q

from comments.models import Comment
from posts.api.pagination import PostLimitOffsetPagination, PostPageNumberPagination
from posts.api.permissions import IsOwnerOrReadOnly
from .serializers import CommentSerializer, CommentDetailSerializer, CommentChildSerializer

class CommentListAPIView(ListAPIView):
	serializer_class = CommentSerializer
	permission_classes = [AllowAny]
	filter_backends = [SearchFilter, OrderingFilter]
	search_fields = ['parent', 'content', 'user__first_name' ]
	pagination_class = PostPageNumberPagination

	def get_queryset(self, *args, **kwargs):
		queryset_list = Comment.objects.all()
		query = self.request.GET.get("q")
		if query:
			queryset_list = queryset_list.filter(
				Q(content__icontains=query)|
				Q(user__first_name__icontains=query) |
				Q(user__last_name__icontains=query)
				).distinct()
		return queryset_list

class CommentDetailAPIView(RetrieveAPIView):
		queryset = Comment.objects.all()
		serializer_class = CommentDetailSerializer
		permission_classes = [AllowAny]
		lookup_field = 'id'
		#lookup_url_kwarg = "zzz"
#
# class CommentUpdateAPIView(RetrieveUpdateAPIView):
# 		queryset = Comment.objects.all()
# 		serializer_class = PostCreateUpdateSerializer
# 		permission_classes = [IsOwnerOrReadOnly, IsAdminUser]
# 		lookup_field = 'slug'
#
# 		def perform_update(self, serializer):
# 			#serializer.save(editor=self.request.user)   if had editor model
# 			pass
#
# class CommentCreateAPIView(CreateAPIView):
# 		queryset = Comment.objects.all()
# 		serializer_class = PostCreateUpdateSerializer
# 		permission_classes = [IsAuthenticated, IsAdminUser]
#
# 		def perform_create(self, serializer):
# 			serializer.save(user=self.request.user)
#
# class CommentDeleteAPIView(DestroyAPIView):
# 		queryset = Comment.objects.all()
# 		serializer_class = PostDetailSerializer
# 		permission_classes = [IsOwnerOrReadOnly, IsAdminUser]
# 		lookup_field = 'slug'
