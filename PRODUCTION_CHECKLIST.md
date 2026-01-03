# Production Deployment Checklist

## Pre-Deployment

### 1. Environment Variables
- [ ] Set `DATABASE_URL` to production PostgreSQL database
- [ ] Set `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`
- [ ] Set `IMAGEKIT_PRIVATE_KEY`
- [ ] Set `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`
- [ ] Set `ADMIN_ACCESS_CODE` (change from default)
- [ ] Set `NODE_ENV=production`
- [ ] Optionally set `ALLOWED_ORIGINS` for CORS
- [ ] Optionally set `API_SECRET_KEY` for additional security

### 2. Database
- [ ] Run `npx prisma migrate deploy` to apply migrations
- [ ] Verify database connection
- [ ] Create database backups
- [ ] Set up automated backup schedule

### 3. Security
- [ ] Change default `ADMIN_ACCESS_CODE` from GRVZ2026
- [ ] Review and update rate limiting settings
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Review CORS allowed origins
- [ ] Set up monitoring and alerting

### 4. Code Quality
- [ ] Run `npm run lint` and fix all errors
- [ ] Run `npm run build` successfully
- [ ] Test all forms and API endpoints
- [ ] Test file uploads with max size files
- [ ] Test error scenarios

### 5. Performance
- [ ] Optimize images in `/public`
- [ ] Enable CDN for static assets
- [ ] Configure ImageKit transformations
- [ ] Set up database connection pooling
- [ ] Configure caching headers

### 6. Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure logging service
- [ ] Set up uptime monitoring
- [ ] Configure performance monitoring
- [ ] Set up database monitoring

## Deployment Steps

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel login
   vercel
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all required environment variables
   - Deploy

3. **Run Database Migrations**
   ```bash
   npx prisma migrate deploy
   ```

4. **Verify Deployment**
   - Test registration form
   - Test member list access
   - Test file uploads
   - Check error handling

### Manual Deployment

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Set Environment Variables**
   - Configure all required variables on your server

3. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. **Start Application**
   ```bash
   npm start
   ```

## Post-Deployment

- [ ] Test production URL
- [ ] Verify SSL certificate
- [ ] Test registration flow end-to-end
- [ ] Test member list access with new code
- [ ] Check error pages (404, 500)
- [ ] Monitor error logs for first 24 hours
- [ ] Set up regular database backups
- [ ] Document admin procedures
- [ ] Train administrators on member list access

## Rollback Plan

1. **Database Rollback**
   ```bash
   npx prisma migrate reset --force
   npx prisma migrate deploy
   ```

2. **Code Rollback**
   - Revert to previous deployment on Vercel
   - Or redeploy previous git commit

3. **Emergency Contacts**
   - Database admin: _______________
   - ImageKit support: support@imagekit.io
   - Hosting support: _______________

## Security Checklist

- [ ] All sensitive data encrypted in transit (HTTPS)
- [ ] Database credentials stored securely
- [ ] API keys not exposed to client
- [ ] Input sanitization enabled
- [ ] Rate limiting configured
- [ ] File upload size limits enforced
- [ ] Admin access code changed from default
- [ ] Security headers configured
- [ ] CORS properly configured

## Performance Benchmarks

- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Image upload time < 10 seconds
- [ ] Database query time < 100ms

## Documentation

- [ ] Update README with production URL
- [ ] Document admin procedures
- [ ] Create user guide
- [ ] Document API endpoints
- [ ] Update environment variables template
