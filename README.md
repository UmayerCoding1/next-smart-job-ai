# Smart Job AI 🚀

An AI-powered job matching platform that connects job seekers with their perfect opportunities using intelligent resume analysis and personalized job recommendations.

## ✨ Features

### For Job Seekers
- **AI Resume Analysis**: Upload your resume and get instant skill extraction and analysis
- **Smart Job Matching**: Get personalized job recommendations with compatibility scores
- **Advanced Search & Filters**: Find jobs by location, salary, experience level, and more
- **Job Applications**: Easy one-click job applications with custom questionnaires
- **Profile Management**: Complete profile setup with education, experience, and social links
- **Saved Jobs**: Bookmark and track your favorite job opportunities

### For Recruiters
- **Company Profile Management**: Create and manage detailed company profiles
- **Job Posting**: Post comprehensive job listings with custom application questions
- **Applicant Management**: Track and manage job applications
- **Analytics Dashboard**: Monitor job performance and applicant statistics

### Core Features
- **Real-time Job Matching**: Instant compatibility scoring between resumes and job requirements
- **Multi-role Authentication**: Separate interfaces for job seekers, recruiters, and admins
- **Social Login**: Google and Facebook authentication options
- **Email Verification**: Secure OTP-based email verification system
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI/UX**: Beautiful, intuitive interface built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email services

### State Management
- **Redux Toolkit** - Global state management
- **React Query** - Server state management
- **React Hook Form** - Form handling with Zod validation

### Authentication
- **Custom JWT Auth** - Secure authentication system
- **Social Login** - Google and Facebook OAuth
- **OTP Verification** - Email-based verification

## 📁 Project Structure

```
smart-job-ai/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── browse-jobs/       # Job browsing pages
│   ├── job-details/       # Job detail pages
│   ├── models/            # MongoDB schemas
│   └── features/          # Redux slices
├── components/            # Reusable components
│   ├── home/             # Homepage components
│   ├── ui/               # UI components
│   ├── form/             # Form components
│   └── custom/           # Custom components
├── lib/                  # Utilities and configurations
├── hooks/                # Custom React hooks
└── service/              # External service integrations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Email service (for OTP verification)

### Installation

## 1. Clone the repository


```bash
git clone https://github.com/UmayerCoding1/next-smart-job-ai.git
cd smart-job-ai
```
Click the copy icon on the top right corner of the code block 👆 to copy the commands.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Models

### User
- Job seekers and recruiters with role-based access
- Profile information, education, experience
- Social links and authentication details

### Job
- Comprehensive job listings with requirements
- Salary ranges, benefits, and application questions
- Company association and recruiter information

### Company
- Company profiles with industry and location
- Logo, website, and description
- Active status management

### ResumeAnalysis
- AI-extracted skills and keywords
- Experience level and education analysis
- Job title recommendations

### JobMatchScore
- Compatibility scoring between users and jobs
- Real-time matching algorithm results

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Key Features in Detail

### AI-Powered Job Matching
- Analyzes resume content to extract skills and experience
- Matches job requirements with candidate profiles
- Provides instant compatibility scores
- Suggests relevant job opportunities

### Advanced Search & Filtering
- Filter by location, salary range, experience level
- Search by job title, company, or keywords
- Sort by relevance, date, or salary
- Save search preferences

### Secure Authentication
- JWT-based authentication
- Social login integration
- Email verification with OTP
- Role-based access control

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Fast loading with Next.js optimizations
- Accessible UI components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
- Check the existing issues
- Create a new issue with detailed information
- Contact the development team

---

**Built with ❤️ using Next.js, React, and MongoDB**
