# Visualization Dashboard for Translation Analytics

## 📋 **Project Description**
This project is a **translation usage analytics dashboard** that visualizes user activity, language preferences, and API performance. Built with **React**, **Node.js**, **MongoDB**, and **Chart.js**, the dashboard provides interactive data insights such as:
- Translation frequency per language.
- API response time trends.
- User activity heatmaps.
- Real-time updates with **MongoDB** integration.

It delivers a responsive, interactive, and efficient way to monitor user activity logs while ensuring scalability and optimization.

---

## 🚀 **Core Features**

### 1. **Frontend Dashboard Development**
- **React** and **Chart.js** used to create:
  - **Bar and Line charts** for visualizing translation frequency and API response time trends.
  - **Heatmaps** to monitor user activity distribution over time.
- User-friendly **interactive filters** and **search functionality**:
  - Filter logs by language, date range, and search queries.
- Fully responsive design powered by **TailwindCSS**.

### 2. **Backend Integration**
- RESTful APIs built with **Node.js** and **Express** for:
  - Fetching logs from the **MongoDB** database.
  - Aggregating data for analytics and generating real-time statistics.
- **User activity logs** stored in MongoDB with real-time updates.

### 3. **Data Handling**
- Firebase integrated for secure user authentication and data access.
- Data aggregation pipelines implemented to calculate:
  - **Average API response time**.
  - **Total logs** and **action frequency**.

### 4. **Heatmap Integration**
- Added **user activity heatmaps** to identify busy periods and patterns in usage data.

### 5. **Responsive and Interactive Design**
- Fully interactive and responsive layout ensuring:
  - Clean **user experience** with TailwindCSS.
  - Real-time dynamic updates every 5 seconds.

---

## 🛠️ **Tech Stack**
### **Frontend**
- React.js
- Chart.js
- TailwindCSS

### **Backend**
- Node.js
- Express.js
- MongoDB

### **Tools & Libraries**
- Firebase (authentication)
- Mongoose (MongoDB integration)
- Heatmap.js (for user activity heatmaps)

---

## 📂 **Project Structure**
![image](https://github.com/user-attachments/assets/b5957c94-1a42-4572-8255-166791bfc45b)

## 📊 **API Endpoints**

### 1. **Fetch All Logs**
- **`GET /api/logs`**
- Returns all activity logs stored in MongoDB.

### 2. **Fetch Filtered Logs**
- **`GET /api/logs/filter`**
- Query Parameters:
  - `language`: Filter by translation language.
  - `startDate` and `endDate`: Filter logs within a date range.
  - `searchQuery`: Search by API response time or timestamp.

### 3. **Fetch Analytics**
- **`GET /api/logs/analytics`**
- Returns aggregated data:
  - Total logs.
  - Average response time.
  - User action frequencies.

---

## 📦 **Installation and Setup**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/translation-analytics-dashboard.git
   cd translation-analytics-dashboard
2. **Install Dependencies**
   - Backend
     ```bash
     cd ..frontend
     npm install
     npm install chart.js react-chartjs-2 firebase


  - Frontend
    ```bash
    cd backend
    npm install
    npm install express mongoose cors body-parser


  - Configure TailwindCSS
    ```bash
    npm install tailwindcss postcss autoprefixer
    npx tailwindcss init

  3. **Firebase Configuration Setup**
   - 1.create project on firebase console
       ```bash
       npm install firebase

  - 2.configure /frontend/src/firebaseConfig.js with your credentials
  ```bash
  const firebaseConfig = {
     apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID",
    };
```
4. **Starting project**
   1.Starting backend(Mongodb):after setting up mongodb on local directory
   ```bash
   #in cmd
   mongosh
   ```
   ```bash
   #/backend
   npm start
   ```
   2.Starting frontend
   ```bash
   #/frontend
   npm start
   ```

## Deployment Instructions
- 1.**Backend Development**
   - Use services like Heroku, AWS EC2, or Render to deploy the Node.js server.
- 2.**Frontend Development**
   - Use Vercel, Netlify, or GitHub Pages for React app deployment.
   
   

     

    
 
    
   
  








   
   

   
     


