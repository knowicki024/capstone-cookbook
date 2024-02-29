from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    
    meal_plans = db.relationship('MealPlan', back_populates='user', cascade='all, delete')

    serialize_rules = ('-meal_plans.user','-_password_hash',)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hash cannot be viewed!')
    
    @password_hash.setter
    def password_hash(self, password):
        new_hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))

        self._password_hash = new_hashed_password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash,
            password.encode('utf-8')
        )
    

    @validates('name')
    def validate_name(self, key, name):
        if not isinstance(name, str):
            raise ValueError("Name must be a string")
        if not (1 <= len(name) <= 10):
            raise ValueError("Name must be between 1 and 20 characters")
        return name

    def __repr__(self):
        return f'<User {self.id}: {self.name}>'
    

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    recipes = db.relationship('Recipe', back_populates='category', cascade='all, delete')

    serialize_rules = ('-recipes.category',)

    def __repr__(self):
        return f'<Category {self.id} Username: {self.name}>'


class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ingredients = db.Column(db.String)
    directions = db.Column(db.String)
    
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = relationship('Category', back_populates='recipes')
    meal_plans = db.relationship('MealPlan', back_populates='recipe', cascade='all, delete')

    serialize_rules = ('-meal_plans.recipe', '-category.recipes',)


    # @validates('name', 'ingredients', 'directions', 'category_id')
    # def validate_fields(self, key, value):
    #     if not value:
    #         raise ValueError(f"{key} cannot be empty")
        
    #     if key == 'category_id':
    #         if not isinstance(value, int):
    #             raise ValueError("category_id must be an integer")
    #         if not (1 <= value <= 3):
    #             raise ValueError("category_id must be between 1 and 3")
            
    #     return value


    def __repr__(self):
        return f'<Recipe {self.id}: {self.name}, {self.ingredients}, {self.directions}>'


class MealPlan(db.Model, SerializerMixin):
    __tablename__ = 'meal_plans'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    user = relationship('User', back_populates='meal_plans')
    recipe = relationship('Recipe', back_populates='meal_plans')

    serialize_rules = ('-user.meal_plans', '-recipe.meal_plans')

    @validates('date')
    def validate_date(self, key, value):
        if not value:
            raise ValueError("Date is required")
        return value

    def __repr__(self):
        return f'<MealPlan {self.id}>'