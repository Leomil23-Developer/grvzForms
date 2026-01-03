# grvzProjectForm - Setup Checklist

## ✅ Pre-Installation Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Git installed (for version control)
- [ ] Code editor (VS Code recommended)
- [ ] Neon PostgreSQL account created
- [ ] ImageKit account created

## 📦 Installation Steps

### 1. Install Dependencies
```bash
cd grvzForm
npm install
```

**Expected Output**: All packages installed successfully

### 2. Environment Setup
```bash
# Copy example environment file
cp .env.example .env
```

**Edit `.env` file with your credentials**:

```env
# 1. Neon Database URL
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# 2. ImageKit Credentials
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_id"

# 3. Generate API Secret
# Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
API_SECRET_KEY="paste_generated_key_here"

# 4. App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Optional: View database
npx prisma studio
```

**Expected Output**: 
- ✓ Migration completed
- ✓ Database tables created
- ✓ Prisma Client generated

### 4. Verify Installation
```bash
# Type check
npx tsc --noEmit

# Lint check
npm run lint
```

**Expected Output**: No errors

### 5. Start Development Server
```bash
npm run dev
```

**Expected Output**: 
```
✓ Ready on http://localhost:3000
```

Visit: http://localhost:3000

## 🧪 Testing Your Setup

### Test 1: Homepage Loads
- [ ] Navigate to http://localhost:3000
- [ ] Registration form appears
- [ ] No console errors

### Test 2: Form Validation
- [ ] Try submitting empty form
- [ ] Verify validation errors appear
- [ ] Check all field validations work

### Test 3: File Upload Preview
- [ ] Select an image for ID Picture
- [ ] Preview should appear
- [ ] Verify file size validation (try > 25MB)
- [ ] Verify file type validation (try .pdf)

### Test 4: Database Connection
```bash
# Open Prisma Studio
npx prisma studio
```
- [ ] Studio opens at http://localhost:5555
- [ ] Can see `Registration` model

### Test 5: Full Registration Flow
- [ ] Fill all form fields
- [ ] Upload valid ID picture (< 25MB, JPG/PNG)
- [ ] Upload valid QR code (< 25MB, JPG/PNG)
- [ ] Submit form
- [ ] Success message appears
- [ ] Check database in Prisma Studio

### Test 6: Duplicate Prevention
- [ ] Try registering same Yamaha ID twice
- [ ] Error message should appear

## 🐛 Common Issues & Solutions

### Issue 1: npm install fails
**Solution**:
```bash
# Clear cache
npm cache clean --force
# Try again
npm install --legacy-peer-deps
```

### Issue 2: Database connection error
**Symptoms**: `Can't reach database server`

**Solution**:
- Check DATABASE_URL format
- Ensure SSL mode: `?sslmode=require`
- Verify Neon dashboard shows database is active
- Check IP whitelist in Neon settings

### Issue 3: Prisma generate fails
**Solution**:
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
npx prisma generate
```

### Issue 4: ImageKit upload fails
**Symptoms**: `Authentication failed`

**Solution**:
- Verify all three ImageKit credentials in `.env`
- Check for typos or extra spaces
- Ensure credentials match ImageKit dashboard
- Restart dev server after changing `.env`

### Issue 5: TypeScript errors
**Solution**:
```bash
# Regenerate Prisma types
npx prisma generate
# Restart TypeScript server in VS Code
# Command Palette > TypeScript: Restart TS Server
```

### Issue 6: Port 3000 already in use
**Solution**:
```bash
# Use different port
npm run dev -- -p 3001
# Or kill process on port 3000
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill
```

## 📊 Verification Checklist

After setup, verify:

- [ ] ✅ All dependencies installed
- [ ] ✅ `.env` file configured
- [ ] ✅ Database connected
- [ ] ✅ Prisma Client generated
- [ ] ✅ Migrations completed
- [ ] ✅ Dev server running
- [ ] ✅ No TypeScript errors
- [ ] ✅ No ESLint errors
- [ ] ✅ Form renders correctly
- [ ] ✅ File upload works
- [ ] ✅ Form submission works
- [ ] ✅ Data saved to database

## 🚀 Next Steps

Once setup is complete:

1. **Development**:
   - Start building features
   - Follow CONTRIBUTING.md guidelines
   - Use Airbnb style guide

2. **Testing**:
   - Test all form validations
   - Test duplicate prevention
   - Test rate limiting
   - Test error handling

3. **Deployment**:
   - Read DEPLOYMENT.md
   - Set up Vercel account
   - Configure production environment
   - Deploy!

## 📞 Need Help?

If you encounter issues:

1. Check this checklist again
2. Review error messages carefully
3. Check [GitHub Issues](https://github.com/yourusername/grvz-project-form/issues)
4. Read TROUBLESHOOTING.md
5. Open a new issue with:
   - Error message
   - Steps to reproduce
   - System information
   - Screenshots

## 🎉 Setup Complete!

You're ready to develop! Run:
```bash
npm run dev
```

Happy coding! 🚀
