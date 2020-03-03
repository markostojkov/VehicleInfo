from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from repairs.models import Repair, RepairShop
from repairs.serializers import RepairSerializer, RepairShopSerializer, RepairOnlySerializer
from vehicles.models import Vehicle
from core.pagination import CustomPagination


class RepairViewSet(viewsets.ModelViewSet):
	serializer_class = RepairSerializer
	permission_classes = [
		permissions.IsAuthenticated
	]

	def create(self, request):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		repair = self.perform_create(serializer, id_=request.data['shop_id'])
		Vehicle.objects.get(id=request.data['id']).repairs.add(repair)
		return Response(serializer.data)

	def perform_create(self, serializer, **kwargs):
		shop = RepairShop.objects.get(id=kwargs['id_'])
		return serializer.save(shop=shop)


class RepairShopsViewSet(viewsets.ModelViewSet):
	serializer_class = RepairShopSerializer
	permission_classes = [
		permissions.IsAuthenticated
	]
	pagination_class = CustomPagination

	def retrieve(self, request, **kwargs):
		obj = self.get_object()
		serializer = self.get_serializer(instance=obj)
		repair_qs = Repair.objects.filter(shop=obj)
		repairs = RepairOnlySerializer(repair_qs, many=True)
		response = {
			'repairShop': serializer.data,
			'repairs': repairs.data
		}
		return Response(response)

	def get_queryset(self):
		return RepairShop.objects.filter(company=self.request.user.company)

	def perform_create(self, serializer):
		serializer.save(company=self.request.user.company)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_all_repairs(request):
	repair_shops = RepairShop.objects.filter(company=request.user.company)
	serializer = RepairShopSerializer(repair_shops, many=True)
	return Response(serializer.data)