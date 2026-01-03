# Contributing to grvzProjectForm

Thank you for considering contributing to this project! This guide will help you get started.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/grvz-project-form.git
   cd grvz-project-form
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your `.env` file (see `.env.example`)
5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
6. Start development server:
   ```bash
   npm run dev
   ```

## Coding Standards

This project follows Airbnb's JavaScript/TypeScript Style Guide.

### Key Rules

- **TypeScript**: Use strict mode, avoid `any` types
- **Components**: Use functional components with TypeScript
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Use absolute imports with `@/` prefix
- **Comments**: Write clear JSDoc comments for functions
- **Formatting**: ESLint and Prettier handle this automatically

### Code Style

```typescript
// ✅ Good
export async function uploadImage(file: File): Promise<string> {
  // Implementation
}

// ❌ Bad
export async function upload_image(file: any) {
  // Implementation
}
```

## Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <subject>

# Examples
feat(form): add validation for phone numbers
fix(api): resolve duplicate ID prevention issue
docs(readme): update installation instructions
style(form): improve button hover states
refactor(validation): extract schema into separate file
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Pull Request Process

1. **Create a branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, documented code
   - Follow the style guide
   - Add tests if applicable

3. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push and create PR**:
   ```bash
   git push origin feat/your-feature-name
   ```

6. **PR Checklist**:
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No breaking changes (or documented)
   - [ ] Build passes
   - [ ] Lint passes

## Project Structure

```
grvzForm/
├── app/              # Next.js App Router pages and API routes
├── components/       # React components
├── lib/             # Utilities, configs, and helpers
├── prisma/          # Database schema and migrations
└── public/          # Static assets
```

## Adding New Features

### 1. New Form Field

1. Update `prisma/schema.prisma`
2. Update `lib/validation.ts` schemas
3. Update `components/RegistrationForm.tsx`
4. Update `app/api/registrations/route.ts`
5. Run migration: `npx prisma migrate dev`

### 2. New API Endpoint

1. Create route in `app/api/your-endpoint/route.ts`
2. Add validation schema if needed
3. Implement security checks
4. Add error handling
5. Update API documentation

### 3. New Component

1. Create in `components/YourComponent.tsx`
2. Use TypeScript for props
3. Follow Airbnb design system
4. Add proper documentation
5. Export and use in pages

## Testing

Currently, this project uses manual testing. Contributions to add automated tests are welcome!

### Future Test Coverage
- Unit tests for utilities
- Integration tests for API routes
- E2E tests for registration flow

## Reporting Bugs

Use GitHub Issues with the following template:

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Windows, macOS]
- Browser: [e.g., Chrome, Safari]
- Version: [e.g., 1.0.0]
```

## Suggesting Features

Use GitHub Issues with:
- Clear feature description
- Use case/problem it solves
- Proposed implementation (optional)
- Examples/mockups (if applicable)

## Code Review Process

1. Maintainers review PRs within 48 hours
2. Address review comments
3. Once approved, maintainers will merge
4. PR will be deployed automatically

## Questions?

- Open a GitHub Discussion
- Check existing issues and PRs
- Review documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
