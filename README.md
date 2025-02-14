# E-Commerce Application

## Overview
This is a MERN stack-based e-commerce application that allows users to browse products, add items to their cart, place orders, and manage their accounts.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT & Cookies

## Features
- User authentication & authorization
- Product listing & filtering
- Cart management
- Order management
- Admin panel for product & order management

## Installation

### Backend Setup
```sh
cd backend
npm install
npm start
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

## API Routes

### **Authentication**

#### **Register User**
- **POST** `/api/auth/register`
- **Request:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token"
  }
  ```

#### **Login User**
- **POST** `/api/auth/login`
- **Request:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token"
  }
  ```

### **Products**

#### **Get All Products**
- **GET** `/api/products`
- **Response:**
  ```json
  [
    {
      "_id": "product_id",
      "name": "Product Name",
      "price": 100,
      "description": "Product description",
      "category": "Electronics",
      "stock": 10
    }
  ]
  ```

#### **Get Single Product**
- **GET** `/api/products/:id`
- **Response:**
  ```json
  {
    "_id": "product_id",
    "name": "Product Name",
    "price": 100,
    "description": "Product description",
    "category": "Electronics",
    "stock": 10
  }
  ```

### **Cart**

#### **Add to Cart**
- **POST** `/api/cart`
- **Request:**
  ```json
  {
    "productId": "product_id",
    "quantity": 1
  }
  ```
- **Response:**
  ```json
  {
    "message": "Product added to cart"
  }
  ```

#### **Get Cart**
- **GET** `/api/cart`
- **Response:**
  ```json
  [
    {
      "product": "product_id",
      "quantity": 1
    }
  ]
  ```

### **Orders**

#### **Place Order**
- **POST** `/api/orders`
- **Request:**
  ```json
  {
    "items": [
      {
        "product": "product_id",
        "quantity": 1
      }
    ],
    "totalPrice": 100
  }
  ```
- **Response:**
  ```json
  {
    "message": "Order placed successfully",
    "orderId": "order_id"
  }
  ```

#### **Get User Orders**
- **GET** `/api/orders`
- **Response:**
  ```json
  [
    {
      "_id": "order_id",
      "items": [
        {
          "product": "product_id",
          "quantity": 1
        }
      ],
      "totalPrice": 100
    }
  ]
  ```

## Admin Panel Routes

#### **Add Product** (Admin Only)
- **POST** `/api/admin/products`
- **Request:**
  ```json
  {
    "name": "New Product",
    "price": 200,
    "description": "A great product",
    "category": "Clothing",
    "stock": 50
  }
  ```
- **Response:**
  ```json
  {
    "message": "Product added successfully"
  }
  ```

#### **Get All Orders** (Admin Only)
- **GET** `/api/admin/orders`
- **Response:**
  ```json
  [
    {
      "_id": "order_id",
      "user": "user_id",
      "totalPrice": 100
    }
  ]
  ```

## Environment Variables
Create a `.env` file in the backend directory and add the following:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

