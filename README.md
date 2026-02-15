# 📈 StockTradePro - Stock Trading Platform

A full-stack fintech application for stock trading simulation with real-time data, portfolio management, and transaction tracking.

## 🚀 Features

- **User Authentication** - Secure login/register with JWT
- **Real-time Stock Data** - Live stock prices and market indices
- **Portfolio Management** - Track holdings and portfolio value
- **Buy/Sell Stocks** - Simulated trading with order history
- **Watchlist** - Monitor favorite stocks
- **Transaction History** - Detailed trade records with export
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 18
- Redux + Redux Thunk
- React Router v6
- Tailwind CSS
- Chart.js / Recharts
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt

## 📋 Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Alpha Vantage API Key

## 🔧 Installation

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd StockTradePro
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Environment Variables

Create `.env` files in both `client/` and `server/` directories:

**server/.env:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stocktradepro
JWT_SECRET=your_jwt_secret_key_here
ALPHA_VANTAGE_API_KEY=your_api_key_here
NODE_ENV=development
```

**client/.env:**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ALPHA_VANTAGE_KEY=your_api_key_here
```

### 4. Run Application

**Start Backend (from server/ directory):**
```bash
npm run dev
```

**Start Frontend (from client/ directory):**
```bash
npm start
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## 📁 Project Structure
```
StockTradePro/
├── client/          # React frontend
├── server/          # Express backend
└── README.md
```

## 🧪 Testing
```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
npm test
```

## 🚀 Deployment

- Frontend: Vercel/Netlify
- Backend: Heroku/Render
- Database: MongoDB Atlas

## 👨‍💻 Author

[Your Name]

## 📄 License

MIT License