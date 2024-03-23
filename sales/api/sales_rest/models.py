from django.db import models

# Create your models here.
class Salesperson(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    employee_id = models.IntegerField(primary_key=True)

    def __str__(self):
        return f"{self.first_name}, {self.last_name}"

class Customer(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.first_name}, {self.last_name}"
    
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(null=False)

    def __str__(self):
        f"{self.vin}, {self.sold}"


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "+",
        on_delete = models.PROTECT,
    )
    salesperson = models.ForeignKey(Salesperson, on_delete=models.PROTECT)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        f"{self.automobile}, {self.salesperson}, {self.customer}, {self.price}"
