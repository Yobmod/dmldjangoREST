from rest_framework.serializers import (ModelSerializer,
										HyperlinkedIdentityField,
										SerializerMethodField,
										ValidationError,
										EmailField,
										CharField,
										)
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q


User = get_user_model()

class UserCreateSerializer(ModelSerializer):
	email = EmailField(label='E-mail')
	email2 = EmailField(label='Confirm E-mail')
	class Meta:
		model = User
		fields = [
					'username',
					'password',
					'email',
					'email2',
								]
		extra_kwargs = {"password":	{"write_only":True}	}

	def create(self, validated_data):
		username = validated_data['username']
		email = validated_data['email']
		password = validated_data['password']
		user_obj = User(username = username, email = email, )
		user_obj.set_password(password)
		user_obj.save()
		return validated_data

	def validate_email(self, value):
		data = self.get_initial()
		email1 = value
		email2 = data.get('email2')
		if email1 != email2:
			raise ValidationError("E-mails must match. Please try again.")

		user_qs = User.objects.filter(email=email1)
		if user_qs.exists():
			raise ValidationError("This e-mail has already been used.")
		return value

	def validate_email2(self, value):
		data = self.get_initial()
		email2 = value
		email1 = data.get('email')
		if email1 != email2:
			raise ValidationError("E-mails must match. Please try again.")
		return value

	def validate_password(self, value):
		data = self.get_initial()
		password = data.get('password')
		if len(str(password)) < 6:
			raise ValidationError("Password must be at least 6 letters long.")
		if not any(char.isdigit() for char in str(password)):
			raise ValidationError("Password must contain letters and numbers.")
		if all(char.isdigit() for char in str(password)):
			raise ValidationError("Password must contain letters and numbers.")
		return value

class UserLoginSerializer(ModelSerializer):
	token = CharField(allow_blank=True, read_only=True)
	username = CharField(allow_blank=True, required=False)
	email = EmailField(label='E-mail', allow_blank=True, required=False)
	class Meta:
		model = User
		fields = [
					'username',
					'password',
					'email',
					'token',
								]
		extra_kwargs = {"password":	{"write_only":True}	}

	def validate(self, data):
		user_obj = None
		email = data.get("email", None)
		username = data.get("username", None)
		username = data["username"]
		if not email and not username:
			raise ValidationError("Either username or e-mail address is required to login.")
		user = User.objects.filter(
									Q(email=email) |    # or
									Q(username=username)
														).distinct()
		user = user.exclude(email__isnull=True).exclude(email__iexact="")
		if user.exists() and user.count() == 1:
			user_obj = user.first()
		else:
			raise ValidationError("This username / email is not valid.")
		if user_obj:
			if not user_obj.check_password(password):
				raise ValidationError("Password is incorrect, please try again.")
		data["token"] = 34543342
		return data

class UserDetailSerializer(ModelSerializer):
	#url = user_detail_url
	class Meta:
		model = User
		fields = [
					'username',
					'email',
					'first_name',
					'last_name',
								]
