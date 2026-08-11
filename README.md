# 🛒 E-Commerce Web Application

A modern **React-based e-commerce application** built to demonstrate frontend development, REST API integration, authentication, state management, routing, and CRUD functionality.

The project focuses on building a realistic shopping experience while applying modern React development practices.

---

## 🚀 Features

* 🔐 User Login & Authentication
* 👤 Current User & Token Management
* 🔄 Access Token Refresh
* 🛍️ Dynamic Product Listing
* 🔎 Product Search & Filtering
* 📦 Dynamic Product Details
* 💬 Product Comments
* ➕ Add Products
* ✏️ Update Products
* 🗑️ Delete Products
* 🔗 Dynamic Routing
* 📱 Responsive UI
* ⚡ Loading & Error Handling
* 💾 Persistent Authentication using `localStorage`

---

## 🧰 Tech Stack

### Frontend

* **React.js**
* **JavaScript (ES6+)**
* **JSX**
* **HTML5**
* **CSS3**
* **Bootstrap**

### React Ecosystem

* **React Router DOM** — client-side routing
* **React Hooks** — `useState`, `useEffect`, `useContext`, etc.
* **Context API** — shared authentication state
* **Redux Toolkit** — centralized state management

### API & Data

* **REST APIs**
* **DummyJSON API**
* JavaScript `fetch()` for API requests
* CRUD operations using HTTP methods:

  * `GET`
  * `POST`
  * `PUT/PATCH`
  * `DELETE`

### Storage & Authentication

* Access Tokens
* Refresh Tokens
* Bearer Authentication
* Browser `localStorage`

---

## 🔑 Authentication

The application integrates authentication through the DummyJSON REST API.

The authentication system supports:

1. User login
2. Access token handling
3. Refresh token handling
4. Fetching the authenticated user
5. Persistent login state
6. Logout and token removal

## Authentication state is managed through both **Context API** and **Redux Toolkit**, with tokens persisted in `localStorage`.

## 🔌 API Integration

The application communicates with REST endpoints to handle authentication, products, and comments.

Example operations include:

```text
GET     /products
GET     /products/:id
POST    /products/add
PUT     /products/:id
DELETE  /products/:id

GET     /comments
GET     /comments/post/:id
POST    /comments/add
PUT     /comments/:id
DELETE  /comments/:id
```

The application uses asynchronous `fetch()` requests to retrieve and manipulate API data.

---

## 🧠 State Management

The project demonstrates multiple approaches to state management:

* **useState** for component-level state
* **Context API** for shared authentication state
* **Redux Toolkit** for centralized authentication state
* **localStorage** for persistent token storage

This combination demonstrates practical understanding of both local and global state management in React.

---

## 📂 Project Structure

```text
src/
│
├── api/
│   ├── products.js
│   ├── comments.js
│   └── auth.js
│
├── components/
│   ├── ProductCard.jsx
│   └── ...
│
├── pages/
│   ├── Login.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── AddProduct.jsx
│   └── ...
│
├── context/
│   └── AuthContext.jsx
│
├── redux/
│   └── authSlice.js
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available on the local Vite development server.

---

## 🎯 Project Purpose

This project was developed as a practical React application to strengthen understanding of:

* Component-based architecture
* JSX and React Hooks
* Props and state
* Client-side routing
* REST API integration
* Authentication
* CRUD operations
* Context API
* Redux Toolkit
* Asynchronous JavaScript
* Persistent browser storage
* Responsive UI development

---

## 👨‍💻 Author

Muhammad Tuaha Shahzad

Built with React, REST APIs, and a focus on practical frontend development.

```

**One important point:** don't put every tiny implementation detail into the README. A professional README sells the project and explains its architecture; the actual code should demonstrate the depth. This version hits that balance.
```
