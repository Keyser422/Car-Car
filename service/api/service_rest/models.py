from django.db import models
from django.urls import reverse

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length = 200)
    last_name = models.CharField(max_length = 200)
    employee_id = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("list_technicians", kwargs={"pk": self.id})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length = 200)
    sold = models.BooleanField(null = False)

    def __str__(self):
        return self.vin


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length = 200)
    status = models.CharField(max_length = 200, default='pending')
    vin = models.CharField(max_length = 200)
    customer = models.CharField(max_length = 200)
    technician = models.ForeignKey(
        Technician,
        related_name = "appointment",
        on_delete = models.CASCADE,
    )

    def get_api_url(self):
        return reverse("list_appointments", kwargs={"pk": self.id})
