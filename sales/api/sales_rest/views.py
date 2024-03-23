from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Salesperson, Customer, Sale, AutomobileVO
import json

# Create your views here.
class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin"
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price"
    ]
    encoders = {
        "automobiles": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }

@require_http_methods(["GET", "POST"])
def list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salespeople},
            encoder = SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder = SalespersonEncoder,
            safe=False
        )

@require_http_methods(["DELETE"])
def delete_salesperson(request):
    if request.method == "DELETE":
        content = json.loads(request.body)
        salesperson_id = content.get('id', None)
        if salesperson_id:
            try:
                salesperson = Salesperson.objects.get(id=salesperson_id)
                salesperson.delete()
                return JsonResponse({'message': 'Salesperson deleted.'})
            except Salesperson.DoesNotExist:
                return JsonResponse({'message': 'Salesperson is invalid.'}, status=404)
        else:
            return JsonResponse({'message': 'Salesperson ID must be deleted.'}, status=400)

@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customer": customers},
            encoder = CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder = CustomerEncoder,
            safe=False
        )
    
@require_http_methods(["DELETE"])
def delete_customer(request):
    if request.method == "DELETE":
        content = json.loads(request.body)
        customer_id = content.get('id', None)
        if customer_id:
            try:
                customer = Customer.objects.get(id=customer_id)
                customer.delete()
                return JsonResponse({'message': 'Customer deleted.'})
            except Customer.DoesNotExist:
                return JsonResponse({'message': 'Customer is invalid.'}, status=404)
        else:
            return JsonResponse({'message': 'Customer ID must be deleted.'}, status=400)

@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sale": sales},
            encoder = SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(id=automobile["id"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile does not exist."},
                status = 400
            )
        try:
            salesperson = Salesperson.objects.get(id=salesperson["id"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist."},
                status = 400
            )
        try:
            customer = Customer.objects.get(id=customer["id"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist."},
                status = 400
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder = SaleEncoder,
            safe=False
        )
    
@require_http_methods(["DELETE"])
def delete_sale(request):
    if request.method == "DELETE":
        content = json.loads(request.body)
        sale_id = content.get('id', None)
        if sale_id:
            try:
                sale = Sale.objects.get(id=sale_id)
                sale.delete()
                return JsonResponse({'message': 'Sale deleted.'})
            except Sale.DoesNotExist:
                return JsonResponse({'message': 'Sale is invalid.'}, status=404)
        else:
            return JsonResponse({'message': 'Sale ID must be deleted.'}, status=400)