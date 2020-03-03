from django.urls import path, include

from rest_framework import routers

from companies.api import CompanyViewSet, CompanyUsersViewSet


router = routers.DefaultRouter()
router.register('companies', CompanyViewSet, 'companies')
router.register('company-users', CompanyUsersViewSet, 'company-users')


urlpatterns = router.urls