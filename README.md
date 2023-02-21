# Proshop: An E-Commerce Web Application 


## [VIEW LIVE DEMO](https://proshop-mocha.vercel.app/)

## 🚧 Technology Stack

- **Server Enviornment** - NodeJS
- **Framework** - ExpressJS
- **Frontend** - ReactJS, HTML, CSS, Javascript, Vite
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


### Additional Features to be added later:

- Product Carousel
- Reviews for users
- Search within the homepage
- Pagination for the homepage
