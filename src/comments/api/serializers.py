from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField

from comments.models import Comment

#comment_detail_url = HyperlinkedIdentityField(view_name = 'comments-api:thread', lookup_field = 'id',)

class CommentSerializer(ModelSerializer):
	#url = comment_detail_url
	user = SerializerMethodField()
	reply_count = SerializerMethodField()
	class Meta:
		model = Comment
		fields = [
					'content_type',
					'object_id',
					#'url',
					'parent',
					'id',
					'content',
					'user',
					'reply_count',
								]
	def get_user(self, obj):
		return str(obj.user.username)

	def get_reply_count(self, obj):
		if obj.is_parent:
			return obj.children().count()
		return 0

class CommentChildSerializer(ModelSerializer):
	#url = comment_detail_url
	class Meta:
		model = Comment
		fields = [
					'id',
					#'url',
					'content',
					'timestamp',
								]

class CommentDetailSerializer(ModelSerializer):
	#url = comment_detail_url
	user = SerializerMethodField()
	replies = SerializerMethodField()
	class Meta:
		model = Comment
		fields = [
					#'url',
					'id',
					'object_id',
					'content',
					'content_type',
					'replies',
					'user',
								]
	def get_user(self, obj):
		return str(obj.user.username)

	def get_replies(self, obj):
		if obj.is_parent:
			return CommentChildSerializer(obj.children(), many=True).data
		return None
