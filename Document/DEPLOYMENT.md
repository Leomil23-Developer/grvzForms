# Deployment Guide - grvzProjectForm

## 🚀 Deploying to Vercel (Recommended)

Vercel is the easiest way to deploy your Next.js application.

### Prerequisites
- GitHub account
- Vercel account ([signup](https://vercel.com))
- All environment variables ready

### Step-by-Step Deployment

#### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Yamaha registration system"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/grvz-project-form.git
git branch -M main
git push -u origin main
```

#### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. **IMPORTANT**: Set Package Manager to `pnpm` in Project Settings

#### 3. Configure Environment Variables

In Vercel dashboard, add these environment variables:

```env
DATABASE_URL=your_neon_postgres_connection_string
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
API_SECRET_KEY=your_generated_secret_key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
ADMIN_ACCESS_CODE=GRVZ2026
```

**⚠️ Critical**: Make sure `DATABASE_URL` is set BEFORE deploying, as Prisma needs it during build.

#### 4. Deploy

Click "Deploy" and Vercel will:
- Install dependencies with pnpm
- Generate Prisma Client (requires DATABASE_URL)
- Run build
- Deploy your application

#### 5. Run Database Migrations

After first deployment, run migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Run migrations on production
vercel env pull .env.production.local
npx prisma migrate deploy
```

### Post-Deployment Checklist

- [ ] Test registration form
- [ ] Verify ImageKit uploads work
- [ ] Check database connections
- [ ] Test duplicate Yamaha ID prevention
- [ ] Verify rate limiting
- [ ] Check mobile responsiveness

---

## 🌐 Alternative: Deploy to Other Platforms

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build your app:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Add environment variables in Netlify dashboard

**Note**: For Netlify, you may need to adjust the build command:
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add environment variables
4. Railway will auto-deploy

### Deploy to DigitalOcean App Platform

1. Connect your GitHub repository
2. Select branch
3. Add environment variables
4. Deploy

---

## 🔧 Production Optimizations

### 1. Enable Compression

Vercel automatically handles this, but for other platforms, ensure gzip/brotli is enabled.

### 2. Add Security Headers

Add to `next.config.mjs`:

```javascript
const nextConfig = {
  // ... existing config
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

### 3. Database Connection Pooling

For production, use connection pooling with Neon:

```env
# Use pooled connection
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require&pgbouncer=true"
```

### 4. ImageKit Configuration

Ensure ImageKit is configured for production:
- Enable auto-optimization
- Set up image transformations
- Configure CDN caching

### 5. Monitoring

Add monitoring services:
- **Vercel Analytics**: Built-in for Vercel deployments
- **Sentry**: For error tracking
- **LogRocket**: For session replay

---

## 📊 Performance Checklist

- [ ] Enable Next.js Image Optimization
- [ ] Configure proper cache headers
- [ ] Minimize bundle size
- [ ] Enable compression
- [ ] Use CDN for static assets (ImageKit)
- [ ] Implement proper error boundaries
- [ ] Set up logging and monitoring

---

## 🔒 Security Checklist

- [ ] All secrets in environment variables
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Rate limiting configured
- [ ] Input validation on client and server
- [ ] File upload restrictions enforced
- [ ] Database connections secured
- [ ] CORS properly configured
- [ ] Security headers added

---

## 🐛 Troubleshooting Deployment Issues

### Build Fails

**Problem**: `Module not found: Can't resolve '@/...'`

**Solution**: Ensure `tsconfig.json` has correct paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Database Connection Fails

**Problem**: `Can't reach database server`

**Solution**:
1. Check DATABASE_URL format
2. Ensure SSL mode is enabled
3. Whitelist Vercel's IP ranges in Neon

### ImageKit Uploads Fail

**Problem**: `Authentication failed`

**Solution**:
1. Verify all three ImageKit credentials
2. Check if keys are properly set in environment variables
3. Ensure no trailing spaces in credentials

### Rate Limiting Issues

**Problem**: Too restrictive or not working

**Solution**:
- For production, implement Redis-based rate limiting
- Adjust limits in `lib/config.ts`

---

## 📈 Scaling Considerations

### Database
- Use Neon's autoscaling feature
- Implement connection pooling
- Add database indexes for frequently queried fields

### File Storage
- ImageKit handles CDN and scaling automatically
- Consider implementing image optimization pipelines

### Application
- Vercel scales automatically
- Consider Edge Functions for better global performance

---

## 🔄 CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📞 Support

If you encounter deployment issues:
1. Check Vercel deployment logs
2. Review environment variables
3. Test locally first with production build: `npm run build && npm start`
4. Check [Vercel documentation](https://vercel.com/docs)

---

**Ready to deploy?** Follow the Vercel steps above for the smoothest experience! 🚀
