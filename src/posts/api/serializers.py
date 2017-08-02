from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField
#from django.shortcuts import render
from posts.models import Post
from comments.models import Comment
from comments.api.serializers import CommentSerializer

post_detail_url = HyperlinkedIdentityField(view_name = 'posts-api:detail', lookup_field = 'slug',)# context={'request':request})
post_update_url = HyperlinkedIdentityField(view_name = 'posts-api:update', lookup_field = 'slug',)
post_delete_url = HyperlinkedIdentityField(view_name = 'posts-api:delete', lookup_field = 'slug',)

class PostListSerializer(ModelSerializer):
	url = post_detail_url
	user = SerializerMethodField()
	comment_count = SerializerMethodField()
	class Meta:
		model = Post
		fields = [
					'title',
					#'slug',
					'url',
					'content',
					'publish',
					#'id',
					'user',
					'comment_count',
								]
	def get_user(self, obj):
		return str(obj.user.username)

	def get_comment_count(self, obj):
		comment_queryset = Comment.objects.filter_by_instance(obj)
		parent_comment_count = comment_queryset.count()
		reply_count = 0
		for comment in comment_queryset:
			if comment.is_parent:
				reply_count += comment.children().count()
			else:
				reply_count += 2
				return reply_count
		comment_count = parent_comment_count + reply_count
		return comment_count

class PostDetailSerializer(ModelSerializer):
	url = post_detail_url
	update_url = post_update_url
	delete_url = post_delete_url
	user = SerializerMethodField()
	image = SerializerMethodField()
	html = SerializerMethodField()
	comments = SerializerMethodField()

	class Meta:
		model = Post
		fields = [
					'title',
					'slug',
					'url',
					'update_url',
					'delete_url',
					'image',
					'content',
					'html',
					'publish',
					'user',
					'comments',
					#'id',
									]

	def get_user(self, obj):
		return str(obj.user.username)

	def get_html(self, obj):
		return obj.get_markdown()	#defined in models

	def get_image(self, obj):
		try:
			image = obj.image.url
		except:
			image = None
		return image

	def get_comments(self, obj):
		#content_type = obj.get_content_type
		#object_id = obj.id
		comment_queryset = Comment.objects.filter_by_instance(obj)
		comments = CommentSerializer(comment_queryset, many=True).data
		return comments

class PostCreateUpdateSerializer(ModelSerializer):
	class Meta:
		model = Post
		fields = [
					'title',
					'content',
					'publish',
									]
