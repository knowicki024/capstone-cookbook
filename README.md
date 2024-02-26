# Recipe Social Media Application 
## Katie Nowicki


Your own digital cookbook! Keep all your recipes in one location instead of scrolling through endless apps to find something to cook up. Share your recipes with friends, create your own recipes, change different recipes to make them more personalized, search through your collection to be able to plan the week or a special event. 

![domain model](<capstone images - Imgur (4).png>)


![erd](<capstone images - Imgur (2).png>)


## Setup and Install to Deploy:


Open two terminals side by side and in the first terminal run:
```
pipenv install 
pipenv shell
cd server
flask db upgrade head 
python seed.py 
python app.py
```
Then in the second terminal run:
```
cd client 
npm install 
npm start 
```

## MVP 

C. Add recipes, users, meal plans 

R. View recipes users, meal plans

U. Update recipes, meal plans 

D. Delete recipes, meal plans

## Backend(API) 

### Models 
- A `User` has many `Meal Plan` through `Recipe`
- A `Recipe` has many `Meal Plan` through `User`
- A `Meal Plan` belongs to `Recipes` and `User`
- A `Category` belongs to `Recipes`

### Validations 
- Add validation to `Recipe` Model
    - must have `name`, `ingredients`, `directions`, `category_id`

- Add validation to `User`
    - must have `name` 
    - must be string between 1 and 10 characters

- Add validation to `MealPlan` 
    - must have a `date`.
 

### Controllers 

```
GET /users
POST /users
```
```
GET/category 
POST/category
```
```
GET /recipes
POST /recipes 

GET /recipes/<int:id>
PATCH /recipes<int:id>
DELETE /recipes/<int:id>
```
```
GET /meal_plan
POST /meal_plan 

GET/meal_plan/<int:id>
PATCH /meal_plan/<int:id> 
DELETE /meal_plan/<int:id>  
``` 

### Serilizers 

## Front End (React)
![component tree](<capstone images - Imgur.png>)

- User can implement full CRUD on client side for recipes that persists to the server

- User can navigate through application through NavBar and React Routers 

- User can add new recipes and meal plans through recipes 

## WireFrame 

![Wireframe](<capstone images - Imgur (5).png>)













Stretch Goals:

- Full CRUD for all Models and Components
- Social Media Application 
- Add more models and components
- Create tests for application


## Keep Track of Progress:
[Trello](https://trello.com/b/xDMt2Qhs/capstone2024)

