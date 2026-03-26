from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer
import jwt, datetime
import requests
from .models import User

# Create your views here.


class RegisterView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, req):
        print("DATA:", req.data)
        print("FILES:", req.FILES)

        serializer = UserSerializer(data=req.data, context={"request": req})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            UserSerializer(user, context={"request": req}).data,
            status=status.HTTP_201_CREATED,
        )


class ViewProtect(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, req):
        serializer = UserSerializer(req.user, context={"request": req})
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, req, pk):
        user = get_object_or_404(User, id=pk)
        user.delete()
        return Response(
            {"message": "User has been deleted successfully!"},
            status=status.HTTP_204_NO_CONTENT,
        )
