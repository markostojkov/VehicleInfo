from django.db import models
from django.contrib.auth.models import AbstractUser
from companies.models import Company


class User(AbstractUser):
	company = models.ForeignKey(Company, null=True, on_delete=models.CASCADE)

