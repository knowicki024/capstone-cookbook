
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
        u.password_hash = 'qwerty123'
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

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        try:
            db.create_all()
            print("Clearing DB...")
            User.query.delete()
            Category.query.delete()
            Recipe.query.delete()
            MealPlan.query.delete()

            print("Seeding users...")
            users = create_user()
            db.session.add_all(users)
            db.session.commit()

            print("Seeding categories...")
            categories = create_category()
            db.session.add_all(categories)
            db.session.commit()

            print("Seeding recipes...")
            recipes = create_recipe(categories)
            db.session.add_all(recipes)
            db.session.commit()

            print("Seeding Meal Plans...")
            meal_plans = create_meal_plan(users, recipes)
            db.session.add_all(meal_plans)
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            print("An error occurred while seeding the database:")
            print(e)

