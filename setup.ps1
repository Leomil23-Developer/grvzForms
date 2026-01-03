# Setup Script for grvzProjectForm
# This script helps set up the project for the first time

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  grvzProjectForm - Setup Script" -ForegroundColor Cyan
Write-Host "  Yamaha Registration System" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found! Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Dependency installation failed!" -ForegroundColor Red
    Write-Host "Try running: npm install --legacy-peer-deps" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Check for .env file
if (-Not (Test-Path ".env")) {
    Write-Host ".env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  IMPORTANT: Configure .env file!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please edit .env file with your credentials:" -ForegroundColor Yellow
    Write-Host "1. Add your Neon PostgreSQL DATABASE_URL" -ForegroundColor White
    Write-Host "2. Add your ImageKit credentials" -ForegroundColor White
    Write-Host "3. Generate API_SECRET_KEY by running:" -ForegroundColor White
    Write-Host "   node -e `"console.log(require('crypto').randomBytes(32).toString('hex'))`"" -ForegroundColor Cyan
    Write-Host ""
    
    $continue = Read-Host "Have you configured .env file? (yes/no)"
    if ($continue -ne "yes") {
        Write-Host "Please configure .env file and run this script again." -ForegroundColor Yellow
        exit 0
    }
} else {
    Write-Host "✓ .env file found!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Prisma generation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Prisma Client generated!" -ForegroundColor Green
Write-Host ""

Write-Host "Running database migrations..." -ForegroundColor Yellow
npx prisma migrate dev --name init

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Migration failed. Please check your DATABASE_URL in .env" -ForegroundColor Red
    Write-Host "You can run migrations later with: npx prisma migrate dev --name init" -ForegroundColor Yellow
} else {
    Write-Host "✓ Database migrations completed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup Complete! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Open browser:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Optional - Open Prisma Studio:" -ForegroundColor White
Write-Host "   npx prisma studio" -ForegroundColor Cyan
Write-Host ""
Write-Host "For more information, see:" -ForegroundColor Yellow
Write-Host "- README.md (complete documentation)" -ForegroundColor White
Write-Host "- QUICKSTART.md (quick start guide)" -ForegroundColor White
Write-Host "- SETUP_CHECKLIST.md (verification steps)" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
