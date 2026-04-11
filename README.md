# 🏭 Inventory Management SaaS

A full-stack, multi-tenant inventory management system built with Angular, Node.js, MongoDB, and AWS.  
This application allows organizations to manage products, track stock movements, monitor analytics, and control user access with role-based permissions.

---



## 🌐 [Live Demo](https://d3tgxl8tbyiz3f.cloudfront.net/login)
  
---

## 📸 Screenshots

### Dashboard
![LogIn page](<img width="1598" height="1228" alt="image" src="https://github.com/user-attachments/assets/0dd748e5-8970-4854-b9b6-7c1169beb212" />
)

### Products
![Products](./screenshots/products.png)

### Stock Management
![Stock](./screenshots/stock.png)

### Analytics
![Analytics](./screenshots/analytics.png)

---

## 🧠 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (Admin, Manager, Employee)
- Protected routes and admin-only pages

### 🏢 Multi-Tenant Architecture
- Each organization has isolated data
- Users belong to specific organizations

### 📦 Product Management
- Create, update, delete products
- Unique SKU per organization
- Inventory tracking

### 🔄 Stock Movement System
- IN / OUT stock operations
- Movement history tracking
- Prevents invalid operations

### 📊 Analytics Dashboard
- Top moving products
- Most active users
- Stock movement trends (charts)

### 🚨 Low Stock Alerts
- Detect products below threshold
- Background job processing using Redis + BullMQ

### 👥 User Management
- Add users to organization
- Assign roles (admin, manager, employee)
- Admin-only access control

---

## 🛠️ Tech Stack

### Frontend
- Angular (Standalone Components)
- TypeScript
- Chart.js (Data Visualization)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### DevOps & Cloud
- AWS EC2 (Backend Hosting)
- AWS S3 (Frontend Hosting)
- PM2 (Process Management)

### Other
- JWT Authentication
- Redis + BullMQ (Background Jobs)
- RESTful APIs

---

## ⚙️ Installation (Local Development)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/elmarzmo/ware-saas.git
cd ware-saas
