# Contributing to SportHub

We love your input! We want to make contributing to SportHub as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with GitHub

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [GitHub Flow](https://guides.github.com/introduction/flow/index.html)

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issues](https://github.com/Shailendra-08/Sports-App/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/Shailendra-08/Sports-App/issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Process

### Backend Development

1. **Prerequisites**
   - Java 17+
   - Maven 3.6+
   - MySQL 8.0+
   - MongoDB 4.4+
   - Apache Kafka

2. **Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/Shailendra-08/Sports-App.git
   cd Sports-App
   
   # Start backend services in order
   cd sports-app/Backend/eureka-server && mvn spring-boot:run &
   cd ../config-server && mvn spring-boot:run &
   cd ../api-gateway && mvn spring-boot:run &
   # ... other services
   ```

3. **Coding Standards**
   - Follow Spring Boot conventions
   - Use meaningful variable and method names
   - Add proper JavaDoc comments
   - Follow RESTful API design principles
   - Implement proper error handling

4. **Testing**
   ```bash
   mvn test
   mvn integration-test
   ```

### Frontend Development

1. **Prerequisites**
   - Node.js 18+
   - Angular CLI
   - npm or yarn

2. **Setup**
   ```bash
   cd sportsapp-frontend
   npm install
   ng serve
   ```

3. **Coding Standards**
   - Follow Angular Style Guide
   - Use TypeScript strict mode
   - Implement proper component lifecycle
   - Use reactive programming with RxJS
   - Follow accessibility best practices

4. **Testing**
   ```bash
   ng test
   ng lint
   ng e2e
   ```

## Code Style Guidelines

### Java/Spring Boot
- Use `camelCase` for variables and methods
- Use `PascalCase` for classes
- Use `UPPER_SNAKE_CASE` for constants
- Maximum line length: 120 characters
- Use proper indentation (4 spaces)

### TypeScript/Angular
- Use `camelCase` for variables, functions, and methods
- Use `PascalCase` for classes and interfaces
- Use `kebab-case` for file names
- Use `UPPER_SNAKE_CASE` for constants
- Maximum line length: 120 characters
- Use proper indentation (2 spaces)

### Database
- Use `snake_case` for table and column names
- Use descriptive names
- Add proper indexes
- Include foreign key constraints

## Pull Request Process

1. **Before submitting**
   - Ensure all tests pass
   - Update documentation if needed
   - Add tests for new functionality
   - Follow the code style guidelines

2. **Pull Request Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing completed
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No breaking changes (or marked as breaking)
   ```

3. **Review Process**
   - At least one approval required
   - All CI checks must pass
   - No merge conflicts
   - Documentation updated if needed

## Feature Request Process

1. Check existing issues to avoid duplicates
2. Use the feature request template
3. Provide detailed description and use cases
4. Include mockups or diagrams if helpful
5. Be open to discussion and feedback

## Release Process

1. **Version Numbering**
   - Follow [Semantic Versioning](https://semver.org/)
   - MAJOR.MINOR.PATCH format
   - Tag releases in Git

2. **Release Notes**
   - Document all changes
   - Include breaking changes
   - Provide migration guides if needed

## Community Guidelines

### Be Respectful
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Be Collaborative
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback
- Be patient with newcomers

### Be Professional
- Keep discussions on-topic
- Avoid personal attacks
- Use appropriate language
- Respect privacy and confidentiality

## Getting Help

- **Documentation**: Check the README and code comments
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Discord/Slack**: Join our community chat (if available)

## Recognition

Contributors will be recognized in:
- README.md file
- Release notes
- Annual contributor appreciation posts

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Don't hesitate to reach out if you have questions about contributing. You can:
- Open an issue for general questions
- Email the maintainers directly
- Join our community discussions

Thank you for contributing to SportHub! 🏆