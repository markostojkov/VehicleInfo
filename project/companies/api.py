from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from companies.models import Company
from companies.serializers import CompanySerializer
from accounts.models import User
from accounts.serializers import RegisterUserSerializer, UserSerializer


class CompanyViewSet(viewsets.ModelViewSet):

	serializer_class = CompanySerializer
	permission_classes = [
		permissions.IsAuthenticated
	]
	queryset = None

	#GETS LOGGED IN USER OBJECT
	def get_object(self):
		return Company.objects.get(user=self.request.user)

	#THIS METHOD ALLOWS USERS TO BE ADDED TO THIS COMPANY
	def create(self, request, *args, **kwargs):
		company = self.get_object()
		userSerializer = RegisterUserSerializer(data=request.data)
		userSerializer.is_valid(raise_exception=True)
		user = userSerializer.save()
		user.company = company
		user.save()
		return Response(userSerializer.data, status=status.HTTP_200_OK)

	#THIS METHOD UPDATES COMPANY DATA PARTIALLY/FULL
	def update(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = self.get_serializer(instance, data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data)


class CompanyUsersViewSet(viewsets.ModelViewSet):

	serializer_class = UserSerializer
	permission_classes = [
		permissions.IsAuthenticated
	]

	def get_queryset(self):
		return User.objects.filter(company=self.request.user.company)