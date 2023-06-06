from django.shortcuts import render
from datetime import datetime
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from .models import Appointment, Technician
from .encoders import (
    AppointmentListEncoder,
    AppointmentDetailEncoder,
    TechnicianListEncoder
    )

# Create your views here.

@require_http_methods(['GET', 'POST'])
def list_appointments(request):
    if request.method == 'GET':
        try:
            appointments = Appointment.objects.all()
            return JsonResponse(appointments, encoder=AppointmentListEncoder, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, 'Failed to get appointments', status=404)
    else:
        try:
            content = json.loads(request.body)

            if 'technician' in content:
                content['technician'] = Technician.objects.get(employee_id=content['technician'])
                appointment = Appointment.objects.create(**content)
                appointment.save()
                return JsonResponse({'appointment': appointment}, encoder=AppointmentDetailEncoder, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


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
def list_technicians(request, id=None):
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
