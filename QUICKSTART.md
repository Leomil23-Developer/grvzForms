# GRVZ Registration Form - Quick Reference

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Visit: `http://localhost:3000`

## 🔐 Environment Variables

### Required
```env
DATABASE_URL="postgresql://user:password@localhost:5432/grvz_db"
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_id"
```

### Optional
```env
ADMIN_ACCESS_CODE="GRVZ2026"        # Change in production!
NODE_ENV="development"
ALLOWED_ORIGINS="https://yourdomain.com"
```

## 📝 API Endpoints

### 1. Registration
```
POST /api/registrations
Content-Type: multipart/form-data

Form Fields:
- fullName: string
- yamahaId: string
- dateOfRegistration: ISO date
- emergencyContactName: string
- emergencyContactNumber: string (09XXXXXXXXX)
- deliveryAddress: string (optional)
- idPicture: File (JPG/PNG, max 25MB)
- qrCode: File (JPG/PNG, max 25MB)

Response: 201 Created
{
  "message": "Registration successful",
  "data": {
    "id": "...",
    "yamahaId": "..."
  }
}
```

### 2. Get Registration
```
GET /api/registrations?yamahaId=YAMAHA-12345

Response: 200 OK
{
  "data": { ... }
}
```

### 3. List Registrations
```
GET /api/registrations/list?page=1&limit=100
Headers:
  x-access-code: GRVZ2026

Response: 200 OK
{
  "success": true,
  "data": [...],
  "count": 10,
  "total": 100,
  "page": 1,
  "totalPages": 10
}
```

### 4. Health Check
```
GET /api/health

Response: 200 OK
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2026-01-03T...",
  "uptime": 12345,
  "environment": "production"
}
```

## 🛡️ Security Features

### Rate Limiting
- **Registration**: 5 requests per 5 minutes per IP
- **Member List**: 10 requests per minute per IP

### Input Validation
- All inputs sanitized and validated
- XSS protection enabled
- SQL injection prevention via Prisma ORM
- File type and size validation

### Security Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 📱 Frontend Pages

### 1. Registration Form
**URL**: `/`
- Multi-step form with validation
- Real-time field validation
- File upload with preview
- Payment reminder modal
- Success/error messaging

### 2. Members List
**URL**: `/members`
- Requires access code
- Paginated member list
- Download individual member data
- View ID pictures and QR codes
- Delivery address display

### 3. Error Pages
- **404**: `/not-found` - Custom 404 page
- **500**: `/error` - Error boundary with retry
- **Loading**: Global loading state

## 🗄️ Database Schema

```prisma
model Registration {
  id                    String   @id @default(cuid())
  fullName              String
  yamahaId              String   @unique
  dateOfRegistration    DateTime
  emergencyContactName  String
  emergencyContactNumber String
  deliveryAddress       String?
  idPictureUrl          String
  qrCodeUrl             String
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}
```

## 🔧 Database Commands

```bash
# Create migration
npx prisma migrate dev --name description

# Deploy migrations (production)
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Reset database (development only!)
npx prisma migrate reset
```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel login
vercel --prod
```

### Environment Setup
1. Add environment variables in Vercel dashboard
2. Run database migrations
3. Test health endpoint
4. Verify registration flow

## 🐛 Debugging

### Check Logs
```bash
# Development
Check browser console and terminal

# Production
Check hosting platform logs (Vercel logs, etc.)
```

### Common Issues

**Database Connection Error**
```bash
# Verify DATABASE_URL is correct
# Check database is running
# Run: npx prisma db push
```

**ImageKit Upload Error**
```bash
# Verify ImageKit credentials
# Check file size < 25MB
# Check file type is JPG/PNG
```

**Rate Limit Error**
```
Response: 429 Too Many Requests
Wait 5 minutes before trying again
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Submit valid registration
- [ ] Submit with missing fields
- [ ] Upload invalid file type
- [ ] Upload oversized file
- [ ] Submit duplicate Yamaha ID
- [ ] Access member list with correct code
- [ ] Access member list with wrong code
- [ ] Download member data
- [ ] Check error pages

### Test Data
```
Yamaha ID: TEST-12345
Phone: 09171234567
Date: 2026-01-03
```

## 📊 Monitoring

### Health Check
```bash
curl https://yourdomain.com/api/health
```

### Database Status
```bash
npx prisma studio
# Check connection in GUI
```

## 🔑 Admin Access

### Member List Access Code
- Default: `GRVZ2026`
- Change via `ADMIN_ACCESS_CODE` environment variable
- Required in `x-access-code` header for API
- Required in modal for web interface

### Changing Access Code
1. Update `ADMIN_ACCESS_CODE` in environment
2. Redeploy application
3. Update documentation
4. Notify administrators

## 📞 Support

### Error Reporting
- Check `/api/health` endpoint
- Review application logs
- Check browser console
- Verify environment variables

### Database Issues
- Verify `DATABASE_URL`
- Check database server status
- Review connection limits
- Check migration status

### ImageKit Issues
- Verify API keys
- Check ImageKit dashboard
- Review usage limits
- Check file upload logs

## 🎯 Key Features

✅ Production-ready validation
✅ Comprehensive error handling  
✅ Input sanitization
✅ Rate limiting
✅ Health monitoring
✅ Secure file uploads
✅ Responsive design
✅ Access control
✅ Pagination support
✅ Retry logic for uploads

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [ImageKit Documentation](https://docs.imagekit.io)
- [Production Checklist](./PRODUCTION_CHECKLIST.md)
- [Production Summary](./PRODUCTION_READY_SUMMARY.md)
