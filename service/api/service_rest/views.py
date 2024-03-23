from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO
import json


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


# Create your views here.
@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder = TechnicianEncoder,
            safe = False
        )


@require_http_methods(["DELETE"])
def delete_technician(request, pk):
    try:
        technician = Technician.objects.get(employee_id = pk)
        technician.delete()
        return JsonResponse(
            {"deleted": "true"},
        )
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": "Technician does not exist"},
        )


@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder = AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_id = content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status = 400
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder = AppointmentEncoder,
            safe = False
        )


@require_http_methods(["DELETE"])
def delete_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id = pk)
        appointment.delete()
        return JsonResponse(
            {"deleted": "true"},
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "appointment does not exist"},
        )


@require_http_methods(["PUT"])
def cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id = pk)
        appointment.status = "canceled"
        appointment.save()
        return JsonResponse(
            {"message": "appointment canceled"},
            status = 200
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "appointment does not exist"},
            status = 400
        )

@require_http_methods(["PUT"])
def finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id = pk)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(
            {"message": "appointment finished"},
            status = 200
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "appointment does not exist"},
            status = 400
        )
