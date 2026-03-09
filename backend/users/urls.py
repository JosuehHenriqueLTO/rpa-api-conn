from django.urls import path
from .views import RegisterView, ViewProtect

urlpatterns = [
    # path("health/", HealthCheckView.as_view()),
    # path("register/", RegisterView.as_view()),
    # path("products/bulk/", ProductBulkRegisterView.as_view()),
    # path("export/", GetAllProductsView.as_view()),
    path("users/register/", RegisterView.as_view()),
    path("users/user/info/", ViewProtect.as_view()),
]
