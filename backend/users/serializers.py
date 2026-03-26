from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ["id", "name", "email", "password", "avatar"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        avatar = validated_data.pop("avatar", None)
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        if avatar:
            user.profile.avatar = avatar
            user.profile.save()
        return user

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        avatar = getattr(instance.profile, "avatar", None)
        if avatar:
            data["avatar"] = avatar.url
        else:
            data["avatar"] = None
        return data
