# Dental Disease Detection System - Frontend Client

This repository contains the React-based frontend client for the **Dental Disease Detection System**, a web-based application designed to help dentists upload radiographs (X-Rays), run instant YOLOv8 AI diagnostics, retrieve patient records, and automatically generate prescriptions.

---

## 📖 Project Overview

### Purpose
The client UI offers doctors an intuitive, responsive dashboard to manage clinical visit sessions, perform real-time AI computer vision disease detection on radiographs, and store historical records.

### Key Features
*   **Doctor Authentication**: Secure JWT-based Sign-In and Sign-Up authentication.
*   **Radiograph AI Scan**: High-performance upload module with overlayed dynamic bounding boxes and confidence score indicators for detected diseases (cavities, cysts, tartar, impactions).
*   **Prescription Automation**: Auto-suggests clinical medications, dosages, and instructions based on the predicted YOLOv8 labels, while leaving field inputs editable for custom notes.
*   **Patient Record Database**: Create, search, and manage patient profiles.
*   **Consultation History**: Retrieve and review chronological summaries of past patient checkups and detection results.

### Technologies Used
*   **Framework**: [React](https://react.dev/) (Single Page Application)
*   **Build Tool**: [Vite](https://vite.dev/) (for fast HMR and compilation)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **HTTP Client**: Axios (for Django API communication)

---

## 📂 Project Structure

```
Frontend/
├── components/                 # Reusable UI components
│   ├── Doctordashboard.jsx     # AI scanning panel and results preview
│   ├── PatientSearchCreate.jsx # Patient listing and query UI
│   ├── RegisterPatient.jsx     # Patient enrollment form
│   ├── PatientHistory.jsx      # Consultation logs list
│   ├── Signin.jsx / Signupbody.jsx # Security onboarding panels
│   └── Header.jsx / Footer.jsx # Layout boundaries
├── Pages/                      # Page views mapped to router paths
│   ├── Homepage.jsx            # Product marketing splash page
│   ├── Doctordashpage.jsx      # Main application dashboard layout
│   └── ...                     # Sub-pages and widget overlays
├── public/                     # Static root files (logos, backgrounds)
├── src/                        # Core app assets
│   ├── App.jsx                 # Routing configuration
│   ├── main.jsx                # React boot entrypoint
│   └── index.css               # Styling declarations
├── tailwind.config.js          # Tailwind utilities structure
└── vite.config.js              # Vite dev server and bundler config
```

---

## ⚙️ Prerequisites

*   **Node.js**: `v18.0.0` or higher (LTS versions like `v20` are recommended)
*   **npm**: `v9.0.0` or higher (or equivalent package manager like Yarn/PNPM)

---

## 🛠️ Installation & Setup

1.  Navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    *   Create a `.env` file in the `Frontend/` folder using the structure below.

---

## 🔒 Environment Variables

The application reads configuration parameters from environment variables prefixing with `VITE_`.

Create a `.env` file:
```env
# URL pointing to the running Django backend API
VITE_API_BASE_URL=http://localhost:8000
```
*An example template is available at [`.env.example`](file:///c:/New%20folder%20(2)/p2/Frontend/.env.example).*

---

## 🚀 Running the Project

### Start Development Server
```bash
npm run dev
```
By default, the hot-reloading dev server will launch at `http://localhost:5173`.

### Compile Production Build
```bash
npm run build
```
This compiles and minifies your React source files into static assets in the `/dist` directory.

### Preview Production Build Locally
```bash
npm run preview
```
Runs a local web server serving the `/dist` directory files to verify production builds before deploying.

---

## 🌐 Production Deployment

The frontend React application is compiled into pure static HTML, JavaScript, and CSS assets, making it compatible with edge-cached CDNs.

*   **Recommended Host**: [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
*   **Deployment Configuration**:
    *   **Root Directory**: `Frontend`
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
    *   **Environment Variable**: Set `VITE_API_BASE_URL` to your live backend domain (e.g. `https://your-backend.onrender.com`).

---

## 🔍 Troubleshooting

### CORS Network Failures
*   **Problem**: API requests fail with CORS errors in the browser console.
*   **Solution**: Ensure your frontend URL is registered in the backend settings environment variable `CORS_ALLOWED_ORIGINS` (without trailing slashes).

### Images or Logos Returning 404
*   **Problem**: Application logos are broken after building for production.
*   **Solution**: All static assets must reside in `/public/img/` and be referenced using absolute paths (e.g., `/img/logo.png`) instead of relative paths.

---

## 🤝 Contribution Guidelines

1.  Create a branch for your feature: `git checkout -b feature/your-feature-name`.
2.  Follow existing coding patterns, verify clean layouts, and ensure components are reusable.
3.  Write brief descriptions of changes, and verify the production build with `npm run build` before opening a pull request.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](file:///c:/New%20folder%20(2)/p2/Frontend/LICENSE) for details.
