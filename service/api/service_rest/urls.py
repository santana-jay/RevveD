from django.urls import path
from .views import list_appointments, appointment_details

urlpatterns = [
    path('appointments/', list_appointments, name='list_appointments'),
    path('appointments/<int:id>/', appointment_details, name='appointment_details'),
]
