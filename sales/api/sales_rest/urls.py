from django.urls import path
from .views import (
    api_salesperson,
    api_customer,
    api_sale,
    api_show_saleshistory
    )

urlpatterns = [
    path(
        "salespeople/",
        api_salesperson,
        name="api_salesperson"),

    path(
        "salespeople/<int:id>/",
        api_salesperson,
        name="api_salesperson"),

    path(
        "salespeople/<int:id>/sales/",
        api_show_saleshistory,
        name="api_show_saleshistory"),

    path(
        "customers/",
        api_customer,
        name="api_customer"),

    path(
        "customers/<int:id>/",
        api_customer,
        name="api_customer"),

    path(
        "sales/",
        api_sale,
        name="api_sale"),

    path(
        "sales/<int:id>/",
        api_sale,
        name="api_sale"),
]
