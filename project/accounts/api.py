from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from accounts.serializers import UserSerializer, RegisterUserSerializer, LoginUserSerializer
from companies.models import Company


class UserAPI(generics.RetrieveAPIView):

	permission_classes = [permissions.IsAuthenticated]
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user

	def post(self, request):
		obj = self.get_object()
		serializer = self.get_serializer(instance=obj, data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data)


class RegisterAPI(generics.GenericAPIView):
	
	serializer_class = RegisterUserSerializer

	def post(self, request):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		company = Company.objects.create()
		user = serializer.save(company=company)
		return Response({
			'user': UserSerializer(user, context=self.get_serializer_context()).data,
			'token': AuthToken.objects.create(user)[1]
		})


class LoginAPI(generics.GenericAPIView):

	serializer_class = LoginUserSerializer

	def post(self, request):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data
		return Response({
			'user': UserSerializer(user, context=self.get_serializer_context()).data,
			'token': AuthToken.objects.create(user)[1]
		})