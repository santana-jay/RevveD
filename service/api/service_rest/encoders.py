from common.json import ModelEncoder

from .models import Appointment, AutomobileVO, Technician


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'sold',]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ['date_time', 'customer', 'technician', 'vin']

    encoders = {'vin': AutomobileVODetailEncoder}

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ['customer', 'date_time', 'reason', 'vin', 'technician', 'status']

    encoders = {'vin': AutomobileVODetailEncoder}

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ['employee_id', 'first_name', 'last_name', 'id']
