# grvzProjectForm - Quick Start Guide

## Prerequisites
✅ Node.js 18+ installed
✅ npm or yarn package manager
✅ Neon PostgreSQL account ([signup](https://neon.tech))
✅ ImageKit account ([signup](https://imagekit.io))

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
Create `.env` file:
```env
DATABASE_URL="your_neon_postgres_connection_string"
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_id"
API_SECRET_KEY="run: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 3: Setup Database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Step 4: Run Application
```bash
npm run dev
```

Visit: http://localhost:3000

## Deploy to Vercel
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main

# Then import to Vercel and add environment variables
```

## Troubleshooting

**Error: Cannot connect to database**
- Check DATABASE_URL format
- Ensure IP is whitelisted in Neon

**Error: ImageKit upload failed**
- Verify all ImageKit credentials
- Check file size (must be < 25MB)

**Error: Module not found**
- Run `npm install`
- Run `npx prisma generate`

## Key Features
✨ Secure file uploads (ImageKit CDN)
✨ Duplicate Yamaha ID prevention
✨ Client & server validation
✨ Rate limiting protection
✨ Airbnb-inspired design
✨ Production-ready code

For detailed documentation, see [README.md](./README.md)
