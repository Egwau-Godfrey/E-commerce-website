"""
URL configuration for ecommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from . import views
from .views import ProductList, check_username_password, TraderSignup, TraderData, AddProduct, viewCategories
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('UserSignin', views.index),
    path('TraderSignin', views.index),
    path('TraderSignUp', views.index),
    path('trader-home', views.index),
    path('cart', views.index),
    path('productview', views.index),
    path('manifest.json', views.index),
    path('add-product', views.index),
    path('api/products/', ProductList.as_view(), name = 'product-list'),
    path('api/trader/signup', TraderSignup, name='trader-signup'),
    path('api/categories', viewCategories, name='trader-signup'),
    path('api/trader/addProduct/', AddProduct, name='add-product'),
    path('api/trader/details', TraderData, name='trader-data'),
    path('api/check_username_password/', check_username_password, name='check_username_password'),
    path('productview/<int:productID>/', views.index),
        
]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
