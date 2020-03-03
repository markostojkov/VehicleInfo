from django.urls import path
from frontend.api import dashboard_response
from frontend.views import index

urlpatterns = [
    path('', index),
    path('api/dashboard', dashboard_response)
]
