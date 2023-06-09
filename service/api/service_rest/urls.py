from django.urls import path
from .views import (list_appointments,
                    appointment_details,
                    list_technicians,
                    cancel_appointment,
                    finish_appointment)

urlpatterns = [
    path('appointments/', list_appointments, name='list_appointments'),
    path('appointments/<int:id>', appointment_details, name='appointment_details'),
    path('appointments/<int:id>/cancel', cancel_appointment, name='cancel_appointment'),
    path('appointments/<int:id>/finish', finish_appointment, name='finish_appointment'),
    path('technicians/', list_technicians, name='list_technicians'),
    path('technicians/<int:id>', list_technicians, name='delete_technicians'),
]
