from rest_framework import serializers
from repairs.models import Repair, RepairShop


class RepairShopSerializer(serializers.ModelSerializer):

	class Meta:
		model = RepairShop
		fields = ['id', 'name', 'place']


class RepairSerializer(serializers.ModelSerializer):

	shop = RepairShopSerializer(read_only=True)

	class Meta:
		model = Repair
		fields = ['id', 'part_changed', 'price', 'date_of_repair', 'shop']


class RepairOnlySerializer(serializers.ModelSerializer):

	class Meta:
		model = Repair
		fields = ['id', 'part_changed', 'price', 'date_of_repair']