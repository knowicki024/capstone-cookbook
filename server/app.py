# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from datetime import date

# Local imports
from config import app, db, api
from models import User, Category, Recipe, MealPlan

# @app.before_request
# def check_if_logged_in():
#     allowed_endpoints = ['login', 'logout', 'check_session']
#     if request.endpoint not in allowed_endpoints and not session.get('user_id'):
#         return {'error': 'Not Authorized'}, 401

# class CheckSession(Resource):
#     def get(self):
#         # import ipdb; ipdb.set_trace()
#         user = User.query.filter_by(id = session['user_id']).first()
#         if user:
#             return make_response(
#                 user.to_dict(), 200)
#         return {'error': 'Unauthorized'}, 401

# class Login(Resource):
#     def post(self):
#         name = request.get_json()['name']
#         password = request.get_json()['password']

#         user = User.query.filter_by(name=name).first()
#         # import ipdb; ipdb.set_trace()
#         # print(user, password)
#         if user and user.authenticate(password):
#             session['user_id'] = user.id
#             response=make_response(user.to_dict(), 200)
#             return response
#         return {'error': 'Invalid credentials'}, 401

# class Logout(Resource):
#     def delete(self):
#         session.pop('user_id', None)  
#         return {'message': 'Logged out successfully'}, 204

class Users(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict(rules=('-meal_plans',)) for user in users], 200
    


# class SignUp(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(name=data.get('name'))
        new_user.password_hash=data.get('password')
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(rules=('-meal_plans',)), 201

class Categories(Resource):

    def get(self):
        categories = Category.query.all()
        return [category.to_dict(rules=('-recipes',)) for category in categories], 200

    def post(self):
        data = request.get_json()
        new_category = Category(name=data.get('name'))
        db.session.add(new_category)
        db.session.commit()
        return new_category.to_dict(rules=('-recipes',)), 201

class CategoriesById(Resource):

    def get(self, id):
        category = Category.query.get(id)
        if category:
            return category.to_dict(rules=('-recipes.category',)), 200
        return {'error': 'Category not found'}, 404

class Recipes(Resource):

    def get(self):
        recipes = Recipe.query.all()
        return [recipe.to_dict() for recipe in recipes], 200

    def post(self):
        try:
            data = request.get_json()
            new_recipe = Recipe(
                name=data['name'],
                ingredients=data['ingredients'],
                directions=data['directions'],
                image=data['image'],
                category_id=data['category_id']
            )
            db.session.add(new_recipe)
            db.session.commit()
            return make_response(new_recipe.to_dict(), 201)
        except ValueError:
            return make_response({'error': 'Failed to add new recipe'}, 400)


class RecipeById(Resource):

    def get(self, id):
        recipe = Recipe.query.get(id)
        if recipe:
            return recipe.to_dict(), 200
        return {'error': 'Recipe not found'}, 404

class MealPlans(Resource):

    def get(self):
        meal_plans = MealPlan.query.all()
        return [mp.to_dict() for mp in meal_plans], 200

    def post(self):
        data = request.get_json()
        new_mp = MealPlan(
            date=date.fromisoformat(data.get('date')),
            user_id=data.get('user_id'),
            recipe_id=data.get('recipe_id'),
        )
        db.session.add(new_mp)
        db.session.commit()
        return new_mp.to_dict(), 201


class MealPlanById(Resource):

    def get(self, id):
        mp = MealPlan.query.get(id)
        if mp:
            return mp.to_dict(), 200
        return {'error': 'Meal plan not found'}, 404


# api.add_resource(CheckSession, '/check_session')
# api.add_resource(Login, '/login')
# api.add_resource(Logout, '/logout')
# api.add_resource(SignUp, '/signup')
api.add_resource(Users, '/users')
api.add_resource(Categories, '/categories')
api.add_resource(CategoriesById, '/categories/<int:id>')
api.add_resource(Recipes, '/recipes')
api.add_resource(RecipeById, '/recipes/<int:id>')
api.add_resource(MealPlans, '/meal_plans')
api.add_resource(MealPlanById, '/meal_plans/<int:id>')

if __name__ == '__main__':
    app.run(port=8888, debug=True)
