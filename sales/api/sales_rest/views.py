from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import (
    AutomobileVO,
    Salesperson,
    Customer,
    Sale,
)
import json
# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "import_href",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST", "DELETE"])
def api_salesperson(request, id=None):
    if request.method == "GET":
        sales_people = Salesperson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalespersonEncoder,
            safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            sales_people = Salesperson.objects.create(**content)
            return JsonResponse(
                sales_people,
                encoder=SalespersonEncoder,
                safe=False
            )
        except TypeError as e:
            return JsonResponse(
                {"message": "Type error occurred: " + str(e)},
                status=400
            )
    elif request.method == "DELETE" and id is not None:
        try:
            sales_people = Salesperson.objects.get(id=id)
            count, _ = sales_people.delete()
            return JsonResponse(
                {'Deleted': count > 0}
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=400
            )


@require_http_methods(["GET", "POST", "DELETE"])
def api_customer(request, id=None):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
            safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except TypeError as e:
            return JsonResponse(
                {"message": "Type error occurred: " + str(e)},
                status=400
            )
    elif request.method == "DELETE" and id is not None:
        try:
            customer = Customer.objects.get(id=id)
            count, _ = customer.delete()
            return JsonResponse(
                {'Deleted': count > 0}
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "The customer does not exist"},
                status=400
            )
