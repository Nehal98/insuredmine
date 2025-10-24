# Node.js Technical Assessment - Insurance Policy Management System

A comprehensive Node.js application built with Express.js and MongoDB that handles insurance policy data management, featuring CSV data upload with worker threads, policy search and aggregation APIs, real-time CPU monitoring, and message scheduling capabilities.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Data Model](#data-model)
- [Worker Threads Implementation](#worker-threads-implementation)
- [CPU Monitoring](#cpu-monitoring)
- [License](#license)

---

## ✨ Features

### Task 1: Data Management APIs
- **CSV/Excel Upload**: Upload insurance policy data with worker threads for optimized performance
- **Policy Search**: Find policies by username with detailed information
- **Policy Aggregation**: Get aggregated policy statistics grouped by users
- **Normalized Data Structure**: Six separate MongoDB collections with proper relationships

### Task 2: System Utilities
- **Real-time CPU Monitoring**: Tracks CPU usage and automatically restarts server at 70% threshold
- **Message Scheduler**: Schedule messages to be inserted into database at specific day/time using cron jobs

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Processing**: csv-parser, multer
- **Concurrency**: Worker Threads
- **Scheduling**: node-cron
- **Environment Variables**: dotenv

---

## 📁 Project Structure

```
nodejs-assignment/
├── models/
│   ├── agent.js           # Agent schema
│   ├── user.js            # User schema
│   ├── account.js         # Account schema
│   ├── lob.js             # Line of Business (Policy Category) schema
│   ├── carrier.js         # Carrier (Insurance Company) schema
│   ├── policy.js          # Policy schema with relationships
│   └── message.js         # Scheduled message schema
├── routes/
│   ├── upload.js          # CSV upload endpoint
│   ├── search.js          # Policy search endpoint
│   ├── aggregate.js       # Policy aggregation endpoint
│   └── schedule.js        # Message scheduling endpoint
├── workers/
│   └── uploadWorker.js    # Worker thread for CSV processing
├── utils/
│   └── cpuMonitor.js      # CPU monitoring utility
├── uploads/               # Temporary file storage (auto-created)
├── sample-data/
│   └── data-sheet-Node-js-Assesment-2.csv  # Sample CSV file
├── .env                   # Environment variables (not in git)
├── .gitignore            # Git ignore file
├── server.js             # Main server entry point
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd nodejs-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages** (if not auto-installed)
   ```bash
   npm install express mongoose multer csv-parser node-cron dotenv
   ```

4. **Set up MongoDB**
   - Install MongoDB locally, OR
   - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

5. **Configure environment variables** (see next section)

---

## ⚙️ Configuration

Create a `.env` file in the project root:

```env
MONGO_URL=mongodb://localhost:27017/insurance_policy_db
PORT=3000
```

### For MongoDB Atlas:
```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/insurance_policy_db?retryWrites=true&w=majority
PORT=3000
```

**Important**: Never commit your `.env` file to Git. It's already added to `.gitignore`.

---

## 🔌 API Endpoints

### 1. Upload CSV Data
**Endpoint**: `POST /api/upload`

**Description**: Upload CSV/Excel file and insert data into MongoDB using worker threads.

**Request**:
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form-data with key `file` (type: File)

**Response**:
```json
{
  "message": "File uploaded and processed successfully"
}
```

**Collections Created**:
- `agents` - Agent information
- `users` - User personal details
- `accounts` - Account information
- `lobs` - Lines of Business (Policy Categories)
- `carriers` - Insurance carriers/companies
- `policies` - Policy details with relationships

---

### 2. Search Policy by Username
**Endpoint**: `GET /api/policy/:username`

**Description**: Find all policies associated with a specific user.

**Request**:
- Method: `GET`
- URL: `http://localhost:3000/api/policy/Alex`

**Response**:
```json
[
  {
    "_id": "...",
    "policy_number": "YEEX9MOIBU7X",
    "policy_start_date": "2018-11-02",
    "policy_end_date": "2019-11-02",
    "premium_amount": 1180.83,
    "user_id": "...",
    "agent_id": "...",
    "category_id": "...",
    "company_id": "..."
  }
]
```

---

### 3. Aggregate Policies by User
**Endpoint**: `GET /api/aggregate`

**Description**: Get aggregated policy count and details for each user.

**Request**:
- Method: `GET`
- URL: `http://localhost:3000/api/aggregate`

**Response**:
```json
[
  {
    "userId": "64f8a3b2c1d2e3f4a5b6c7d8",
    "userName": "Lura",
    "email": "madler@yahoo.ca",
    "totalPolicies": 5,
    "policies": ["YEEX9MOIBU7X", "7CZ3CLKWMSKH", "..."]
  },
  {
    "userId": "64f8a3b2c1d2e3f4a5b6c7d9",
    "userName": "Torie",
    "email": "mbalazin@mac.com",
    "totalPolicies": 3,
    "policies": ["ZSB972578CRV", "..."]
  }
]
```

---

### 4. Schedule Message
**Endpoint**: `POST /api/schedule`

**Description**: Schedule a message to be inserted into the database at a specific day and time.

**Request**:
- Method: `POST`
- Content-Type: `application/json`
- Body:
  ```json
  {
    "message": "Policy reminder for renewal",
    "day": "1",
    "time": "14:30"
  }
  ```

**Parameters**:
- `message`: The message text
- `day`: Day of week (0-6 where 0=Sunday, or range like "1-5")
- `time`: Time in 24-hour format (HH:mm)

**Response**:
```json
{
  "message": "Message scheduled successfully"
}
```

---

## 🧪 Testing with Postman

### 1. Upload CSV File
1. Create new POST request to `http://localhost:3000/api/upload`
2. Go to Body tab → select `form-data`
3. Add key: `file` (type: File)
4. Choose `sample-data/data-sheet-Node-js-Assesment-2.csv`
5. Click Send

### 2. Search Policy
1. Create new GET request to `http://localhost:3000/api/policy/Alex`
2. Click Send

### 3. Aggregate Policies
1. Create new GET request to `http://localhost:3000/api/aggregate`
2. Click Send

### 4. Schedule Message
1. Create new POST request to `http://localhost:3000/api/schedule`
2. Go to Body tab → select `raw` → choose `JSON`
3. Paste:
   ```json
   {
     "message": "Daily reminder",
     "day": "1-5",
     "time": "09:00"
   }
   ```
4. Click Send

---

## 📊 Data Model

### Collections and Relationships

```
agents
  └─ agent_name

users
  ├─ firstname
  ├─ dob
  ├─ address
  ├─ phone
  ├─ state
  ├─ zip
  ├─ email
  ├─ gender
  └─ userType

accounts
  └─ account_name

lobs (Line of Business)
  └─ category_name

carriers (Insurance Companies)
  └─ company_name

policies
  ├─ policy_number
  ├─ policy_start_date
  ├─ policy_end_date
  ├─ policy_mode
  ├─ premium_amount
  ├─ category_id (ref: lobs)
  ├─ company_id (ref: carriers)
  ├─ user_id (ref: users)
  ├─ agent_id (ref: agents)
  └─ account_id (ref: accounts)

messages
  ├─ message
  ├─ day
  ├─ time
  └─ createdAt
```

---

## 🧵 Worker Threads Implementation

The CSV upload process uses Node.js Worker Threads for improved performance:

```javascript
// Main thread (routes/upload.js)
const worker = new Worker('./workers/uploadWorker.js', {
  workerData: { filePath: req.file.path }
});

// Worker thread (workers/uploadWorker.js)
// Processes CSV rows and inserts into MongoDB
// Runs in parallel without blocking main thread
```

**Benefits**:
- Non-blocking file processing
- Better CPU utilization
- Faster data insertion
- Scalable for large files

---

## 📈 CPU Monitoring

The application includes real-time CPU monitoring:

**Location**: `utils/cpuMonitor.js`

**Features**:
- Checks CPU usage every 10 seconds
- Calculates usage percentage across all cores
- Automatically restarts server when usage exceeds 70%
- Logs CPU metrics to console

**Example Output**:
```
Background Monitoring is working...
CPU usage high, restarting server...
```

---

## 🏃 Running the Application

### Start the server
```bash
node server.js
```

### Expected console output
```
Server started on port 3000
MongoDB connected
Background Monitoring is working...
```

---

## 📝 Notes for Reviewers

### Task 1 Completion
✅ API for CSV upload with Worker Threads  
✅ Search API to find policies by username  
✅ Aggregated policy API by user  
✅ Six separate MongoDB collections with relationships

### Task 2 Completion
✅ Real-time CPU monitoring with auto-restart at 70%  
✅ POST service for message scheduling with cron jobs

### Code Quality
- Modular structure with separated concerns
- Error handling implemented
- Environment variable configuration
- MongoDB indexing for performance
- RESTful API design principles

---

