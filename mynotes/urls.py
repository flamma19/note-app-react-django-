from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Telling Django to include the urls.py file in the api app.
    path('api/', include('api.urls')),
    path('', TemplateView.as_view(template_name='index.html'))
]
