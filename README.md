# 🎉 HangoutHub

A modern web application for **planning, sharing, and discovering hangout plans** with friends.  
Create detailed plans with **timelines, budgets, images**, and interact with the community through **likes and comments**.

---

## 🚀 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-9.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 🔐 Authentication
- User registration & login  
- Secure JWT-based authentication  
- Protected API routes  
- User profile management  

### 📋 Plan Management
- **Create detailed plans** with:
  - Title & description  
  - Budget tracking  
  - Timeline (activity + location + time)  
  - Upload multiple images via Cloudinary  
- **Browse plans** with:
  - Search by title, description, location  
  - Budget filtering  
  - Sorting by likes, budget, recent  
  - Responsive grid layout  

### 💬 Social Features
- Comment on plans  
- Creators can reply  
- Like system  
- Image gallery with lightbox  

### 🎨 UI/UX Highlights
- Tailwind-based modern UI  
- Glassmorphism effects  
- Smooth animations  
- Fully responsive  
- Dark theme optimized  
- Real-time feedback  

---

## 🛠️ Tech Stack Details

### Frontend
- Next.js 16 (App Router)  
- React 19  
- Tailwind CSS 4  

### Backend
- Next.js API Routes  
- MongoDB  
- Mongoose  
- JWT Authentication  
- bcryptjs  

### Services
- Cloudinary (image uploads)

---

## 📋 Prerequisites

- Node.js ≥ 18  
- npm / yarn / pnpm  
- MongoDB (local or Atlas)  
- Cloudinary account  

---

## 🚀 Installation

### 1️⃣ Clone repository
```bash
git clone https://github.com/yourusername/hangouthub.git
cd hangouthub
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Add environment variables  
Create a file **`.env.local`**:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
```

### 4️⃣ Start development server
```bash
npm run dev
```

Visit:  
👉 http://localhost:3000

---

## 📁 Project Structure

```
hangouthub/
├── app/
│   ├── api/
│   ├── auth/
│   ├── create/
│   ├── home/
│   ├── plan/
│   ├── profile/
│   ├── layout.js
│   └── page.js
├── components/
├── lib/
├── models/
├── middleware.js
├── public/
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🔌 API Endpoints

### Authentication
- POST `/api/auth/register`  
- POST `/api/auth/login`  
- POST `/api/logout`  

### Plans
- GET `/api/plans/list`  
- POST `/api/plans`  
- GET `/api/plans/[id]`  

### Comments
- POST `/api/comments`  
- POST `/api/comments/[id]/reply`  

### Likes
- POST `/api/likes/[id]`  
- POST `/api/unlikes/[id]`  

### Upload
- POST `/api/upload`  

### Profile
- GET `/api/profile`  
- POST `/api/profile/update`

---

## 🎯 Usage

### Creating a Plan
1. Login  
2. Click **Create Plan**  
3. Fill in:
   - Title  
   - Description  
   - Budget  
   - Timeline steps  
   - Upload images  
4. Publish the plan  

### Exploring Plans
- Browse all plans  
- Search & filter  
- Sort by popularity  

### Interacting
- Like plans  
- Comment & ask questions  
- View gallery  

---

## 🔒 Security Features

- bcrypt password hashing  
- JWT authentication  
- Protected API routes  
- Server-side input validation  

---

## 🚧 Future Enhancements

- [ ] Follow creators  
- [ ] Social media sharing  
- [ ] Email notifications  
- [ ] Plan categories/tags  
- [ ] Map integration  
- [ ] User ratings  
- [ ] Export plan as PDF  

---

## 🤝 Contributing

1. Fork  
2. Create feature branch  
3. Commit  
4. Push  
5. Submit PR  

---

## 📝 License

MIT License

---

## 👤 Author

**Your Name**  
GitHub: @yourusername  
Email: your.email@example.com  

---

## ⭐ Support

If you like this project, please ⭐ star the repo!
