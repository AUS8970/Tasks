<img src="" alt="Web Image" border="0">

# 🏢 **Task Management Application**  

A **modern web-based system** designed to **efficiently manage tasks, track progress, and organize workflows**. Users can add, edit, delete, and reorder tasks with a **drag-and-drop interface**, ensuring smooth project execution.
 
## 🌟 **Features**  
✅ **User Authentication** – Secure login via **Firebase Authentication (Google Sign-in)**.  
✅ **Task Categorization** – Tasks are classified into **To-Do, In Progress, and Done**.  
✅ **Drag & Drop Functionality** – Move tasks between categories and reorder tasks within a category.  
✅ **Real-time Updates** – Changes are saved instantly to the **MongoDB database**.  
✅ **Task Persistence** – Tasks remain in their last known state even after a page refresh.  
✅ **Minimalistic UI** – Clean, **responsive design** with a four-color scheme.  
✅ **Role-Based Access** – Secure access control using **JWT authentication**.  
✅ **Dark Mode** – Toggle between light and dark themes for better accessibility.  
✅ **Task Due Dates** – Tasks with due dates show **color-coded alerts** (e.g., overdue tasks appear red).  
✅ **Activity Log** – Track all task updates (e.g., "Task moved to Done"). 

## 🚀 **Tech Stack**  

### 🖥️ **Frontend**  
- **React + Vite** – Fast UI framework  
- **React Router** – Seamless navigation  
- **Tailwind CSS** – Modern styling framework  
- **React Beautiful DnD / DnD Kit** – Drag-and-drop functionality  
- **TanStack Query** – Efficient API data fetching  
- **Axios** – API handling for backend communication  
- **Recharts** – Task analytics & data visualization  

### 🔗 **Backend**  
- **Node.js & Express.js** – Server-side framework  
- **MongoDB** – NoSQL database for storing tasks  
- **Mongoose** – Schema modeling for MongoDB  
- **JWT (jsonwebtoken)** – Secure authentication  
- **bcrypt** – Password encryption  
- **MongoDB Change Streams** – Real-time task updates  
- **Socket.io** – WebSockets for real-time synchronization  

## 🛠️ **Installation**  

### 🖥️ **Frontend Setup**  
1. Clone the repository:  
   ```sh
   git clone https://github.com/AUS8970/Task-Management-App.git
   cd Task-Management-App
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the development server:  
   ```sh
   npm run dev
   ```
4. Create a `.env.local` file in the client directory and add:  
   ```env
   VITE_apiKey=your_apiKey
   VITE_authDomain=your_authDomain
   VITE_projectId=your_projectId
   VITE_storageBucket=your_storageBucket
   VITE_messagingSenderId=your_messagingSenderId
   VITE_appId=your_appId
   VITE_API_BASE_URL=your_api_base_url
   VITE_IMGBB_API_KEY=your_imgbb_api_key
   ```

### 🌍 **Backend Setup**  
1. Navigate to the server folder:  
   ```sh
   cd server
   ```
2. Install backend dependencies:  
   ```sh
   npm install
   ```
3. Start the server:  
   ```sh
   npm start
   ```
4. Create a `.env` file in the server directory and add:  
   ```env
   mongodbUri=your_mongobd_uri
   ACCESS_TOKEN_SECRET=your_access_token_secret (node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
   ```

## 🔧 **Configuration**  
- **Firebase Authentication**: Set up authentication in **Firebase Console**.  
- **MongoDB**: Use **MongoDB Atlas** for cloud storage or local MongoDB.  
- **WebSockets**: Configure **Socket.io** for **real-time task updates**.  

## 📜 **License**  
This project is licensed under the **MIT License**.  

## 🤝 **Contributing**  
Contributions are welcome! Feel free to fork the repository, create a new branch, and submit a pull request. 🚀 