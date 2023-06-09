from common.json import ModelEncoder
from .models import Appointment, AutomobileVO, Technician


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'sold',]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ['employee_id', 'first_name', 'last_name', 'id']

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ['customer', 'date_time', 'reason', 'vin', 'is_vip', 'technician', 'status']

    encoders = {'technician': TechnicianListEncoder()}


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ['date_time', 'customer', 'technician', 'is_vip', 'status', 'date_time', 'reason', 'vin', 'id']

    encoders = {'technician': TechnicianListEncoder()}
