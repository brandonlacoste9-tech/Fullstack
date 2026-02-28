# Contributing to FullStack Studio

Thank you for your interest in contributing to FullStack Studio! This document provides guidelines for contributing to the project.

## Code of Conduct

We expect all contributors to follow our code of conduct:
- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please include:

- **Clear use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - What other approaches did you think about?

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the existing code style** - We use ESLint and Prettier
3. **Add tests** for new features
4. **Update documentation** as needed
5. **Write clear commit messages**
6. **Ensure CI passes** before submitting

#### Commit Message Format

```
type(scope): subject

body

footer
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding/updating tests
- `chore` - Maintenance tasks

Example:
```
feat(agents): add code review agent

Implements a new agent that can review code and provide
suggestions for improvements.

Closes #123
```

## Development Setup

1. **Clone your fork**
```bash
git clone https://github.com/YOUR_USERNAME/Fullstack.git
cd Fullstack
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a feature branch**
```bash
git checkout -b feature/my-new-feature
```

4. **Make your changes** and test thoroughly

5. **Run tests and linting**
```bash
npm test
npm run lint
```

6. **Commit your changes**
```bash
git add .
git commit -m "feat(scope): description"
```

7. **Push to your fork**
```bash
git push origin feature/my-new-feature
```

8. **Create a Pull Request** on GitHub

## Code Style Guidelines

### JavaScript/TypeScript
- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use async/await over promises when possible
- Add JSDoc comments for public APIs
- Keep functions small and focused

### React/Next.js
- Use functional components with hooks
- Keep components under 200 lines
- Extract reusable logic into custom hooks
- Use TypeScript for type safety
- Follow Next.js best practices

### CSS/Tailwind
- Use Tailwind utility classes
- Create custom components for repeated patterns
- Follow mobile-first approach
- Ensure accessibility (ARIA labels, keyboard navigation)

## Project Structure

```
Fullstack/
├── apps/          # Applications
├── packages/      # Shared packages
├── .github/       # GitHub workflows and templates
└── docs/          # Documentation
```

## Testing

- Write unit tests for business logic
- Write integration tests for APIs
- Write E2E tests for critical user flows
- Aim for >80% code coverage

## Documentation

- Update README.md for user-facing changes
- Add inline comments for complex logic
- Update API documentation
- Include examples in docstrings

## Release Process

1. Version bump in package.json
2. Update CHANGELOG.md
3. Create GitHub release
4. Deploy to staging
5. Test on staging
6. Deploy to production
7. Announce release

## Questions?

Feel free to ask questions by:
- Opening a GitHub issue
- Joining our Discord server
- Emailing the maintainers

Thank you for contributing! 🎉
