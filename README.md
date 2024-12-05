# TechCare Frontend

This repository contains the frontend of **TechCare**, a service provider platform connecting users with professional technicians for home repairs and maintenance.

## 🌟 Features
- **JWT Authentication**: Secure login and user session management.
- **Real-Time Chat**: Seamless user-technician communication using **Socket.io**.
- **Responsive Design**: Optimized for all devices.
- **Payment Integration**: Razorpay for secure online payments.
- **Media Handling**: **Cloudinary** integration for managing uploaded images.
- **Notifications**: Real-time updates for enhanced user experience.
- 🔒 JWT Authentication
- 💬 Real-time chat with Socket.io
- 💸 Razorpay payment integration
- 📧 Email OTP verification
- ☁️ Cloudinary media storage

## 🚀 Tech Stack
- **Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Utilities**: Axios, React Toastify, Socket.io Client
- **Build Tool**: Vite

## 💻 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YesudasZ/TechCare-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd TechCare-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application at:
   ```
   http://localhost:5173
   ```

## 📦 Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.

## 🌐 Live Application
[TechCare Live Site](https://www.techcare.live)

## 🔧 Tools & Libraries
- **Vite**: For fast development and optimized builds.
- **Redux Persist**: To maintain application state across sessions.
- **Socket.io Client**: For real-time communication.

## Deployment
- Hosted on Vercel
- Ensure all environment variables are configured in Vercel settings

## Project Structure
```
src/
├── components/
├── pages/
├── redux/
│   ├── slices/
│   └── store.js
├── services/
├── utils/
└── App.jsx
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License
This project is licensed under the MIT License.
