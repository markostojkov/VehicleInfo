from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from vehicles.models import Vehicle
from vehicles.serializers import VehicleSerializer, VehicleListSerializer, VehicleDetailSerializer
from core.pagination import CustomPagination

class VehicleViewSet(viewsets.ModelViewSet):
	serializer_class = VehicleSerializer
	permission_classes = [
		permissions.IsAuthenticated
	]
	pagination_class = CustomPagination
	action_serializers = {
        'retrieve': VehicleDetailSerializer,
        'update': VehicleDetailSerializer,
        'list': VehicleListSerializer,
    }

	def create(self, request):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		data = VehicleListSerializer(serializer.data).data
		return Response(data)

	def get_queryset(self):
		return Vehicle.objects.filter(company=self.request.user.company)

	def perform_create(self, serializer):
		serializer.save(company=self.request.user.company)

	def get_serializer_class(self):
		if hasattr(self, 'action_serializers'):
			return self.action_serializers.get(self.action, self.serializer_class)
		return super(VehicleViewSet, self).get_serializer_class()
