from django.contrib import admin
from django.contrib.admin import AdminSite
from .models import *

admin.site.site_header = "ShopNow Administration"

@admin.register(admins)
class adminsAdmin(admin.ModelAdmin):
    list_display=admins.DisplayFields
    search_fields=admins.SearchableFields
    list_editable=admins.EditableFields


@admin.register(adminrole)
class adminroleAdmin(admin.ModelAdmin):
    list_display=adminrole.DisplayFields
    search_fields=adminrole.SearchableFields
    list_editable=adminrole.EditableFields

@admin.register(adminlogin)
class adminloginAdmin(admin.ModelAdmin):
    list_display=adminlogin.DisplayFields
    search_fields=adminlogin.SearchableFields
    list_editable=adminlogin.EditableFields

@admin.register(category)
class categoryAdmin(admin.ModelAdmin):
    list_display=category.DisplayFields
    search_fields=category.SearchableFields
    list_editable=category.EditableFields

@admin.register(trader)
class traderAdmin(admin.ModelAdmin):
    list_display=trader.DisplayFields
    search_fields=trader.SearchableFields
    list_editable=trader.EditableFields

@admin.register(traderlogin)
class traderloginAdmin(admin.ModelAdmin):
    list_display=traderlogin.DisplayFields
    search_fields=traderlogin.SearchableFields
    list_editable=traderlogin.EditableFields

@admin.register(ProductItem)
class productItemAdmin(admin.ModelAdmin):
    list_display=ProductItem.DisplayFields
    search_fields=ProductItem.SearchableFields
    list_filter=ProductItem.FilterFields
    list_editable=ProductItem.EditableFields

@admin.register(customer)
class customerAdmin(admin.ModelAdmin):
    list_display=customer.DisplayFields
    search_fields=customer.SearchableFields
    list_editable=customer.EditableFields

@admin.register(customerlogin)
class customerloginAdmin(admin.ModelAdmin):
    list_display=customerlogin.DisplayFields
    search_fields=customerlogin.SearchableFields
    list_editable=customerlogin.EditableFields

@admin.register(checkoutbasket)
class checkOutBasketAdmin(admin.ModelAdmin):
    list_display=checkoutbasket.DisplayFields
    search_fields=checkoutbasket.SearchableFields
    list_editable=checkoutbasket.EditableFields
