from rest_framework import serializers
from .models import ProductItem

class ProductItemSerializer(serializers.ModelSerializer): #converts the models into json
    class Meta:
        model = ProductItem
        fields = '__all__'
