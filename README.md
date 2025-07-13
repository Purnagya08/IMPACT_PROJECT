🛡️ IMPAT – Intelligent Monitoring for Pattern Analysis and Criminal Tracking
🔍 Overview
IMPAT (Intelligent Monitoring for Pattern Analysis and Criminal Tracking) is a full-stack government-grade surveillance platform designed to monitor immigrants, detect suspicious travel behaviors, and analyze communication patterns for national security purposes. Powered by AI/ML and developed using the MERN stack, it provides an end-to-end solution to assist immigration and security authorities in identifying potential threats proactively.

“A vigilant eye on every move, every signal — for a safer tomorrow.”

🚀 Features
🛂 Immigrant Monitoring
Immigration data entry and profile tracking

Border-wise movement logs with time and location

Risk assessment based on travel frequency and route patterns

🌐 Travel Pattern Anomaly Detection
AI/ML-based detection of high-risk behavior:

Frequent short-term border crossings

Visits to flagged zones (e.g., J&K, NE borders)

Odd-hour border entries or use of remote transit routes

📞 Communication Behavior Analysis
Metadata monitoring of call/SMS logs (mock data)

Flags risky behavior such as:

Excessive calls to flagged countries

SIM swaps, burner phone activity

Sudden communication silence after spikes

🧠 Admin Intelligence Dashboard
Role-based access for Admin, Immigration Officers, and Airport Authority

Visual alerts for flagged profiles

Threat reporting and action logs

🏗️ Tech Stack
Layer	Technology
Frontend	React.js + Vite + Tailwind CSS
Backend	Node.js + Express.js
Database	MongoDB
Authentication	JWT + Role-Based Access Control (RBAC)
AI Engine	Flask (Python) – ML Models for risk detection
Deployment	Vite (frontend) + Node server (backend)

📁 Project Structure
pgsql
Copy
Edit
project/
│
├── react_frontend_tailwind/     → Vite + React + Tailwind UI
│   ├── src/                     → Components, pages, layouts
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                      → Node.js backend API
│   ├── routes/                  → API endpoints
│   ├── controllers/             → Business logic
│   └── models/                  → Mongoose schemas
│
└── ai-engine/ (expected)        → Python ML microservice (for demo)

🛠️ Getting Started

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/IMPACT.git
cd IMPACT

2. Install Backend Dependencies
bash
Copy
Edit
cd server
npm install
npm run dev

3. Setup Frontend (React + Vite)
bash
Copy
Edit
cd ../react_frontend_tailwind
npm install
npm run dev

4. (Optional) Start AI/ML Engine
If you are using an AI microservice:
bash
Copy
Edit
cd ../ai-engine
pip install -r requirements.txt
python app.py

🧪 Sample Demo Flow
Login as Admin → Dashboard
View flagged travelers (based on travel and call metadata)
Download risk reports (PDF/CSV export)
Change user risk status after review

🔒 Security & Roles
Role	Permissions
Admin	Full access to system, dashboard, flags
Immigration Officer	View travelers, flag behavior, assign status
Airport Authority	Access terminal-level movement logs

📄 License
This project is intended for academic, research, and government demonstration purposes only. Not to be used with real-world personal data without legal authorization.

👥 Contributors
Purnagya Raj – System Design, Frontend, AI Integration
Sayan Santra – Backend API, Authentication & Role Management
Pushkar Gupta – Machine Learning Models & Risk Analytics

🏛️ Organization
University of Engineering & Management, Jaipur
📍 India
