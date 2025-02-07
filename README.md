# CreditSea - Full Stack Intern Assignment

## 📜 Overview
This project is a **MERN (MongoDB, Express, React, Node.js) stack application** that processes **XML files** containing **soft credit pull data from Experian**. The system includes:
- A **RESTful API** to upload, parse, and store XML data in MongoDB.
- A **React frontend** that fetches and displays the extracted reports.
- **State management using Redux** for real-time updates.
- **Robust error handling and logging** for reliability.

---

## 🚀 Features
### **Backend (Node.js & Express)**
✔ XML **file upload API** using Multer  
✔ **Data extraction** from XML files using `xml2js`  
✔ **MongoDB integration** with Mongoose  
✔ **RESTful API** for data retrieval  
✔ **Error handling & logging**  

### **Frontend (React)**
✔ **Responsive UI** using Tailwind CSS  
✔ **Real-time updates** via Redux  
✔ **Expandable credit reports** for better readability  
✔ **File upload system** with instant feedback  

### **Database (MongoDB)**
✔ Stores extracted credit report data  
✔ Optimized **schema design** for structured data storage  

---

## 📂 Folder Structure
```
creditsea-assignment/
│── backend/
│   ├── models/     # MongoDB schema
│   ├── routes/     # Express API routes
│   ├── uploads/    # Temporary XML file storage
│   ├── .env        # Environment variables
│   ├── server.js   # Main backend server
│   ├── package.json # Backend dependencies
│── frontend/
│   ├── src/
│   │   ├── components/ # React UI components
│   │   ├── store/     # Redux store
│   │   ├── App.js    # Main React component
│   │   ├── index.js  # React entry point
│   ├── .env          # Frontend API config
│   ├── package.json  # Frontend dependencies
│── README.md        # Documentation
```

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/creditsea-assignment.git
cd creditsea-assignment
```

### **2️⃣ Setup Backend**
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
npm start
```

### **3️⃣ Setup Frontend**
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` with:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

## 📡 API Endpoints

### **1️⃣ Upload XML File**
```http
POST /api/reports/upload
```
* **Body:** `multipart/form-data` (`file` as key)
* **Response:** `{"message": "Report uploaded successfully!"}`

### **2️⃣ Get Reports**
```http
GET /api/reports
```
* **Response:** JSON array of reports

## 🧪 Testing
* Run **backend tests**:
```bash
cd backend
npm test
```

* Run **frontend tests**:
```bash
cd frontend
npm test
```

## 🎥 Submission
✔ **GitHub Repo:** [Your Repo Link]
✔ **Live App:** [Deployed Link]
✔ **Demo Video:** [Video Link]

## 👨‍💻 Author
**Priyanshu Sidar**
📧 Email: [Your Email]
🔗 LinkedIn: [Your LinkedIn Profile]

---

🚀 **Thank you for reviewing my submission! Looking forward to your feedback.**
