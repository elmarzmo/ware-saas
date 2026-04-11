# 🏭 Inventory Management SaaS

A full-stack, multi-tenant inventory management system built with Angular, Node.js, MongoDB, and AWS.  
This application allows organizations to manage products, track stock movements, monitor analytics, and control user access with role-based permissions.

---



##  [Live Demo](https://d3tgxl8tbyiz3f.cloudfront.net/login)
  
---

##  Screenshots

### LogIn

<img width="1598" height="1228" alt="image" src="https://github.com/user-attachments/assets/8a87f3c2-fce2-4fb6-a7ce-7e2efd21699a" />

### Products

<img width="1658" height="1277" alt="image" src="https://github.com/user-attachments/assets/431c4806-0f90-4e5c-a03e-3c3642ed4848" />


### Stock Management
<img width="1681" height="1301" alt="image" src="https://github.com/user-attachments/assets/23ee0c27-c54a-4960-af4d-690dfe381d19" />


### Analytics
<img width="1704" height="1257" alt="image" src="https://github.com/user-attachments/assets/3de55e00-3638-4ef6-be84-3fa49aa330c4" />


### Users
<img width="1680" height="982" alt="image" src="https://github.com/user-attachments/assets/7497a4b9-7912-4f70-a19b-8a3823fad351" />



---

##  Features

###  Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (Admin, Manager, Employee)
- Protected routes and admin-only pages

###  Multi-Tenant Architecture
- Each organization has isolated data
- Users belong to specific organizations

###  Product Management
- Create, update, delete products
- Unique SKU per organization
- Inventory tracking

###  Stock Movement System
- IN / OUT stock operations
- Movement history tracking
- Prevents invalid operations

###  Analytics Dashboard
- Top moving products
- Most active users
- Stock movement trends (charts)

###  Low Stock Alerts
- Detect products below threshold
- Background job processing using Redis + BullMQ

###  User Management
- Add users to organization
- Assign roles (admin, manager, employee)
- Admin-only access control

---

##  Tech Stack

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

##  Installation (Local Development)

###  Clone Repository

```bash
git clone https://github.com/elmarzmo/ware-saas.git
cd ware-saas
