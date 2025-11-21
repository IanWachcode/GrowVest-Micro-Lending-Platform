# GrowVest - Micro-Lending Platform

## Link to my pitch

<https://gamma.app/docs/fvhyg3zdu37i4wh>

## Project Outline

GrowVest Micro Lending Platform a full-stack MERN application for micro-lending and savings management for small businesses.

## Features

- 🔐 User Authentication (Register/Login)
- 💰 Loan Application System
- 🏦 Savings Account Management
- 📊 Dashboard with Financial Overview
- 💳 Transaction History
- 📱 Responsive Design with Tailwind CSS

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend

- React 18
- Vite
- React Router v6
- Tailwind CSS
- Axios for API calls

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local installation or MongoDB Atlas account)
- [Git](https://git-scm.com/)

## Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Project Structure in VS Code

```text
growvest-micro-lending/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── loanController.js
│   │   └── savingsController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Loan.js
│   │   └── Savings.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── loanRoutes.js
│   │   └── savingsRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ApplyLoan.jsx
│   │   │   └── Savings.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
└── README.md
```
