from django.urls import path
from .views import api_salesperson, api_customer


urlpatterns = [
    path(
        "salesperson/",
        api_salesperson,
        name="api_salesperson"),
    path(
        "salesperson/<int:id>/",
        api_salesperson,
        name="api_salesperson"),
    path(
        "customer/",
        api_customer,
        name="api_customer"),
    path(
        "customer/<int:id>/",
        api_customer,
        name="api_customer"),
]
