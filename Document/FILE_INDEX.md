# 📑 Complete File Index - grvzProjectForm

This document provides a complete index of all files in the project with their purposes.

## 📁 Root Directory

| File | Purpose |
|------|---------|
| `.env.example` | Environment variables template |
| `.eslintrc.json` | ESLint configuration (Airbnb style) |
| `.gitignore` | Git ignore rules |
| `CONTRIBUTING.md` | Contribution guidelines |
| `DEPLOYMENT.md` | Production deployment guide |
| `LICENSE` | MIT License |
| `next.config.mjs` | Next.js configuration |
| `package.json` | Dependencies and scripts |
| `PROJECT_SUMMARY.md` | Complete project overview |
| `QUICKSTART.md` | 5-minute setup guide |
| `README.md` | Main documentation |
| `setup.ps1` | Automated setup script (Windows) |
| `SETUP_CHECKLIST.md` | Step-by-step verification |
| `tailwind.config.ts` | Tailwind CSS + Airbnb colors |
| `tsconfig.json` | TypeScript configuration |
| `vercel.json` | Vercel deployment config |

## 📂 app/ (Next.js App Router)

### app/api/imagekit-auth/
| File | Purpose |
|------|---------|
| `route.ts` | ImageKit authentication endpoint |

### app/api/registrations/
| File | Purpose |
|------|---------|
| `route.ts` | Registration CRUD operations (POST, GET) |

### app/ (Root Pages)
| File | Purpose |
|------|---------|
| `error.tsx` | Global error boundary UI |
| `globals.css` | Global styles + Tailwind directives |
| `layout.tsx` | Root layout wrapper |
| `loading.tsx` | Global loading state UI |
| `not-found.tsx` | 404 error page |
| `page.tsx` | Homepage (registration form) |

## 📂 components/

| File | Purpose |
|------|---------|
| `RegistrationForm.tsx` | Main registration form component with validation |

## 📂 lib/ (Utilities & Configuration)

| File | Purpose |
|------|---------|
| `api-utils.ts` | API helpers, rate limiting, security utilities |
| `config.ts` | Application-wide constants and configuration |
| `file-utils.ts` | File validation and utility functions |
| `imagekit.ts` | ImageKit client configuration and upload functions |
| `prisma.ts` | Prisma Client singleton instance |
| `validation.ts` | Zod validation schemas (client & server) |

## 📂 prisma/

| File | Purpose |
|------|---------|
| `schema.prisma` | Database schema definition (PostgreSQL) |

## 📂 types/

| File | Purpose |
|------|---------|
| `index.ts` | TypeScript type definitions for the app |

## 📂 .github/workflows/

| File | Purpose |
|------|---------|
| `ci.yml` | GitHub Actions CI/CD pipeline |

## 🔧 Configuration Files

### package.json
```json
{
  "scripts": {
    "dev": "Start development server",
    "build": "Build for production",
    "start": "Start production server",
    "lint": "Run ESLint",
    "postinstall": "Generate Prisma Client"
  }
}
```

### Environment Variables (.env)
```
DATABASE_URL              # Neon PostgreSQL connection string
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY  # ImageKit public key
IMAGEKIT_PRIVATE_KEY      # ImageKit private key (server-only)
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT # ImageKit CDN endpoint
API_SECRET_KEY            # API security secret
NEXT_PUBLIC_APP_URL       # Application URL
```

## 📊 File Statistics

**Total Files**: 29 core files
- **TypeScript/TSX**: 16 files
- **Documentation**: 7 files
- **Configuration**: 6 files

**Lines of Code** (approx):
- TypeScript: ~1,500 lines
- Documentation: ~2,500 lines
- Total: ~4,000 lines

## 🎯 File Relationships

### Registration Flow
```
page.tsx
  └─> RegistrationForm.tsx
      ├─> validation.ts (client validation)
      ├─> file-utils.ts (file validation)
      └─> /api/registrations
          ├─> validation.ts (server validation)
          ├─> imagekit.ts (upload images)
          ├─> prisma.ts (save to database)
          └─> api-utils.ts (security checks)
```

### Database Flow
```
schema.prisma
  └─> prisma generate
      └─> @prisma/client
          └─> prisma.ts
              └─> /api/registrations
```

### ImageKit Flow
```
imagekit.ts
  ├─> /api/imagekit-auth (get auth params)
  └─> /api/registrations (upload files)
```

## 📚 Documentation Files

| File | When to Read |
|------|--------------|
| `README.md` | First time, comprehensive guide |
| `QUICKSTART.md` | Quick 5-minute setup |
| `SETUP_CHECKLIST.md` | During installation, step-by-step |
| `DEPLOYMENT.md` | Before deploying to production |
| `CONTRIBUTING.md` | Before contributing code |
| `PROJECT_SUMMARY.md` | For complete project overview |
| `FILE_INDEX.md` | This file - understanding structure |

## 🔍 Finding Files

### By Feature

**Form & Validation**:
- `components/RegistrationForm.tsx`
- `lib/validation.ts`
- `lib/file-utils.ts`

**Database**:
- `prisma/schema.prisma`
- `lib/prisma.ts`
- `app/api/registrations/route.ts`

**File Upload**:
- `lib/imagekit.ts`
- `app/api/imagekit-auth/route.ts`

**Security**:
- `lib/api-utils.ts` (rate limiting)
- `lib/validation.ts` (input validation)

**UI/Styling**:
- `app/globals.css`
- `tailwind.config.ts`
- `components/RegistrationForm.tsx`

**Configuration**:
- `next.config.mjs`
- `tsconfig.json`
- `.eslintrc.json`
- `lib/config.ts`

### By Technology

**Next.js**:
- `app/**/*.tsx`
- `next.config.mjs`

**Prisma**:
- `prisma/schema.prisma`
- `lib/prisma.ts`

**ImageKit**:
- `lib/imagekit.ts`
- `app/api/imagekit-auth/route.ts`

**Tailwind CSS**:
- `tailwind.config.ts`
- `app/globals.css`

**TypeScript**:
- `tsconfig.json`
- `types/index.ts`
- All `.ts` and `.tsx` files

## 🚀 Quick Reference

### Adding New Features

1. **New form field**: Update `validation.ts`, `schema.prisma`, `RegistrationForm.tsx`, `route.ts`
2. **New API endpoint**: Create `app/api/[name]/route.ts`
3. **New component**: Create `components/YourComponent.tsx`
4. **New utility**: Add to `lib/your-utils.ts`

### Common Tasks

| Task | File(s) to Modify |
|------|-------------------|
| Change form fields | `validation.ts`, `RegistrationForm.tsx` |
| Update database | `schema.prisma`, then run migration |
| Modify API logic | `app/api/registrations/route.ts` |
| Change styling | `globals.css`, `tailwind.config.ts` |
| Add configuration | `lib/config.ts` |
| Update types | `types/index.ts` |

## 📝 Notes

- All TypeScript files use **strict mode**
- All components follow **Airbnb style guide**
- All API routes include **security checks**
- All forms have **client & server validation**
- All documentation is **comprehensive and up-to-date**

---

Last Updated: January 3, 2026
