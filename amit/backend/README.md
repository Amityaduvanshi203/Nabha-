# AMIT College Backend

Backend API for AMIT College Management System

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create uploads directory:
```bash
mkdir uploads
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Make sure MongoDB is running on your system

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Teacher Routes
- `POST /api/teacher/upload` - Upload study materials
- `GET /api/teacher/materials` - Get uploaded materials
- `PUT /api/teacher/materials/:id` - Update material
- `DELETE /api/teacher/materials/:id` - Delete material
- `POST /api/teacher/courses` - Create course
- `GET /api/teacher/courses` - Get courses

### Student Routes
- `GET /api/student/courses` - Get student's courses
- `GET /api/student/materials` - Get study materials
- `GET /api/student/assignments` - Get assignments
- `POST /api/student/assignments/:id/submit` - Submit assignment
- `GET /api/student/attendance` - Get attendance
- `POST /api/student/courses/:id/enroll` - Enroll in course

### Parent Routes
- `GET /api/parent/children` - Get parent's children
- `GET /api/parent/child/:id/progress` - Get child's progress
- `GET /api/parent/child/:id/attendance` - Get child's attendance
- `GET /api/parent/child/:id/grades` - Get child's grades

### Admin Routes
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/approve` - Approve user
- `GET /api/admin/classes` - Get classes
- `GET /api/admin/reports` - Generate reports

## Database Schema

### Users
- **Roles**: student, teacher, parent, admin
- **Student fields**: rollNumber, class
- **Teacher fields**: subjects, assignedClasses
- **Parent fields**: children (array of student references)

### Courses
- title, subject, class, teacher, modules, enrolledStudents

### Assignments
- title, type (notes/videos/assignments/quizzes), subject, class, teacher, fileUrl, submissions

### Attendance
- student, class, date, status, subject, teacher

## Features

- JWT Authentication
- Role-based access control
- File upload support
- Input validation
- Rate limiting
- CORS enabled
- Error handling
- Security headers

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amit_college
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```
