# 🎨 Creative Showcase (Task 1)

## Overview
**Creative Showcase** is a responsive Full Stack Single Page Application (SPA) where artists can upload and showcase their digital memories. It features a modern **Masonry Grid Layout** (Pinterest-style) and secure user authentication.

This project fulfills the **Task 1** requirements of the internship assessment, utilizing **React**, **Tailwind CSS**, and **Firebase** (Bonus Stack).

## 🚀 Features
1.  **Landing Page:** Displays a public gallery of images in a responsive masonry layout.
2.  **User Authentication:** Secure **Login** and **Sign Up** powered by Firebase Auth.
3.  **Private Dashboard:** Authenticated users can upload images with titles to their personal collection.
4.  **Public User Profiles:** Dynamic routing (`/profile/:userId`) allows sharing of specific user portfolios.
5.  **Responsive Design:** Fully optimized for mobile, tablet, and desktop using Tailwind CSS.

## 🛠️ Tech Stack
* **Frontend:** React (Vite), Tailwind CSS
* **Backend / DB:** Firebase Firestore & Authentication
* **Storage:** Cloudinary (for image hosting)
* **Routing:** React Router v6

## ⚙️ Installation & Setup

### 1. Prerequisites
Ensure you have **Node.js** (v16+) installed.

### 2. Install Dependencies
Navigate to the project folder and install the required packages:

cd task-1-creative-showcase
npm install
3. Environment Configuration
Note: For the purpose of this assessment, API keys are pre-configured in src/firebase.js to allow the reviewer to run the app immediately without setup.

4. Run the Application
Start the development server:

npm run dev
Open your browser to http://localhost:5173 (or the port shown in your terminal).

🧪 How to Test
Landing Page: Open the app to see the public gallery (includes dummy data + real user uploads).

Sign Up: Click "Sign Up" and create a test account.

Upload: Go to "My Dashboard," select an image, give it a title, and click Upload.

Verify: The image will appear in your "My Uploads" section and on the main Landing Page.

Profile: Click the "User Link" on any image card to view that specific user's public profile.

📂 Project Structure

src/
├── components/
│   └── Navbar.jsx       # Responsive navigation with Auth state
├── pages/
│   ├── Landing.jsx      # Public Gallery (Masonry Layout)
│   ├── Login.jsx        # Firebase Login
│   ├── Signup.jsx       # Firebase Registration
│   ├── Dashboard.jsx    # Private Upload Form & Gallery
│   └── UserProfile.jsx  # Dynamic User Portfolio
├── firebase.js          # Firebase Configuration
├── App.jsx              # Routing Logic
└── main.jsx             # Entry Point