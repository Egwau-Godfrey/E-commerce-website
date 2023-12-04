import base64
import json
import time
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ProductItem
from .serializers import ProductItemSerializer
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from .models import *
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from django.shortcuts import render

# def index(request):
#     return render(request, 'index.html')

def index(request, productID=None):
    return render(request, 'index.html', {'productID': productID})


@csrf_exempt
def TraderSignup(request):
    if request.method == 'POST':
        try:
            # Access the raw JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            first_name = data.get('firstName')
            last_name = data.get('lastName')
            email = data.get('email')
            phone = data.get('phone')
            username = data.get('username')
            password = data.get('password')

            print(first_name, last_name)
            # Create a new trader instance and save it to the database
            new_trader = trader(
                Fname=first_name,
                Lname=last_name,
                email=email,
                phone=phone
            )
            new_trader.save()

            # Create a new traderlogin instance and save it to the database
            new_trader_login = traderlogin(
                traderID=new_trader,
                username=username,
                password=password
            )
            new_trader_login.save()

            response_data = {'success': True}
            return JsonResponse(response_data)
        except Exception as e:
            print("cool guy")
            print("Error:", str(e))
            return JsonResponse({'error': 'Bad Request'}, status=400)

@csrf_exempt
def check_username_password(request):
    if request.method == 'POST':
        try:
            # Access the raw JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')

            # Check if the username and password combination exists
            user_exists = traderlogin.objects.filter(username=username, password=password).exists()

            response_data = {'user_exists': user_exists}

            return JsonResponse(response_data)
        except Exception as e:
            print("Error:", str(e))
            return JsonResponse({'error': 'Bad Request'}, status=400)
        

from django.http import JsonResponse

@csrf_exempt
def viewCategories(request):
    if request.method == 'GET':  # Use GET request to retrieve categories
        try:
            # Fetch the categories from the database
            categories = category.objects.all()
            
            # Convert the categories to a list of dictionaries
            categories_data = [{'CategoryID': cat.CategoryID, 'CategoryName': cat.CategoryName} for cat in categories]

            # Create a JSON response with the categories data
            response_data = {'categories': categories_data}

            return JsonResponse(response_data)
        except Exception as e:
            print("Error:", str(e))
            return JsonResponse({'error': 'Bad Request'}, status=400)

    # Handle other HTTP methods if needed
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def AddProduct(request):
    if request.method == 'POST':
        try:
            #Access the raw JSON data from the request body
            print(request.body)
                
            data = json.loads(request.body.decode('utf-8'))
            print("Helloe World +++++++++")
            
            
            productName = data.get('ProductName')
            print(f"\nName: {productName}\n")
            QuantityAvailable = data.get('QuantityAvailable')
            print("\nQuantity Available\n")
            priceOfEach = data.get('PriceOfEach')
            print("\nPrice of Each\n")
            CategoryID = data.get('CategoryID')
            print("\nCatergoryID\n")
            traderID = data.get('TraderID')
            print("\nTraderID\n")
            #picture =  request.body.get('Picture')
            picture =  data.get('Picture')
            print("\nPicture\n")
            Description = data.get('Description')
            print("\nDescription\n")

            new_product = ProductItem(
                productName,
                QuantityAvailable,
                priceOfEach,
                CategoryID,
                traderID,
                picture,
                Description,
            )
            new_product.save()

        except Exception as e:
            print("Error:", str(e))
            return JsonResponse({'error': 'Bad Request'}, status=400)


  
        
@csrf_exempt
def TraderData(request):
    if request.method == 'POST':
        try:
            # Access the raw JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')

            # Filter basing on the username  exists
            trader_login = traderlogin.objects.filter(username=username).first()

            if trader_login:
                trader_ID = trader_login.traderID
                products = ProductItem.objects.filter(traderID=trader_ID)

                # Create a list of dictionaries containing product details
                product_data = []
                for product in products:
                    # Convert the Category object to a dictionary
                    category_data = {
                        'categoryID': product.CategoryID.CategoryID,
                        'categoryName': product.CategoryID.CategoryName,
                        #'description': product.CategoryID.description,
                    }

                    # Check if there is an image available
                    has_image = bool(product.picture)

                    # Convert the image to base64
                    image_base64 = ""
                    if has_image:
                        # Open image file as bytes 
                        with open(product.picture.path, 'rb') as image_file:

                            # Read image data as bytes
                            image_data = image_file.read()

                            # Encode bytes to base64 string
                            image_base64 = base64.b64encode(image_data).decode('utf-8')

                    
                    product_info = {
                        'productID': product.productID,
                        'productName': product.productName,
                        'QuantityAvailable': product.QuantityAvailable,
                        'priceOfEach': product.priceOfEach,
                        'CategoryID': category_data,
                        'traderID': product.traderID_id,  # Access traderID foreign key ID
                        'hasImage': has_image,  # Include the flag for image presence
                        'picture': image_base64,  # Include the base64 encoded image
                        'Description': product.Description,
                    }
                    product_data.append(product_info)

                user_data = {
                    'Fname': trader_ID.Fname,
                    'Lname': trader_ID.Lname,
                    'email': trader_ID.email,
                    'phone': trader_ID.phone,
                    'products': product_data,  # Include the list of product details
                }

                response_data = {'user_data': user_data}
                return JsonResponse(response_data)
            else:
                return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            print("Error:", str(e))
            return JsonResponse({'error': 'Bad Request'}, status=400)




class ProductList(APIView):
    def get(self, request):
        products = ProductItem.objects.all()
        #print(f"products: {products}")
        serializer = ProductItemSerializer(products, many=True)
        return Response(serializer.data)

