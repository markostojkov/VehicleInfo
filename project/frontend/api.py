from django.db.models import Count
from rest_framework import status, authentication, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from vehicles.models import Vehicle
from vehicles.serializers import VehicleDetailSerializer
from repairs.models import RepairShop, Repair
import datetime


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_response(request):
    repairs_by_month = [0] * 12
    company = request.user.company
    vehicles = Vehicle.objects.filter(company=company)
    vehicles_count = vehicles.count()
    most_repaired_vehicles = VehicleDetailSerializer(vehicles.order_by('-repairs__price')[:3], 
        many=True)
    registered_vehicles = Vehicle.objects.filter(registered_till__range=[datetime.date.today(), '2050-12-12']).count()

    for vehicle in vehicles:
        for repair in vehicle.repairs.all():
            repairs_by_month[repair.date_of_repair.month - 1] += repair.price

    response = {
        'vehicle_count': vehicles_count,
        'repairShop_count': RepairShop.objects.filter(company=company).count(),
        'most_repaired_vehicles': most_repaired_vehicles.data,
        'registered_vehicles': registered_vehicles,
        'repairs_by_month': repairs_by_month

    }
    return Response(response, status=status.HTTP_200_OK)
  