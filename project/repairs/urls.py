from django.urls import path, include
from rest_framework import routers
from repairs.api import RepairViewSet, RepairShopsViewSet, get_all_repairs


router = routers.DefaultRouter()
router.register('repairs', RepairViewSet, 'repairs')
router.register('repair-shops', RepairShopsViewSet, 'repair-shops')

urlpatterns = [
	path('repair-shops-all', get_all_repairs)
]

urlpatterns += router.urls