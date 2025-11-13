# GrowVest - Micro-Lending Platform

A full-stack MERN application for micro-lending and savings management for small businesses.

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

## Installation & Setup

### 1. Clone or Download the Project

```bash
# Create the project directory
mkdir growvest-micro-lending
cd growvest-micro-lending
```

### 2. Backend Setup

```bash
# Create and navigate to backend folder
mkdir backend
cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express mongoose dotenv bcryptjs jsonwebtoken cors

# Install dev dependencies
npm install --save-dev nodemon
```

Create the following files in the backend folder:

- Copy all backend files from the artifacts above

**Update `backend/package.json` scripts:**

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

**Configure `.env` file:**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/growvest
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Frontend Setup

```bash
# Navigate back to root
cd ..

# Create frontend with Vite
npm create vite@latest frontend -- --template react
cd frontend

# Install dependencies
npm install

# Install additional packages
npm install react-router-dom axios

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Create all frontend files from the artifacts above.

**Update `tailwind.config.js`:**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#059669',
      },
    },
  },
  plugins: [],
}
```

**Create `.env` file in frontend:**

```env
VITE_API_URL=http://localhost:5000/api
```

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

### Option 2: Using Concurrent Commands (Optional)

Install `concurrently` in the root directory:

```bash
npm install concurrently
```

Add to root `package.json`:

```json
{
  "scripts": {
    "server": "cd backend && npm run dev",
    "client": "cd frontend && npm run dev",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
}
```

Then run:

```bash
npm run dev
```

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
