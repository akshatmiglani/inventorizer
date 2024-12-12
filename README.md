# Automated Invoice Generator with Inventory Management System

This project aims to create an Automated Invoice Generator tailored for small businesses. It includes an inbuilt inventory management system to streamline the processes of generating invoices and managing stock levels.

The application is built using the MERN stack


# Featues

1. Automated Invoice Generation: Easily create invoices with detailed product information, pricing, and customer details.
2. Inventory Management: Keep track of products in the inventory, manage stock quantities, and monitor product availability.
3. User Authentication: Secure login and registration for users, allowing them to access their dashboard.
4. Invoice History: Users can view and track past invoices for easy reference.
5. Product Management: Add, edit, and delete products in the inventory, with real-time updates.

# Tech Stack

1. Frontend: React, React Router, TailwindCSS
2. Backend: Node.js, Express.js, MongoDB, JWT
3. Deployment: AWS/Vercel

## Steps to setup project:

1. Clone the repository.
```bash
git clone 
cd inventorizer
```

2. Server Setup
```bash
npm i
```
Creatae a .env file in the server directory with:

```bash
PORT=4000
MONGO_URI=
JWT_SECRET=
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=
S3_BUCKET_NAME=
MAIL_USERNAME=
MAIL_PASSWORD=
OAUTH_CLIENTID=
OAUTH_CLIENT_SECRET=
OAUTH_REFRESH_TOKEN=
```

3. Frontend Setup

```bash
npm install
npm start
```

## API Endpoints

### Registration Routes
Base URL: /api/v1/registerRoutes

1. POST /
-This handles user creation, business details and intital product inventory.

### Auth Routes
Base URL : /api/v1/authRoutes
1. POST /login
-Login route which saves token as HTTP Cookie.

2. POST /logout
-Logout route which clears the cookie.

### User Routes
Base URL : /api/v1/userRoute

1. GET /me
-Authenticated route for getting user details for context.

### Business Routes
Base URL : /api/v1/businessRoute

1. GET /getDetails
-Authenticated route for getting business details for user.

2. GET /:businessId/products
-Authenticated route for getting products of a business.

3. PUT /:businessId/products/update
-Updating the quanitity of products.

4. POST /:businessId/products/add-new
-Adding new products

### Invoice Routes
Base URL : /api/v1/invoiceRoute

1. GET /:businessId/invoices
-To fetch details of existing invoices.

2. POST /:businessId/new
-To create new invoices.





