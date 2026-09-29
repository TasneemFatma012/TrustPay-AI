# TrustPay AI 🛡️

## Explainable Payment Trust & Intervention Layer

**TrustPay AI** is an AI-powered payment security prototype that analyzes transaction and behavioral signals, generates a real-time risk score, explains why a transaction is risky, and recommends an appropriate intervention.

### Core Flow

**Detect Risk → Explain Risk → Protect the Payment**

TrustPay AI provides four possible interventions:

* 🟢 **ALLOW** — Low-risk transaction
* 🟡 **VERIFY** — Additional verification required
* 🟠 **ASK USER** — User approval required
* 🔴 **HOLD** — High-risk transaction

---

## 🚀 Key Features

* Real-time payment risk analysis
* Risk score from **0–100**
* Explainable risk factors
* Transaction behavior analysis
* Beneficiary analysis
* Device analysis
* Location analysis
* Transaction timing analysis
* Fraud/anomaly risk assessment
* Allow / Verify / Ask / Hold decisions
* AI-agent payment limit checking
* React-based payment dashboard
* Node.js/Express backend
* Python-based risk engine
* REST API architecture

---

## 🏗️ System Architecture

```text
                    Payment Request
                          │
                          ▼
              ┌──────────────────────┐
              │ Transaction Context  │
              │ Amount               │
              │ Beneficiary          │
              │ Device               │
              │ Location             │
              │ Time                 │
              │ User Behavior        │
              └──────────┬───────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  AI Risk Engine │
                │                 │
                │ Risk Analysis   │
                │ Anomaly Checks  │
                │ Behavior Check  │
                └────────┬────────┘
                         │
                         ▼
                 ┌───────────────┐
                 │  Risk Score   │
                 │    0 - 100    │
                 └───────┬───────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Explainable AI  │
                │ "Why risky?"    │
                └────────┬────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   Decision Engine     │
             └───────────┬────────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       ALLOW          VERIFY        HOLD/ASK
```

---

# 📁 Project Structure

```text
TrustPay-AI/
│
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── ml-service/
│   ├── app.py
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

# 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* Vite
* CSS

### Backend

* Node.js
* Express.js
* REST API

### AI / Risk Engine

* Python
* Flask
* Risk scoring
* Behavioral/anomaly-based analysis

### Future AI/ML Models

* Scikit-learn
* Random Forest
* XGBoost
* Isolation Forest

### Future Infrastructure

* MongoDB
* Docker
* Permissioned ledger
* SHA-256 audit hashing

---

# ⚙️ Installation

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.10+
* Git
* VS Code

Check versions:

```bash
node --version
npm --version
python --version
git --version
```

---

# ▶️ Run the Project

The project contains three services:

```text
Frontend       → localhost:5173
Backend        → localhost:5000
ML Service     → localhost:5001
```

All three services should be running simultaneously.

---

## 1. Start Python ML Service

Open Terminal 1:

```powershell
cd ml-service
```

Create virtual environment:

```powershell
python -m venv venv
```

Activate it:

### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start the service:

```powershell
python app.py
```

ML service:

```text
http://localhost:5001
```

Keep this terminal running.

---

# 2. Start Node.js Backend

Open Terminal 2:

```powershell
cd backend
```

Install dependencies:

```powershell
npm install
```

Start the backend:

```powershell
npm start
```

Backend:

```text
http://localhost:5000
```

Keep this terminal running.

---

# 3. Start React Frontend

Open Terminal 3:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start development server:

```powershell
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

---

# 🧪 Testing the Demo

TrustPay AI includes three primary payment scenarios.

## 🟢 Test Case 1 — Normal Payment

### Input

```text
Amount: ₹1,200
Beneficiary: Known
Device: Known
Location: Normal
Time: Normal
```

### Expected Result

```text
Risk Score: 12/100
Decision: ALLOW
Risk Level: LOW
```

Example reasons:

```text
✓ Amount matches normal behavior
✓ Known beneficiary
✓ Known device
✓ Normal location
```

---

## 🟡 Test Case 2 — Suspicious Payment

### Input

```text
Amount: ₹18,000
Beneficiary: New
Device: Known
Location: Normal
Time: Late Night
```

### Expected Result

```text
Risk Score: ~67/100
Decision: VERIFY
Risk Level: MEDIUM
```

Possible reasons:

```text
⚠ Unusually high transaction amount
⚠ New beneficiary
⚠ Unusual transaction time
```

---

## 🔴 Test Case 3 — High-Risk Payment

### Input

```text
Amount: ₹75,000
Beneficiary: New
Device: New
Location: Unusual
Time: 02:30 AM
```

### Expected Result

```text
Risk Score: ~94/100
Decision: HOLD
Risk Level: HIGH
```

Possible reasons:

```text
⚠ New beneficiary
⚠ New device
⚠ Unusual transaction amount
⚠ Unusual location
⚠ Unusual transaction time
```

---

# 🤖 AI-Agent Payment Test

TrustPay AI can also simulate payments initiated by an AI shopping agent.

### Case 1 — Within User Limit

```text
User-approved limit: ₹70,000
Agent requested: ₹65,000
```

Expected:

```text
🟢 ALLOW
```

### Case 2 — Limit Exceeded

```text
User-approved limit: ₹70,000
Agent requested: ₹1,35,000
```

Expected:

```text
🟠 ASK USER
```

The system requests explicit user approval before proceeding.

---

# 🔍 Explainable Risk Example

Instead of simply displaying:

```text
FRAUD DETECTED
```

TrustPay AI provides contextual reasons:

```text
Risk Score: 87/100

Why is this payment risky?

⚠ New beneficiary
⚠ Amount significantly above normal average
⚠ New device detected
⚠ Unusual payment location
⚠ Unusual transaction time

Recommended Action:
VERIFY / HOLD
```

This makes the decision more understandable to users and fraud analysts.

---

# 🔐 Security & Privacy

The prototype follows a privacy-conscious architecture.

* No real bank credentials are required.
* No real UPI payment is processed.
* Demo transactions are simulated.
* Sensitive financial information should remain off-chain.
* Future audit functionality can store cryptographic proofs instead of raw financial data.
* Authentication and role-based access can be added for production deployment.

---

# 🎯 Hackathon Demo Flow

During the presentation, demonstrate the following:

### 1. Normal Payment

```text
₹1,200
↓
12/100
↓
ALLOW
```

### 2. Suspicious Payment

```text
₹18,000
↓
67/100
↓
VERIFY
```

### 3. High-Risk Payment

```text
₹75,000
↓
94/100
↓
HOLD
```

### 4. AI-Agent Payment

```text
Agent requests payment
↓
Check user-defined limit
↓
ALLOW or ASK USER
```

### Key Message

> **TrustPay AI does not only detect risk. It explains the risk and recommends an appropriate intervention.**

---

# 🔮 Future Scope

* UPI/payment-provider integration
* Bank and PSP integration
* Real-time fraud intelligence
* Fraud graph/network analysis
* Multilingual scam warnings
* Behavioral biometrics
* Federated learning
* Advanced anomaly detection
* AI-agent payment authorization
* Permissioned audit ledger
* Real-time fraud intelligence sharing

---

# ⚠️ Disclaimer

This repository is a **hackathon prototype** and does not process real financial transactions.

The risk scores and transaction scenarios are intended for demonstration and testing purposes and should not be treated as production fraud decisions.

---

# 👥 Team

| Role        | Responsibility                       |
| ----------- | ------------------------------------ |
| AI/ML       | Risk engine and anomaly detection    |
| Backend     | APIs and transaction processing      |
| Frontend    | Dashboard and user experience        |
| Security    | Privacy and audit layer              |
| Integration | Testing, deployment and presentation |

---

# 📌 Project Vision

### **Detect → Explain → Protect**

TrustPay AI aims to create an intelligent payment trust layer that helps make digital payments safer while giving users greater visibility and control over risky transactions.
