from django.db import models
from django.contrib.auth.models import User

class category(models.Model):
    CategoryID = models.AutoField(primary_key=True)
    CategoryName = models.CharField(max_length=45)
    DisplayFields = ['CategoryID', 'CategoryName']
    SearchableFields = ['CategoryName']
    EditableFields = ['CategoryName']

class trader(models.Model):
    traderID = models.AutoField(primary_key=True)
    Fname = models.CharField(max_length=45)
    Lname = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    phone = models.CharField(max_length=45)
    DisplayFields = ['traderID', 'Fname', 'Lname', 'email', 'phone']
    SearchableFields = ['Fname', 'Lname', 'email', 'phone']
    EditableFields = ['Fname', 'Lname', 'email', 'phone']

class ProductItem(models.Model):
    productID = models.AutoField(primary_key=True)
    productName = models.CharField(max_length=45)
    QuantityAvailable = models.IntegerField()
    priceOfEach = models.IntegerField()
    CategoryID = models.ForeignKey(category, on_delete=models.PROTECT)
    traderID = models.ForeignKey(trader, on_delete=models.CASCADE)
    picture = models.ImageField()
    Description = models.CharField(max_length=2000)
    DisplayFields = ['productID', 'productName', 'QuantityAvailable', 'priceOfEach', 'CategoryID', 'traderID', 'picture', 'Description']
    SearchableFields = ['productName', 'priceOfEach']
    FilterFields = ['CategoryID', 'traderID']
    EditableFields = ['productName', 'QuantityAvailable', 'priceOfEach', 'CategoryID', 'traderID', 'picture', 'Description']

class customer(models.Model):
    customerID = models.AutoField(primary_key=True)
    Fname = models.CharField(max_length=45)
    Lname = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    phone = models.CharField(max_length=45)
    DisplayFields = ['customerID', 'Fname', 'Lname', 'email', 'phone']
    SearchableFields = ['Fname', 'Lname', 'email', 'phone']
    EditableFields = ['Fname', 'Lname', 'email', 'phone']

class customerlogin(models.Model):
    customerLoginID = models.AutoField(primary_key=True)
    customerID = models.ForeignKey(customer, on_delete=models.CASCADE)
    username = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    DisplayFields = ['customerLoginID', 'customerID', 'username', 'password'] 
    SearchableFields = ['username']
    EditableFields = ['customerID', 'username', 'password'] 

class traderlogin(models.Model):
    traderLoginID = models.AutoField(primary_key=True)
    traderID = models.ForeignKey(trader, on_delete=models.CASCADE)
    username = models.CharField(max_length=45)
    password = models.CharField(max_length=45) 
    DisplayFields = ['traderLoginID', 'traderID', 'username', 'password']
    SearchableFields = ['username']
    EditableFields = ['traderID', 'username', 'password']

class checkoutbasket(models.Model):
    basketID = models.AutoField(primary_key=True)
    productID = models.ForeignKey(ProductItem, on_delete=models.CASCADE)
    productName = models.CharField(max_length=45)
    customerID = models.ForeignKey(customer, on_delete=models.CASCADE)
    Quantity = models.IntegerField()
    paymentOption = models.CharField(max_length=45)
    paid = models.BooleanField()
    DisplayFields = ['basketID', 'productID', 'productName', 'customerID', 'Quantity', 'paymentOption', 'paid']
    SearchableFields = ['customerID', 'productName', 'paymentOption']
    EditableFields = ['productID', 'productName', 'customerID', 'Quantity', 'paymentOption', 'paid']

class adminrole(models.Model):
    roleID = models.AutoField(primary_key=True)
    rolename = models.CharField(max_length=45)
    DisplayFields = ['roleID', 'rolename']
    SearchableFields = ['rolename']
    EditableFields = ['rolename']

class admins(models.Model):
    roleID = models.ForeignKey(adminrole, on_delete=models.PROTECT)
    adminID = models.AutoField(primary_key=True)
    Fname = models.CharField(max_length=45)
    Lname = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    phone = models.CharField(max_length=45)
    DisplayFields = ['adminID', 'Fname', 'Lname', 'email', 'phone', 'roleID']
    SearchableFields = ['Fname', 'Lname', 'email', 'phone']
    EditableFields = ['Fname', 'Lname', 'email', 'phone', 'roleID']

class adminlogin(models.Model):
    adminLoginID = models.AutoField(primary_key=True)
    adminID = models.ForeignKey(admins, on_delete=models.CASCADE)
    username = models.CharField(max_length=45)
    password = models.CharField(max_length=45) 
    DisplayFields = ['adminLoginID', 'adminID', 'username', 'password']
    SearchableFields = ['username']
    EditableFields = ['adminID', 'username', 'password']

