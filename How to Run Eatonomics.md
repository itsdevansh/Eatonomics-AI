
# How to Run Eatonomics-AI

This guide provides detailed instructions for setting up and running the Eatonomics-AI project, which consists of a FastAPI backend and a React frontend.

---

## Prerequisites

- Node.js & npm
- Python 3.8+ with pip
- MongoDB (local installation or Docker)
- Git (to clone the repository if needed)

---

## 1. Environment Setup

### 1.1 Set Environment Variables

Open a terminal and set the required environment variables:

```bash
export MONGO_URL="mongodb://localhost:27017"
export SECRET_KEY="$(openssl rand -hex 32)"
export ALGORITHM="HS256"
```

To persist these variables across sessions, add them to your `.bashrc` or `.zshrc`.

### 1.2 Install MongoDB

**Option 1: Install locally on macOS**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Option 2: Use Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

**Verify MongoDB is running:**
```bash
# Local installation
brew services list | grep mongodb

# Docker
docker ps | grep mongodb
```

---

## 2. Backend Setup

Navigate to the project directory:
```bash
cd /path/to/your/project/root  # Replace with your actual path
```

**Create and activate a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
```

**Install dependencies:**
```bash
pip install fastapi uvicorn motor pymongo python-jose passlib python-multipart
```

### 2.2 Run the Backend

Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```

This will start your backend at: [http://localhost:8000](http://localhost:8000)

---

## 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd /path/to/your/project/root/Eatonomics-AI
```

### 3.1 Install Frontend Dependencies
```bash
npm install
```

### 3.2 Run the Frontend
```bash
npm run dev
```

This will start your frontend at: [http://localhost:8080](http://localhost:8080)

---

## 4. Using the Application

1. Open a browser and go to [http://localhost:8080](http://localhost:8080)
2. Sign up for a new account
3. Log in with your credentials
4. Use the Chat interface for meal planning
5. Access the Meal Planner
6. Update your profile in the Profile section

---

## 5. API Documentation

FastAPI automatically generates docs at: [http://localhost:8000/docs](http://localhost:8000/docs)

You can test API endpoints directly from this interface.

---

## 6. Running the Agent Workflows (Optional)

Run the grocery workflow for generating grocery lists and recipes:
```bash
cd /path/to/your/project/root
python -c "from Agents.master_agent import run_grocery_workflow; from app.models import UserProfile; profile = UserProfile(username='test', email='test@example.com', diet_preferences=['vegetarian'], allergies=['nuts'], budget=100); run_grocery_workflow(profile, 'your-jwt-token', 'I need a grocery list for the week')"
```

---

## 7. Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (`brew services list | grep mongodb` or `docker ps`)
- Verify `MONGO_URL` is correct

### Backend Issues
- Confirm Python version is 3.8+
- Ensure all required packages are installed
- Check for errors in the backend terminal

### Frontend Issues
- Node.js should be version 14.x+
- If dependencies are missing, rerun `npm install`
- If port 8080 is in use, update `vite.config.ts`

---

## 8. Shutdown Procedure

- Stop the frontend: `Ctrl + C` in the frontend terminal
- Stop the backend: `Ctrl + C` in the backend terminal

**Stop MongoDB:**
```bash
# Local
brew services stop mongodb-community

# Docker
docker stop mongodb
```
