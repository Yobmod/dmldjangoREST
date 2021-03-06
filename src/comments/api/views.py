from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, CreateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import DestroyModelMixin, UpdateModelMixin

#from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

from django.db.models import Q

from comments.models import Comment
from posts.api.pagination import PostLimitOffsetPagination, PostPageNumberPagination
#from utilities.api.pagination import PostLimitOffsetPagination, PostPageNumberPagination
#from utilities.api.permissions import IsOwnerOrReadOnly
from posts.api.permissions import IsOwnerOrReadOnly
from .serializers import (CommentListSerializer, CommentDetailSerializer, CommentChildSerializer, create_comment_serializer, CommentEditSerializer,)

class CommentListAPIView(ListAPIView):
	serializer_class = CommentListSerializer
	permission_classes = [AllowAny]
	filter_backends = [SearchFilter, OrderingFilter]
	search_fields = ['parent', 'content', 'user__first_name']
	pagination_class = PostPageNumberPagination

	def get_queryset(self, *args, **kwargs):
		queryset_list = Comment.objects.filter(id__gte=0)
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
class CommentEditAPIView(DestroyModelMixin, UpdateModelMixin, RetrieveAPIView):
		queryset = Comment.objects.filter(id__gte=0)
		serializer_class = CommentEditSerializer
		permission_classes = [AllowAny]#, IsOwnerOrReadOnly, IsAdminUser]
		lookup_field = 'id'

		def put(self, request, *args, **kwargs):
			return self.update(request, *args, **kwargs)

		def delete(self, request, *args, **kwargs):
			return self.destroy(request, *args, **kwargs)

class CommentCreateAPIView(CreateAPIView):
		queryset = Comment.objects.all()
		permission_classes = [IsAuthenticated, IsAdminUser]

		def get_serializer_class(self):
			model_type = self.request.GET.get("type")
			slug = self.request.GET.get("slug")
			parent_id = self.request.GET.get("parent_id", None)
			return create_comment_serializer(model_type=model_type,
											slug=slug,
											parent_id=parent_id,
											user=self.request.user)
