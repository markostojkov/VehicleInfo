from rest_framework import serializers
from repairs.serializers import RepairSerializer
from vehicles.models import Vehicle


class VehicleSerializer(serializers.ModelSerializer):

	class Meta:
		model = Vehicle
		fields = ['id', 'brand', 'model', 'manufactured', 'registered_till', 'distance_passed', 'functional', 'details']

 
class VehicleListSerializer(serializers.ModelSerializer):

	class Meta:
		model = Vehicle
		fields = ['id', 'brand', 'model', 'manufactured', 'registered_till', 'distance_passed', 'functional']


class VehicleDetailSerializer(serializers.ModelSerializer):

	repairs = RepairSerializer(read_only=True, many=True)

	class Meta:
		model = Vehicle
		fields = ['id', 'brand', 'model', 'manufactured', 'registered_till', 'distance_passed', 'functional', 'details', 'repairs']