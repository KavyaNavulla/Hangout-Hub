🎉 HangoutHub

A modern web application for planning, sharing, and discovering hangout plans with friends.
Create detailed plans with timelines, budgets, images, and interact with the community through likes and comments.


✨ Features
🔐 Authentication

User registration & login

Secure JWT-based authentication

Protected API routes

User profile management

📋 Plan Management

Create Plans with:

Title & description

Budget tracking

Timeline (activity + location + time)

Multiple image uploads (Cloudinary)

Browse Plans:

Search by title, description, location

Budget filtering

Sort by likes, recent, budget

Responsive grid layout

💬 Social Features

Comments & questions

Creator replies

Like system

Lightbox image gallery

🎨 User Experience

Tailwind CSS modern UI

Glassmorphism elements

Smooth animations

Dark theme ready

Real-time feedback

🛠️ Tech Stack
Frontend

Next.js 16

React 19

Tailwind CSS 4

Client Components

Backend

Next.js Serverless API routes

MongoDB + Mongoose

JWT authentication

bcryptjs password hashing

Services

Cloudinary (image storage)

📋 Prerequisites

Node.js ≥ 18

npm / yarn / pnpm

MongoDB

Cloudinary account

🚀 Installation
1️⃣ Clone repository
git clone https://github.com/yourusername/hangouthub.git
cd hangouthub

2️⃣ Install dependencies
npm install

3️⃣ Create .env.local
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key

4️⃣ Start development server
npm run dev


Open:
👉 http://localhost:3000

📁 Project Structure
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
└── package.json

🔌 API Endpoints
Authentication

POST /api/auth/register

POST /api/auth/login

POST /api/logout

Plans

GET /api/plans/list

POST /api/plans

GET /api/plans/[id]

Comments

POST /api/comments

POST /api/comments/[id]/reply

Likes

POST /api/likes/[id]

POST /api/unlikes/[id]

Upload

POST /api/upload

Profile

GET /api/profile

POST /api/profile/update

🚧 Future Enhancements

 Follow users

 Social sharing

 Email notifications

 Tags/categories

 Map integration

 Export plan (PDF/share)