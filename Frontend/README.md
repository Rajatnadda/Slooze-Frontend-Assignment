A full-stack inventory management application built using React, TailwindCSS, Context API, and a Node.js/Express API.
It includes authentication, role-based access, product management, and a clean light/dark theme toggle.

🚀 Features
🔐 Authentication & Authorization

Login & Register with JWT authentication.

Stores user session in localStorage.

Auto-attaches token on every API call.

Protected routes using <ProtectedRoute />.

Role-based access:

Manager → Can access Dashboard + Products

Store Keeper → Can access Products only

📦 Product Management

Add new products

Edit existing products

Delete products

Search products by name or ID

Automatic refresh after CRUD actions

🎨 Theme System

Light & Dark theme using TailwindCSS (dark: classes).

User’s theme is saved in localStorage.

Works across all pages (Sidebar, Topbar, Forms, Tables).

🧱 Frontend Stack

React 18

React Router

Context API (Auth + Theme)

Axios

TailwindCSS

React Icons

🗄 Backend API (Expected Endpoints)
Method	Endpoint	Description
POST	/api/auth/login	Login user
POST	/api/auth/register	Register new user
GET	/api/products	Fetch all products
POST	/api/products	Create product
GET	/api/products/:id	Get product by ID
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product
📁 Project Structure
src/
│── api/
│   └── api.js
│
│── components/
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   └── Icon.jsx
│
│── contexts/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
│── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── ProductForm.jsx
│   └── Unauthorized.jsx
│
│── routes/
│   └── ProtectedRoutes.jsx
│
│── utils/
│   └── local.js
│
│── App.jsx
│── index.jsx
│── index.css
│
tailwind.config.js
postcss.config.js
package.json
README.md