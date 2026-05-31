# 🛒 DEV Corner

A full-stack E-Commerce platform built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application provides a complete online shopping experience with authentication, product management, order processing, coupon support, blogs, enquiries, image uploads via Cloudinary, and email services.

---

## 🚀 Features

### 👤 Authentication & Users

* User Registration
* User Login
* JWT Authentication
* Password Encryption using bcrypt
* Protected Routes
* User Profile Management

### 🛍️ Product Management

* Product Listing
* Product Details
* Product Categories
* Product Brands
* Product Colors
* Featured Products
* Product Search & Filtering

### 🛒 Shopping Features

* Add to Cart
* Remove from Cart
* Update Cart Quantity
* Coupon Management
* Checkout Flow

### 📦 Order Management

* Create Orders
* Manage Orders
* Order Tracking

### 📝 Additional Modules

* Blog Management
* Customer Enquiries
* Email Notifications
* Coupon System

### ☁️ Media Management

* Product Image Uploads
* Cloudinary Integration

---

## 🧰 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js
* Nodemailer
* Cloudinary

---

## 📂 Project Structure

```bash
DEV-CORNER
│
├── backend
│   ├── Config
│   ├── Controllers
│   ├── Middlewares
│   ├── Models
│   ├── Routes
│   ├── Utils
│   ├── public
│   ├── index.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/dev-corner.git
cd dev-corner
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5050

MONGO_CONN=your_mongodb_connection_string

MAIL_ID=your_email@gmail.com
MAIL_PASSWORD=your_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

JWT_SECRET=your_jwt_secret
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd backend
npm start
```

Backend runs on:

```text
http://localhost:5050
```

### Start Frontend

```bash
cd frontend
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## 📡 API Modules

### User APIs

* Register User
* Login User
* Update Profile

### Product APIs

* Create Product
* Update Product
* Delete Product
* Get Product Details
* Search Products

### Category APIs

* Product Categories
* Brands
* Colors

### Coupon APIs

* Create Coupons
* Apply Coupons

### Blog APIs

* Create Blog
* Update Blog
* Delete Blog

### Enquiry APIs

* Customer Enquiries

### Order APIs

* Create Orders
* Manage Orders

---

## 📸 Screenshots

Add screenshots of:

* Home Page
* Product Page
* Cart Page
* Login/Register Page
* Admin Dashboard (if available)

---

## 🎯 Future Improvements

* Razorpay Payment Gateway
* Stripe Integration
* Admin Analytics Dashboard
* Product Reviews & Ratings
* Wishlist Feature
* Inventory Management
* Real-Time Order Tracking
* Email Verification & Password Reset

