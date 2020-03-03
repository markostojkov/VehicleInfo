from django.urls import path, include
from rest_framework import routers
from vehicles.api import VehicleViewSet


router = routers.DefaultRouter()
router.register('vehicles', VehicleViewSet, 'vehicles')

urlpatterns = router.urls