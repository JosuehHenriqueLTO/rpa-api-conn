from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.conf import settings
from .serializers import UserSerializer
import jwt, datetime
import requests
from .models import User

# Create your views here.


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, req):
        serializer = UserSerializer(data=req.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
