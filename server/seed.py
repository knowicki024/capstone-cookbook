
# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Category, Recipe, MealPlan 

fake = Faker()

def create_user():
    users = []
    for _ in range(5):
        u = User(
            name=fake.first_name()
        )
        users.append(u)
    
    return users

def create_category():
    categories = ["Appetizer", "Entree", "Dessert"]
    category_objects = [] 
    for name in categories:
        c = Category(name=name)
        category_objects.append(c)
    
    return category_objects

def create_recipe(categories):
    recipes_list = [] 
    recipes = ["Deviled Eggs", "Chocolate Cake", "Greek Salad", "Flan", "Pot Roast", "Lasagna"]
    for _ in range(5):
        r = Recipe(
            name = rc(recipes),
            ingredients = ', '.join(fake.words(nb=3)), 
            directions = fake.paragraph(),
            category_id = rc([category.id for category in categories])
        )
        recipes_list.append(r)
    
    return recipes_list


def create_meal_plan(users, recipes):
    meal_plans = []
    for _ in range(5):
        mp = MealPlan(
            date = fake.date_object(),
            user_id = rc([user.id for user in users]),
            recipe_id = rc([recipe.id for recipe in recipes])
        )
        meal_plans.append(mp)

    return meal_plans
