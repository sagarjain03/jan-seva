# JanSeva - Government Scheme Assistant

JanSeva is a digital platform to help citizens discover, apply for, and track government schemes in India. It supports multi-language, voice input, and both citizen and admin (government official) roles.

## Features

- Register as a citizen or government official
- Login and secure authentication (JWT, HttpOnly cookies)
- Discover 100+ government schemes with eligibility checks
- Apply for schemes and track application status
- Admin dashboard for managing schemes and applications
- Voice input for form fields (speech-to-text)
- Multi-language support (Hindi & English)
- Responsive UI with modern design

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sagarjain03/jan-seva
   cd janseva
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Edit `.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```
  

## Project Structure

- `/app` - Next.js App Router pages and API routes
- `/components` - Reusable React components
- `/db` - Database connection config
- `/models` - Mongoose models (User, Scheme, etc.)
- `/types` - TypeScript types and interfaces

## Important Routes

- `/register` - Registration page (entry point)
- `/login` - Login page
- `/dashboard` - User dashboard (protected)
- `/admin` - Admin dashboard (protected)
- `/form` - Eligibility form for schemes
- `/api` - REST API endpoints

## Environment Variables

See `.env` file:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## License

MIT

---

**Made with ❤️ for Digital Bharat Initiative**