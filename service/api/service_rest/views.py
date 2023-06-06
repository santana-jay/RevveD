from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Appointment, AutomobileVO, Technician

# Create your views here.

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
    properties = ['employee_id', 'first_name', 'last_name']


@require_http_methods(['GET', 'POST'])
def list_appointments(request):
    if request.method == 'GET':
        try:
            appointments = Appointment.objects.all()
            data = AppointmentListEncoder().encode(appointments)
            return JsonResponse(data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, 'Failed to get appointments', status=404)
    else:
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.create(**content)
            return JsonResponse({'appointment': appointment}, encoder=AppointmentDetailEncoder, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, 'Failed to post appointment', status=400)


@require_http_methods(['GET', 'PUT', 'DELETE'])
def appointment_details(request, id):
    if request.method == 'GET':
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, 'Falied to get appointment details', status=404)

    elif request.method == 'DELETE':
        try:
            count, _ = Appointment.objects.filter(id=id).delete()
            return JsonResponse({'deleted': count > 0})
        except Exception as e:
            return JsonResponse({'error': str(e)}, 'Failed to delete appointment', status=404)

    else:
        try:
            content = json.loads(request.body)
            Appointment.objects.filter(id=id).update(**content)
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, 'Error updating appointment', status=400)


@require_http_methods(['PUT'])
def cancel_appointment(request, id):
    try:
        Appointment.objects.filter(id=id).update(status='canceled')
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, 'Error cancelling appointment', status=400)


@require_http_methods(['PUT'])
def finish_appointment(request, id):
    try:
        Appointment.objects.filter(id=id).update(status='finished')
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, 'Error finishing appointment', status=400)


@require_http_methods(['GET', 'POST', 'DELETE'])
def list_technicians(request, id):
    if request.method == 'GET':
        techs = Technician.objects.all()
        return JsonResponse({'technicians': techs}, encoder=TechnicianListEncoder)

    elif request.method == 'POST':
        try:
            content = json.loads(request.body)
            tech = Technician.objects.create(**content)
            return JsonResponse({'technician': tech}, encoder=TechnicianListEncoder, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, 'Error creating technician', status=400)

    else:
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({'deleted': count > 0})
