from django.urls import path
from .views import (
    HealthCheckView,
    RegisterView,
    ProductBulkRegisterView,
    GetAllProductsView,
    DeleteProductView,
)

urlpatterns = [
    path("health/", HealthCheckView.as_view()),
    path("products/register/", RegisterView.as_view()),
    path("products/bulk/", ProductBulkRegisterView.as_view()),
    path("products/export/", GetAllProductsView.as_view()),
    path("products/<int:pk>/delete/", DeleteProductView.as_view()),
]
