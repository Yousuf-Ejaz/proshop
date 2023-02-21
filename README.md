# Proshop: An E-Commerce Web Application 


## [VIEW LIVE DEMO](https://proshop-mocha.vercel.app/)

## 🚧 Technology Stack

- **Server Enviornment** - NodeJS
- **Framework** - ExpressJS
- **Frontend** - ReactJS, HTML, CSS, Javascript, Vite
- **UI/UX** - BootStrap
- **State management** - Redux
- **Database** - MongoDB
- **Cloud database service** - MongoDB Atlas
- **Authorizatiion** - JWT
- **Upload image** - Multer
- **Frontend Deployment** - Vercel
- **Backend Deployment** - Render

## ⬇️ Installation

- First, fork this repository 🍴 and follow the given instructions:

```
# clone the repository to your local machine
$ git clone `git clone https://github.com/<YOUR-GITHUB-USERNAME>/proshop.git`

# navigate to the project's directory and install all the relevant dev-dependencies
$ yarn
$ cd frontend && yarn
$ cd backend && yarn

# create a MongoDB Atlas instance and obtain the MongoDB URI
# Create a developer account at Paypal and obtain PayPal Account ID
# choose a random JWT secret
# create a .env file with the following fields according to the knowledge obtained
   NODE_ENV 
   PORT 
   MONGO_URI 
   JWT_SECRET 
   PAYPAL_CLIENT_ID 
   
# use the seeder script to populate the cloud database
$ yarn data:import

# Start application
$ yarn dev

# Make requests on http://localhost:PORT/ from Postman
```

## Workflow

On the home page you can view all the products available along with their ratings and prices.

#### For Regular Users

1. Register/ Login
2. Update Profile
3. View Products on the HomePage
4. View Detailed description upon clicking on the specific product from the database.
5. Decide upon the quantity of the product and add it to the cart.
6. View the cart to know the total Amount alongside the tax and discount breakdown.
7. Decide upon the quantity and the price of the items in the cart and proceed to checkout.
8. Enter your shipping details.
9. Enter your method of payment.
10. Place your order.
11. An oder will be created against your profile which you can view in your profile.
12. Use paypal to pay your order.
13. You can also edit your profile and change your password.


#### For Admins

1. All the above mentioned functionalities.
2. An admin can remove a user from the database.
3. An admin can change the user's details except their password.
4. An admin can add products to the avalable list of product on the homepage.
5. An admin can alter the details of a product.

## Project Structure

I structured the application based on MVC Architecture. MVC stands for Model, View and Controller. This application presents a clear demarcation between the Model, View and Controller logics:

1. The `Model` logic is managed by Redux and Redux toolkit. Redux store decides what data the app should contain according to the current state. If the state of this data changes, then the `View` is notified. It is Implemented and managed using `Store`, `Reducers`, `Constants` and `Actions`.
2. The `View` logic is handled using `BootStrap` Elements. It renders elements using `React` and by monitoring the changes in the `Model` logic or the store state.
3. The `Controller` contains the implemtation and logic to all the routes which ultimately updates the model and/or view in response to input from the users of the app.


## 🔨 API Endpoints

`/api/products`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION |ACCESS
| :-------------- | :-------: | ------------------: |
| GET | /api/products | Fetch all products | Public
| GET | /api/products/:id | Fetch single product | Public
| DELETE | /api/products/:id | Delete a product | Private/Admin
| POST | /api/products | Create a product| Private/Admin
| PUT | /api/products/:id | Update a product| Private/Admin

`/api/users`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION |ACCESS
| :-------------- | :-------: | ------------------: |
| POST | /api/users/login | Auth User and get token | Public
| POST | /api/users | Register User | Public
| GET | /api/users/profile | Get user profile | Private
| PUT | /api/users/profile | Update user profile | Private
| GET | /api/users | Get All users| Private/Admin
| DELETE | /api/users/:id | Delete a user | Private/Admin
| GET | /api/users/:id | Get user by Id | Private/Admin
| PUT | /api/users/profile | Update user by Id | Private/Admin

`/api/orders`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION |ACCESS
| :-------------- | :-------: | ------------------: |
| POST | /api/orders | Create new Order | Private
| GET | /api/orders/:id | Get order by ID | Private
| GET | /api/orders/:id/pay | Update order to paid | Private
| GET | /api/orders/myorders | Update logged in user orders | Private

`/api/upload`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION |ACCESS
| :-------------- | :-------: | ------------------: |
| POST | /api/upload | Upload an Image | Private



### Failed Tasks

- The upload functionality broke upon bringing into production.
- The state of the payment completion is not updated upon payment.

### Pending Tasks

- Unit Tests

### Additional Features to be added later:

- Product Carousel
- Reviews for users
- Search within the homepage
- Pagination for the homepage
- Filers for price, category, brand etc.
