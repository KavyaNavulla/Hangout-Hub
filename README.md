# 🎉 HangoutHub

A modern web application for planning, sharing, and discovering hangout plans with friends. Create detailed hangout plans with timelines, budgets, images, and interact with the community through comments and likes.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-9.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔐 Authentication
- User registration and login
- Secure JWT-based authentication
- Protected routes and API endpoints
- User profile management

### 📋 Plan Management
- **Create Plans**: Build detailed hangout plans with:
  - Title and description
  - Budget tracking
  - Timeline with activities, locations, and time slots
  - Multiple image uploads (via Cloudinary)
- **Browse Plans**: Explore community-created plans with:
  - Advanced search (by title, description, location)
  - Budget filtering (min/max)
  - Sorting options (likes, budget, recent)
  - Responsive grid layout

### 💬 Social Features
- **Comments & Questions**: Ask questions about plans
- **Creator Replies**: Plan creators can reply to comments
- **Likes System**: Like your favorite plans
- **Image Gallery**: View plan images in an interactive gallery with lightbox

### 🎨 User Experience
- Modern, responsive UI with Tailwind CSS
- Glassmorphism design elements
- Smooth animations and transitions
- Dark theme optimized interface
- Real-time feedback messages

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0** - React framework with App Router
- **React 19.2** - UI library
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Client Components** - Interactive UI components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Services
- **Cloudinary** - Image upload and storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **MongoDB** (local instance or MongoDB Atlas account)
- **Cloudinary** account (for image uploads)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hangouthub.git
   cd hangouthub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
hangouthub/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── comments/        # Comment management
│   │   ├── likes/           # Like/unlike endpoints
│   │   ├── plans/           # Plan CRUD operations
│   │   ├── profile/          # User profile endpoints
│   │   └── upload/          # Image upload endpoint
│   ├── auth/                # Auth pages (login/signup)
│   ├── create/              # Create plan page
│   ├── home/                # Home/explore page
│   ├── plan/                # Plan detail pages
│   ├── profile/             # User profile pages
│   ├── layout.js            # Root layout
│   └── page.js              # Landing/login page
├── components/              # Reusable React components
│   ├── CommentForm.jsx      # Comment submission form
│   ├── ImageGallery.jsx     # Image gallery with lightbox
│   ├── Navbar.jsx           # Navigation bar
│   └── ReplyForm.jsx        # Reply form for creators
├── lib/                     # Utility functions
│   └── db.js                # MongoDB connection
├── models/                  # Mongoose schemas
│   ├── Comment.js           # Comment model
│   ├── Plan.js              # Plan model
│   └── User.js              # User model
├── middleware.js            # Next.js middleware
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/logout` - User logout

### Plans
- `GET /api/plans/list` - Get all plans
- `POST /api/plans` - Create a new plan
- `GET /api/plans/[id]` - Get plan details

### Comments
- `POST /api/comments` - Create a comment
- `GET /api/comments` - Get comments for a plan
- `POST /api/comments/[id]/reply` - Reply to a comment (creator only)

### Likes
- `POST /api/likes/[id]` - Like a plan
- `POST /api/unlikes/[id]` - Unlike a plan

### Upload
- `POST /api/upload` - Upload image to Cloudinary

### Profile
- `GET /api/profile` - Get user profile
- `POST /api/profile/update` - Update user profile

## 🎯 Usage

### Creating a Plan
1. Log in to your account
2. Click the **"Create Plan"** button on the home page
3. Fill in the plan details:
   - Title and description
   - Budget amount
   - Upload images
   - Add timeline steps (time, activity, location)
4. Submit to publish your plan

### Exploring Plans
1. Browse plans on the home page
2. Use search and filters to find plans:
   - Search by title, description, or location
   - Filter by budget range
   - Sort by likes, budget, or date
3. Click on a plan to view full details

### Interacting with Plans
- **Like**: Click the like button to show appreciation
- **Comment**: Ask questions or share thoughts
- **Reply**: Plan creators can reply to comments
- **View Gallery**: Click images to view in full-screen lightbox

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Server-side validation
- Creator-only reply functionality

## 🎨 UI/UX Highlights

- **Modern Design**: Glassmorphism effects and gradient backgrounds
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Animations**: Smooth transitions and hover effects
- **Dark Theme**: Eye-friendly dark color scheme
- **Accessibility**: Semantic HTML and proper form labels

## 🚧 Future Enhancements

- [ ] User following system
- [ ] Plan sharing via social media
- [ ] Email notifications
- [ ] Advanced filtering options
- [ ] Plan categories/tags
- [ ] User ratings and reviews
- [ ] Map integration for locations
- [ ] Plan export functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the robust database solution
- Cloudinary for image management services

---

⭐ If you like this project, please give it a star on GitHub!
#   H a n g o u t - H u b  
 