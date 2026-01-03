# 🌳 Project Directory Tree

Complete visual representation of the grvzProjectForm project structure.

```
grvzForm/
│
├── 📱 app/                              # Next.js App Router
│   ├── api/                            # API Routes
│   │   ├── imagekit-auth/
│   │   │   └── route.ts               # ImageKit auth endpoint
│   │   └── registrations/
│   │       └── route.ts               # Registration CRUD (POST/GET)
│   │
│   ├── error.tsx                       # Global error boundary
│   ├── globals.css                     # Global styles + Tailwind
│   ├── layout.tsx                      # Root layout component
│   ├── loading.tsx                     # Loading state UI
│   ├── not-found.tsx                   # 404 page
│   └── page.tsx                        # Homepage (main registration)
│
├── 🧩 components/
│   └── RegistrationForm.tsx            # Main registration form
│
├── 🛠️ lib/                              # Utilities & Configurations
│   ├── api-utils.ts                   # API helpers, rate limiting
│   ├── config.ts                       # App constants & config
│   ├── file-utils.ts                  # File validation utilities
│   ├── imagekit.ts                     # ImageKit client & upload
│   ├── prisma.ts                       # Prisma client singleton
│   └── validation.ts                   # Zod validation schemas
│
├── 🗄️ prisma/
│   └── schema.prisma                   # Database schema (PostgreSQL)
│
├── 📘 types/
│   └── index.ts                        # TypeScript type definitions
│
├── 🔧 .github/
│   └── workflows/
│       └── ci.yml                      # GitHub Actions CI/CD
│
├── 📄 Configuration Files
│   ├── .env.example                    # Environment variables template
│   ├── .eslintrc.json                  # ESLint config (Airbnb)
│   ├── .gitignore                      # Git ignore rules
│   ├── next.config.mjs                 # Next.js configuration
│   ├── package.json                    # Dependencies & scripts
│   ├── tailwind.config.ts              # Tailwind + Airbnb colors
│   ├── tsconfig.json                   # TypeScript configuration
│   └── vercel.json                     # Vercel deployment config
│
├── 📚 Documentation
│   ├── CONTRIBUTING.md                 # Contribution guidelines
│   ├── DEPLOYMENT.md                   # Deployment guide
│   ├── FILE_INDEX.md                   # File structure reference
│   ├── LICENSE                         # MIT License
│   ├── PROJECT_SUMMARY.md              # Complete project overview
│   ├── QUICKSTART.md                   # 5-minute setup guide
│   ├── README.md                       # Main documentation
│   ├── SETUP_CHECKLIST.md              # Setup verification steps
│   └── START_HERE.md                   # Quick start instructions
│
├── 🔨 Scripts
│   └── setup.ps1                       # Automated setup (Windows)
│
└── 📦 Generated (after installation)
    ├── node_modules/                   # Dependencies
    ├── .next/                          # Next.js build output
    └── .env                            # Your environment variables
```

## 📂 Directory Breakdown

### `/app` - Next.js Application
**Purpose**: Main application code using App Router
- **Pages**: `page.tsx`, `layout.tsx`, error pages
- **API Routes**: Server-side endpoints in `/api`
- **Styling**: Global CSS and Tailwind

### `/components` - React Components
**Purpose**: Reusable UI components
- Currently contains: Registration form component
- Future: Add more shared components here

### `/lib` - Shared Libraries
**Purpose**: Utilities, configurations, and helpers
- **Validation**: Zod schemas for forms
- **Database**: Prisma client setup
- **File Upload**: ImageKit integration
- **Security**: Rate limiting, API utilities
- **Config**: Application constants

### `/prisma` - Database
**Purpose**: Database schema and migrations
- **schema.prisma**: Database models
- **migrations/**: Auto-generated migration files

### `/types` - TypeScript Types
**Purpose**: Shared TypeScript type definitions
- Application-wide interfaces
- API response types
- Form data types

### `/.github` - CI/CD
**Purpose**: GitHub Actions workflows
- Automated testing
- Build verification
- Deployment automation

## 🎯 Key Files Explained

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, project metadata |
| `tsconfig.json` | TypeScript compiler settings |
| `tailwind.config.ts` | Tailwind CSS + Airbnb design tokens |
| `next.config.mjs` | Next.js framework configuration |
| `.eslintrc.json` | Code linting rules (Airbnb style) |
| `vercel.json` | Vercel deployment settings |
| `.env.example` | Environment variable template |

### Application Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage - displays registration form |
| `app/layout.tsx` | Root layout with metadata |
| `components/RegistrationForm.tsx` | Main form with validation |
| `app/api/registrations/route.ts` | Registration API endpoint |
| `lib/validation.ts` | Form validation schemas |
| `lib/imagekit.ts` | Image upload functionality |
| `lib/prisma.ts` | Database client |

### Documentation Files

| File | When to Read |
|------|--------------|
| `START_HERE.md` | 🎯 **Read First!** Quick start guide |
| `README.md` | Complete project documentation |
| `QUICKSTART.md` | 5-minute setup instructions |
| `SETUP_CHECKLIST.md` | Step-by-step verification |
| `DEPLOYMENT.md` | Production deployment guide |
| `CONTRIBUTING.md` | Development guidelines |
| `PROJECT_SUMMARY.md` | Architecture overview |
| `FILE_INDEX.md` | Detailed file reference |

## 🔄 Data Flow

```
User Form Input
    ↓
components/RegistrationForm.tsx
    ↓
lib/validation.ts (client validation)
    ↓
app/api/registrations/route.ts
    ↓
├─→ lib/imagekit.ts (upload images)
│       ↓
│   ImageKit CDN
│
└─→ lib/validation.ts (server validation)
        ↓
    lib/prisma.ts
        ↓
    Neon PostgreSQL Database
        ↓
    Success Response
```

## 📊 File Statistics

```
Total Files: 30+
├── TypeScript/TSX: 16 files (~1,500 LOC)
├── Documentation: 9 files (~3,000 LOC)
├── Configuration: 7 files
└── Other: 2 files
```

## 🎨 Styling Architecture

```
tailwind.config.ts (Airbnb colors)
    ↓
app/globals.css (base styles)
    ↓
Components (utility classes)
    ↓
Custom CSS classes
    ├─→ .btn-primary
    ├─→ .input-field
    ├─→ .form-label
    ├─→ .error-message
    └─→ .card
```

## 🔐 Security Layers

```
User Input
    ↓
1. Client Validation (Zod)
    ↓
2. File Type/Size Check
    ↓
3. Server Validation (Zod)
    ↓
4. Rate Limiting
    ↓
5. Duplicate Check (Prisma)
    ↓
6. Secure Upload (ImageKit)
    ↓
Database Storage
```

## 🚀 Build & Deploy Flow

```
Development
    ↓
npm run build
    ↓
.next/ (build output)
    ↓
Vercel Deploy
    ↓
Production
```

## 📦 Dependencies Tree

```
package.json
├── Production Dependencies
│   ├── next (framework)
│   ├── react (UI library)
│   ├── @prisma/client (database)
│   ├── imagekit (file upload)
│   ├── zod (validation)
│   └── react-hook-form (form state)
│
└── Development Dependencies
    ├── typescript (type safety)
    ├── prisma (database toolkit)
    ├── tailwindcss (styling)
    ├── eslint (linting)
    └── @types/* (type definitions)
```

## 🎯 Quick Navigation

**Want to modify...**

- **Form fields**: `components/RegistrationForm.tsx` + `lib/validation.ts`
- **Database schema**: `prisma/schema.prisma`
- **API logic**: `app/api/registrations/route.ts`
- **Styling**: `app/globals.css` + `tailwind.config.ts`
- **Configuration**: `lib/config.ts`
- **Types**: `types/index.ts`

**Want to learn about...**

- **Setup**: `START_HERE.md` or `QUICKSTART.md`
- **Architecture**: `PROJECT_SUMMARY.md`
- **Deployment**: `DEPLOYMENT.md`
- **Contributing**: `CONTRIBUTING.md`
- **Files**: `FILE_INDEX.md` (this file)

---

**Visual Guide Complete!** 🌳

Use this tree to navigate and understand the project structure.
