from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProductSerializer
from .models import Product
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


# Create your views here.
class HealthCheckView(APIView):
    def post(self, request):
        return Response(status=status.HTTP_200_OK)


class RegisterView(APIView):
    def post(self, req):
        serializer = ProductSerializer(data=req.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProductBulkRegisterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        serializer = ProductSerializer(data=req.data, many=True)
        serializer.is_valid(raise_exception=True)
        products = [Product(**item) for item in serializer.validated_data]
        Product.objects.bulk_create(products)
        return Response(
            {
                "message": "Products has been created successfully!",
                "total": len(products),
            },
            status=status.HTTP_201_CREATED,
        )


class GetAllProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, req):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class DeleteProductView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, req, pk):
        product = get_object_or_404(Product, id=pk)
        product.delete()
        return Response(
            {"message": "Product has been deleted successfully!"},
            status=status.HTTP_204_NO_CONTENT,
        )

