# grvzProjectForm - Yamaha Registration System

A production-ready Next.js web application for Yamaha registrations with secure data handling, built following Airbnb's design system and coding style guidelines.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Secure File Uploads**: ImageKit integration with client and server-side validation
- **Database**: Prisma ORM with Neon PostgreSQL
- **Form Validation**: Zod schema validation on both client and server
- **Responsive Design**: Airbnb-inspired design system
- **Security**: Rate limiting, duplicate prevention, secure API routes
- **Production Ready**: Optimized for deployment on Vercel

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Neon PostgreSQL database account
- ImageKit account

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd grvzForm
npm install
```

### 2. Database Setup (Neon PostgreSQL)

1. Create a free account at [Neon](https://neon.tech)
2. Create a new project
3. Copy your connection string (it looks like: `postgresql://user:password@host/database?sslmode=require`)

### 3. ImageKit Setup

1. Create a free account at [ImageKit](https://imagekit.io)
2. Go to Developer Options in your dashboard
3. Copy:
   - Public Key
   - Private Key
   - URL Endpoint

### 4. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key"
IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_imagekit_id"

# Security
API_SECRET_KEY="generate_a_random_secret_key_here"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Generate a secure API secret key:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Database Migration

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view your database
npx prisma studio
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
grvzForm/
├── app/
│   ├── api/
│   │   ├── imagekit-auth/
│   │   │   └── route.ts          # ImageKit authentication endpoint
│   │   └── registrations/
│   │       └── route.ts           # Registration CRUD operations
│   ├── globals.css                # Global styles & Tailwind
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   └── RegistrationForm.tsx       # Main registration form component
├── lib/
│   ├── api-utils.ts               # API helpers & security utilities
│   ├── imagekit.ts                # ImageKit configuration & upload
│   ├── prisma.ts                  # Prisma client singleton
│   └── validation.ts              # Zod validation schemas
├── prisma/
│   └── schema.prisma              # Database schema
├── .env.example                   # Environment variables template
├── .eslintrc.json                 # ESLint config (Airbnb style)
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind config (Airbnb colors)
└── tsconfig.json                  # TypeScript configuration
```

## 🔒 Security Features

1. **Client-Side Validation**:
   - File type validation (JPG/PNG only)
   - File size validation (max 25MB)
   - Form field validation using Zod schemas

2. **Server-Side Validation**:
   - Double validation on API routes
   - Duplicate Yamaha ID prevention
   - Rate limiting (5 requests per 5 minutes)

3. **Secure File Uploads**:
   - Images stored on ImageKit CDN (not in database)
   - Only URLs stored in database
   - Automatic file optimization

4. **API Security**:
   - Protected API routes
   - Environment variable validation
   - Error handling & logging

## 📝 Form Fields

| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Full Name | Text | 2-100 chars, letters only | Yes |
| Yamaha ID | Text | 5-50 chars, unique, uppercase | Yes |
| Date of Registration | Date | Valid date | Yes |
| Emergency Contact Name | Text | 2-100 chars, letters only | Yes |
| Emergency Contact Number | Tel | E.164 format | Yes |
| 1x1 ID Picture | File | JPG/PNG, max 25MB | Yes |
| Yamaha QR Code | File | JPG/PNG, max 25MB | Yes |

## 🎨 Design System (Airbnb-Inspired)

- **Colors**: Airbnb Red (#FF385C), Dark (#222222), Gray (#717171)
- **Typography**: System font stack
- **Components**: Consistent spacing, shadows, and interactions
- **Responsive**: Mobile-first approach

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`
   - `IMAGEKIT_PRIVATE_KEY`
   - `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`
   - `API_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel domain)

4. Deploy!

### Post-Deployment

After deployment, run migrations on production:

```bash
npx prisma migrate deploy
```

## 📊 Database Schema

```prisma
model Registration {
  id                    String   @id @default(cuid())
  fullName              String
  yamahaId              String   @unique
  dateOfRegistration    DateTime
  emergencyContactName  String
  emergencyContactNumber String
  idPictureUrl          String
  qrCodeUrl             String
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Run migrations (dev)
npx prisma migrate deploy  # Run migrations (production)
npx prisma studio    # Open database GUI

# Code Quality
npm run lint         # Run ESLint
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Check if your IP is whitelisted in Neon dashboard
- Ensure SSL mode is enabled

### ImageKit Upload Errors
- Verify all ImageKit credentials in `.env`
- Check ImageKit dashboard for quota limits
- Ensure files are under 25MB

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Regenerate Prisma Client: `npx prisma generate`

## 📚 API Documentation

### POST /api/registrations
Create a new registration

**Request**: `multipart/form-data`
- fullName: string
- yamahaId: string (unique)
- dateOfRegistration: string (ISO date)
- emergencyContactName: string
- emergencyContactNumber: string
- idPicture: File
- qrCode: File

**Response**: 
```json
{
  "message": "Registration successful",
  "data": {
    "id": "clxxx...",
    "yamahaId": "YAMAHA-12345"
  }
}
```

### GET /api/registrations?yamahaId=XXX
Retrieve a registration by Yamaha ID

**Response**:
```json
{
  "data": {
    "id": "clxxx...",
    "fullName": "John Doe",
    "yamahaId": "YAMAHA-12345",
    ...
  }
}
```

### GET /api/imagekit-auth
Get ImageKit authentication parameters for client-side uploads

## 🤝 Contributing

This project follows Airbnb's JavaScript Style Guide and uses:
- ESLint with Airbnb config
- TypeScript strict mode
- Prettier for formatting

## 📄 License

MIT License - feel free to use this project for your needs.

## 🙏 Acknowledgments

- Design inspired by [Airbnb Design System](https://airbnb.design/)
- Built with [Next.js](https://nextjs.org/)
- Database by [Neon](https://neon.tech)
- File uploads by [ImageKit](https://imagekit.io)

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub.
