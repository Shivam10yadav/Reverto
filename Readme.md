# Reverto

Reverto is a community-driven platform built to report, search, and reconnect lost and found items. The system operates on a full-stack JavaScript architecture featuring an organized Node.js API backend and a responsive single-page web application frontend.

---

## Technology Stack

The platform is engineered using modern technologies designed for speed, security, and clean presentation:

### Frontend Ecosystem
* Core Library: React (Single Page Application architecture)
* Routing: React Router DOM (Declarative client-side routing)
* Styling Engine: Tailwind CSS (Utility-first responsive framework)
* Animation Engine: Framer Motion (Smooth layout transitions)
* Iconography: Lucide React (Clean, minimal vector icon design)

### Backend Architecture
* Runtime Environment: Node.js
* Framework: Express.js (Minimalist, structured API layer)
* Database Engine: MongoDB (Document-based NoSQL object model)
* Database ODM: Mongoose (Schema validation and queries)

### Services and Cloud Providers
* Media Asset Storage: Cloudinary (Dynamic cloud image hosting and optimization)
* Real-Time Communication: Socket.io / WebSockets (Instant bi-directional messaging)

---

## Core System Features

### 1. User Identity and Access Control
* Secure Sessions: Account authentication with protected data endpoints.
* Role-Based Access Control: Separation between standard community members and platform administration actions.

### 2. Matching and Reporting Pipelines
* Lost Listings: Post complete dynamic descriptions, metadata, and tags mapping lost items.
* Found Listings: Catalog items found within specific locations to cross-reference against owner data.
* Image Delivery Network: Automatic processing and secure handling of physical item snapshots via Cloudinary.

### 3. Claim Management
* Verification Requests: Initiates formal ownership claims from an individual toward a listed found item.
* Proof Audit Trail: Tracks uploaded verification documentation and interaction histories throughout processing phases.

### 4. Communication and Alerts
* Real-Time Messaging: Direct text messaging channels syncing searchers and finders instantly.
* Push Notification Engine: Real-time updates concerning item updates, proximity matches, or claim status alterations.

---

## Global Directory Structure

```text
reverto/
├── frontend/                      # Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI elements (Hero, Navbar, Cards)
│   │   ├── context/            # Auth and Global State Management
│   │   ├── pages/              # Routed Views (Home, ReportLost, ReportFound, NotFound)
│   │   ├── App.jsx             # Core Layout Routing and Framework Setup
│   │   └── main.jsx            # DOM Mounting and Client Bootstrap
│
├── backend/                      # Backend API Application
│   ├── src/
│   │   ├── config/             # Database, Storage, and Environment Settings
│   │   ├── models/             # MongoDB Document Schemas (User, Item, Message)
│   │   ├── controllers/        # Logical Implementation Handlers
│   │   ├── routes/             # HTTP Route Mapping Endpoints
│   │   ├── middlewares/        # Security, Files, Roles, and Rate Limit Checks
│   │   └── services/           # Socket, Email, and Cloudinary Integration Hooks


1. Backend Setup
Navigate into the server folder, install dependencies, configure your variables, and boot the server:

cd server
npm install

Create a .env file in the server root:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

Start the development server:

npm run dev

2. Frontend Setup
Open a separate terminal window, navigate into the client directory, install assets, and launch the build runner:


cd client
npm install
npm run dev