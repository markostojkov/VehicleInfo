from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('companies.urls')),
    path('api/', include('vehicles.urls')),
    path('api/', include('repairs.urls')),
]
