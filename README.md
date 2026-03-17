# ♻️ EcoWaste - Sustainable E-Waste Management Platform

EcoWaste is a comprehensive digital platform designed to streamline and incentivize electronic waste (e-waste) recycling and disposal. By combining AI-powered waste analysis, a flexible pickup request system, and a marketplace for recycled goods, EcoWaste empowers individuals and organizations to manage their electronic waste responsibly.

---

## 🚀 Key Features

### 🧠 1. AI Waste Analyzer
-   **Image Recognition**: Upload or capture photos of electronic items (chargers, batteries, old devices).
-   **AI categorization**: Powered by Google GenAI to identify the type of waste and provide recycling guidelines or hazard levels.
-   **Guidance**: Get immediate advice on whether an item is recyclable, hazardous, or suitable for direct pickup.

### 📅 2. Pickup Request System
-   **Standard Pickup**: Scheduled pickups based on AI-verified waste or items.
-   **Direct Pickup**: Quick booking form for non-analyzed items, allowing users to select preferred dates, times, and add notes.
-   **Role-Based Execution**: Connects users directly with approved drivers/collectors.

### 🛒 3. Marketplace
-   **Trade & Sell**: Users can list refurbished items or materials for sale or trade.
-   **Circular Economy**: Promotes reuse of components and devices, reducing raw material demand.

### 📊 4. Impact Dashboard
-   **Sustainability Metrics**: Track items recycled over time.
-   **Visual Analytics**: View environmental impact (e.g., carbon footprint reduction, materials recovered).

---

## 🛠️ Technology Stack

### 💻 Frontend (`/client`)
-   **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/) & TypeScript
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query/latest)
-   **Routing**: [React Router v7](https://reactrouter.com/)
-   **State/Utils**: [Axios](https://axios-http.com/) for API calls, `jwt-decode` for auth.

### ⚙️ Backend (`/server`)
-   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
-   **Database**: [MongoDB](https://www.mongodb.com/) (via `motor` async driver)
-   **AI SDK**: Google GenAI integration for automated waste analysis.
-   **Security**: `PyJWT` for authentication and token handling.
-   **Validation**: `Pydantic` for schema verification.

---

## 📂 Project Structure

```text
EcoWaste/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── pages/         # View components (Homepage, Dashboard, Marketplace)
│   │   ├── components/    # Reusable UI elements
│   │   ├── api/           # Service layer for backend communication
│   │   └── Layouts/       # Navbar, Footer, and Shell components
│   └── package.json
│
├── server/                 # Backend FastAPI Server
│   ├── app/
│   │   ├── api/           # Routers (Auth, Users, Analyzer, Pickup, Marketplace)
│   │   ├── core/          # App setup, Settings, and Security configs
│   │   ├── db/            # Database connections
│   │   └── models/        # Pydantic schemas (User, Item, Request)
│   └── requirements.txt
```

---

## 🛠️ Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/) (specifically Bun or npm)
-   [Python 3.10+](https://www.python.org/)

### 1. Running the Frontend
Navigate to the client directory and run the dev server:
```bash
cd client
bun run dev
# or
npm run dev
```

### 2. Running the Backend
Navigate to the server directory and start the uvicorn server:
```bash
cd server
uv run uvicorn app.main:app --reload
```
The API docs will be available at `http://localhost:8000/docs` or equivalent path set.

---

## 👥 Roles & Workflows

1.  **User**: Can analyze items, request pickups, and browse/list index items on marketplace.
2.  **Driver**: Receives pickup requests, views schedules, and coordinates item retrieval.
3.  **Admin**: Oversees platform data, manages user roles, and maintains network health.
