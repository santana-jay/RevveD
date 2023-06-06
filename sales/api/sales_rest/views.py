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
        "id"
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
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
            safe=False,
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            salespeople = Salesperson.objects.create(**content)
            return JsonResponse(
                salespeople,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except TypeError as e:
            return JsonResponse(
                {"message": "Type error occurred: " + str(e)},
                status=400,
            )
    elif request.method == "DELETE" and id is not None:
        try:
            salespeople = Salesperson.objects.get(id=id)
            count, _ = salespeople.delete()
            return JsonResponse(
                {'Deleted': count > 0},
                status=200
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST", "DELETE"])
def api_customer(request, id=None):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False,
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            customers = Customer.objects.create(**content)
            return JsonResponse(
                customers,
                encoder=CustomerEncoder,
                safe=False,
            )
        except TypeError as e:
            return JsonResponse(
                {"message": "Type error occurred: " + str(e)},
                status=400,
            )
    elif request.method == "DELETE" and id is not None:
        try:
            customers = Customer.objects.get(id=id)
            count, _ = customers.delete()
            return JsonResponse(
                {'Deleted': count > 0},
                status=200
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "The customer does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST", "DELETE"])
def api_sale(request, id=None):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False,
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)

            # retrieving related object using ID
            # use vin for autombile??
            # employee id for salesperson??
            automobile_vin = content.get("automobile")
            salesperson_employee_id = content.get("salesperson")
            customer_id = content.get("customer")

            try:
                automobile = AutomobileVO.objects.get(vin=automobile_vin)
            except AutomobileVO.DoesNotExit:
                return JsonResponse(
                    {"message": "Automobile does not exist"},
                    status=400,
                )

            try:
                salesperson = Salesperson.objects.get(employee_id=salesperson_employee_id)
            except Salesperson.DoesNotExist:
                return JsonResponse(
                    {"message": "Sales Person does not exist"},
                    status=400,
                )

            try:
                customer = Customer.objects.get(id=customer_id)
            except Customer.DoesNotExist:
                return JsonResponse(
                    {"message": "Customer does not exist"},
                    status=400,
                )

            # (**content)
            sales = Sale.objects.create(
                price=content.get("price"),
                automobile=automobile,
                salesperson=salesperson,
                customer=customer
            )

            return JsonResponse(
                sales,
                encoder=SaleEncoder,
                safe=False,
            )
        except KeyError as e:
            return JsonResponse(
                {"message": "Key error occurred: " + str(e)},
                status=400,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "That Sale object does not exist"},
                status=400,
            )
    elif request.method == "DELETE" and id is not None:
        try:
            sales = Sale.objects.get(id=id)
            count, _ = sales.delete()
            return JsonResponse(
                {"Deleted": count > 0},
                )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "That Sale object does not exist"},
                status=400
            )
