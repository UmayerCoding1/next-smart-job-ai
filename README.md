# Smart Job AI 🤖

> An AI-powered full-stack job portal that connects job seekers with their perfect opportunities using intelligent resume analysis, real-time job matching, and role-based dashboards for Admins, Recruiters, and Job Seekers.

🔗 **Repository:** [github.com/UmayerCoding1/next-smart-job-ai](https://github.com/UmayerCoding1/next-smart-job-ai)

---

## ✨ Features

### 👤 Job Seekers
- **AI Resume Analysis** — Upload your resume for instant skill extraction and keyword analysis
- **Smart Job Matching** — Get AI-generated compatibility scores (match %) between your profile and jobs
- **AI Career Path** — Personalized AI career suggestions and roadmaps
- **Job Applications** — Apply with resume, cover letter, and custom questionnaire responses
- **Applied / Saved Jobs** — Track applications and bookmark favorite listings
- **Profile Management** — Education, experience, social links, and avatar upload
- **Inbox** — Receive interview invitations and recruiter messages

### 🏢 Recruiters
- **Job Posting** — Post jobs with salary ranges, benefits, requirements, and screening questions
- **Applicant Management** — Review, shortlist, test, interview, and hire candidates
- **AI Match Score** — See AI-generated resume-to-job compatibility scores per applicant
- **Cover Letter PDF** — View and download generated cover letter PDFs
- **Interview Scheduling** — Send interview invitations with date, time, mode (Online/Offline), and meeting links
- **Applications Dashboard** — Filter by status: New, Pending, Reviewed, Interview, Accepted, Rejected
- **My Jobs** — Manage Open, Closed, and Draft job listings

### 🛡️ Admin
- **Platform Overview** — Live stats: Total Users, Active Jobs, Applications, Revenue, Recruiters, Flagged Content
- **All Jobs Management** — View, approve, close, flag, and delete any job listing
- **User Management** — Browse recently registered users with role and status controls
- **System Activity Feed** — Real-time log of platform events
- **Platform Health** — Live metrics: Server Uptime, AI Match Rate, Job Fill Rate, User Retention
- **Quick Actions** — Approve recruiters, review flags, manage users, view reports

### 🔐 Auth & Core
- **JWT Authentication** — Secure access tokens with role-based route protection
- **OTP Email Verification** — Nodemailer-powered OTP for account verification
- **Social Login** — Google and Facebook OAuth integration
- **Middleware Guards** — Route-level access control per role (admin / recruiter / jobseeker)
- **IndexedDB** — Client-side draft job persistence via `idb`

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router + Turbopack) | Full-stack React framework |
| **React 19** | UI rendering |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **Radix UI** | Accessible component primitives |
| **shadcn/ui** | Pre-built component library |
| **Framer Motion** | Animations & transitions |
| **Lucide React** | Icon library |
| **Recharts** | Charts and data visualization |
| **React CountUp** | Animated number counters |
| **React Hook Form + Zod** | Form handling and schema validation |
| **@react-pdf/renderer** | Cover letter PDF generation |
| **React Day Picker / Datepicker** | Date selection |

### Backend (Next.js API Routes)
| Technology | Purpose |
|---|---|
| **MongoDB + Mongoose** | Database and ODM |
| **JWT + bcryptjs** | Auth tokens & password hashing |
| **Nodemailer** | OTP email delivery |
| **Google Generative AI (Gemini)** | AI job matching and career suggestions |
| **OpenAI** | AI-powered resume analysis |
| **pdf-parse / unpdf** | Resume PDF text extraction |
| **ImageKit** | Image upload and CDN |
| **LRU Cache** | Server-side caching |

### State Management
| Technology | Purpose |
|---|---|
| **Redux Toolkit** | Global app state (auth, dashboard, applications) |
| **React Redux** | React bindings |
| **TanStack React Query** | Server-state fetching & caching |

---

## 📁 Project Structure

```
smart-job-ai/
├── app/
│   ├── (pages)/
│   │   ├── dashboard/
│   │   │   ├── admin/          # Admin dashboard (overview, all-jobs)
│   │   │   ├── recruiter/      # Recruiter dashboard (my-jobs, applications, inbox, post-job)
│   │   │   └── jobseeker/      # Jobseeker dashboard (overview, applied-jobs, saved-jobs, ai-features, inbox)
│   │   ├── browse-jobs/        # Public job listings
│   │   └── job-details/        # Public job detail page
│   ├── api/
│   │   ├── auth/               # Login, register, OTP, social login
│   │   ├── jobs/               # CRUD, apply, save, AI match
│   │   ├── recruiter/          # Recruiter-specific APIs (applications, summaries, messages)
│   │   ├── jobseekers/         # Jobseeker profile APIs
│   │   ├── company/            # Company profile APIs
│   │   ├── resume/             # Resume upload and analysis
│   │   └── cron/               # Scheduled tasks
│   ├── models/                 # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Job.ts
│   │   ├── Application.ts
│   │   ├── Company.ts
│   │   ├── Resume.ts
│   │   ├── ResumeAnalysis.ts
│   │   ├── JobMatchScore.ts
│   │   ├── SaveJob.ts
│   │   ├── SendMessage.ts
│   │   ├── Notification.ts
│   │   └── Report.ts
│   └── redux/                  # Redux slices and store
├── components/
│   ├── dashboard/
│   │   ├── admin/              # Admin dashboard components
│   │   ├── recruiter/          # Recruiter dashboard components
│   │   └── jobseeker/          # Jobseeker dashboard components
│   ├── home/                   # Homepage sections
│   ├── shared/                 # Shared: Sidebar, Slider, Charts, Calendar, Table
│   ├── form/                   # Custom form inputs
│   └── ui/                     # shadcn/ui component library
├── hooks/                      # Custom React hooks
├── lib/                        # DB connection, utilities, types, mock data
├── service/                    # External services (nodemailer, ImageKit, PDF, AI)
├── utils/                      # Utility functions (IndexedDB, match score, etc.)
└── middleware.ts               # Route protection middleware
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas or local MongoDB instance
- Gmail account (for Nodemailer OTP)
- ImageKit account (for image uploads)
- Google / Facebook OAuth app credentials

### 1. Clone the repository

```bash
git clone https://github.com/UmayerCoding1/next-smart-job-ai.git
cd smart-job-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Auth
JWT_SECRET=your_jwt_secret_key

# Email (Nodemailer)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Social OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# AI
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Database Models

| Model | Description |
|---|---|
| `User` | Job seekers, recruiters, and admins with role-based profiles |
| `Job` | Job listings with salary, requirements, questions, and status |
| `Application` | Job applications with match score, status, and CV data |
| `Company` | Recruiter company profiles with industry, logo, and location |
| `Resume` | Uploaded resume file references |
| `ResumeAnalysis` | AI-extracted skills, keywords, and experience level |
| `JobMatchScore` | Cached AI compatibility scores between users and jobs |
| `SaveJob` | Bookmarked jobs per user |
| `SendMessage` | Interview invitation messages from recruiters |
| `Notification` | In-app user notifications |
| `Report` | Flagged content reports |

---

## 🔧 Available Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

**Built with ❤️ by [UmayerCoding1](https://github.com/UmayerCoding1) — Next.js · MongoDB · Google Gemini AI**
