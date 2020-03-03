from django.db import models

subscription_choices = (
	('Free', 'Free'),
	('Classic', 'Classic'),
	('Premium', 'Premium'),
)

currency_choices = (
		('USD', 'USD'),
		('CHF', 'CHF'),
		('GBP', 'GBP'),
		('EUR', 'EUR'),
		('MKD', 'MKD'),
	)

distance_choices = (
		('KM', 'KM'),
		('Mile', 'Mile')
	)


class Company(models.Model):
	name = models.CharField(max_length=50, blank=True, default='Company')
	address = models.CharField(max_length=50, blank=True)
	phone = models.CharField(max_length=20, blank=True)
	subscription = models.CharField(choices=subscription_choices, max_length=20, default='Free')
	currencies = models.CharField(choices=currency_choices, max_length=20, default='EUR')
	distances = models.CharField(choices=distance_choices, max_length=20, default='KM')
