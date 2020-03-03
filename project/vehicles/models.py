from django.db import models
from django.core.validators import MaxValueValidator
from companies.models import Company
from repairs.models import Repair


class Vehicle(models.Model):
	company = models.ForeignKey(Company, null=True, on_delete=models.CASCADE)
	brand = models.CharField(max_length=50)
	model = models.CharField(max_length=50)
	manufactured = models.DateField(blank=True, null=True)
	registered_till = models.DateField()
	distance_passed = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(9999999999)])
	repairs = models.ManyToManyField(Repair, blank=True)
	functional = models.BooleanField()
	details = models.CharField(max_length=200, blank=True)

	@property
	def vehicle_repairs_expense(self):
		return sum([i.price for i in self.repairs.all()])

	class Meta:
		ordering = ('id',)