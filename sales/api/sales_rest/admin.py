from django.contrib import admin
from .models import Salesperson, Customer, Sale, AutomobileVO

# Register your models here.
admin.site.register(Salesperson)
admin.site.register(Customer)
admin.site.register(Sale)
admin.site.register(AutomobileVO)