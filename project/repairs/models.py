from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator
from companies.models import Company


class RepairShop(models.Model):
	company = models.ForeignKey(Company, null=True, on_delete=models.CASCADE)
	name = models.CharField(max_length=50)
	place = models.CharField(max_length=50, blank=True)

	class Meta:
		ordering = ('id',)

class Repair(models.Model):
	shop = models.ForeignKey('RepairShop', null=True, on_delete=models.CASCADE)
	part_changed = models.CharField(max_length=50)
	price = models.IntegerField(validators=[MaxValueValidator(9999999999)])
	date_of_repair = models.DateField(default=timezone.now)
