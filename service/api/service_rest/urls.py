from django.urls import path
from .views import list_technicians, list_appointments, delete_appointment, delete_technician, cancel_appointment, finish_appointment


urlpatterns = [
    path("technicians/", list_technicians, name = "list_technicians"),
    path("technicians/<int:pk>/", delete_technician, name = "delete_technician"),
    path("appointments/", list_appointments, name = "list_appointments"),
    path("appointments/<int:pk>/", delete_appointment, name = "delete_appointment"),
    path("appointments/<int:pk>/cancel/", cancel_appointment, name = "cancel_appointment"),
    path("appointments/<int:pk>/finish/", finish_appointment, name = "finish_appointment"),
]
