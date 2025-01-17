from django.urls import path
from .views import list_salespeople, delete_salesperson, list_customers, delete_customer, list_sales, delete_sale

urlpatterns = [
    path('salespeople/', list_salespeople, name='list_salespeople'),
    path('salespeople/delete/', delete_salesperson, name='delete_salesperson'),
    path('customers/', list_customers, name='list_customers'),
    path('customers/delete/', delete_customer, name='delete_customer'),
    path('sales/', list_sales, name='list_sales'),
    path('sales/delete/', delete_sale, name='delete_sale'),
]