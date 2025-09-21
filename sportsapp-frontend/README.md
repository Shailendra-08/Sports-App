# SportHub Frontend

The frontend of SportHub is built with Angular 20.1.5 and provides a modern, responsive interface for sports management and discovery.

## 🎯 Features

- **Modern Angular Architecture** - Built with Angular 20.1.5 with standalone components
- **Responsive Design** - Mobile-first design using Tailwind CSS
- **AI-Powered Search** - Integrated with Google Gemini for intelligent sports queries
- **League Management** - Browse and explore global sports leagues
- **User Favorites** - Save and manage favorite leagues and teams
- **User Profiles** - Complete profile management system
- **Authentication** - Secure JWT-based authentication
- **Real-time Data** - Live sports statistics and updates

## 🛠️ Tech Stack

- **Framework**: Angular 20.1.5
- **Styling**: Tailwind CSS 4.1.12
- **Icons**: Lucide Angular
- **UI Components**: Angular Material
- **HTTP Client**: Angular HttpClient with RxJS
- **State Management**: Angular Services with RxJS
- **Build Tool**: Angular CLI with Webpack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd sportsapp-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

The application will automatically reload when you modify source files.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── home/           # Home dashboard
│   │   ├── login/          # Authentication
│   │   ├── register/       # User registration
│   │   ├── profile/        # User profile management
│   │   ├── favorites/      # Favorites management
│   │   ├── ai-search/      # AI-powered search
│   │   ├── landing/        # Landing page
│   │   └── league-details/ # League information
│   ├── services/           # Angular services
│   │   ├── ai.ts          # AI/Gemini service
│   │   ├── leagues.ts     # League data service
│   │   ├── profile.ts     # User profile service
│   │   └── app.ts         # App-wide service
│   ├── models/            # TypeScript interfaces/models
│   ├── app.routes.ts      # Application routing
│   └── app.config.ts      # App configuration
├── assets/                # Static assets
└── environments/          # Environment configurations
```

## 🔗 API Integration

The frontend communicates with the backend through the API Gateway at `http://localhost:8080`:

### Services Overview

- **AiService** - Handles AI-powered search queries
- **LeaguesService** - Manages league data and filtering
- **ProfileService** - User profile operations
- **AuthService** - Authentication and authorization

### Environment Configuration

Configure API endpoints in `src/environments/`:

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  geminiApiUrl: 'http://localhost:8080/api/gemini'
};
```

## 🎨 Styling & UI

### Tailwind CSS

The project uses Tailwind CSS for styling with custom configurations:

```typescript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: { /* custom colors */ },
        secondary: { /* custom colors */ }
      }
    }
  }
}
```

### Component Architecture

- **Standalone Components** - Modern Angular approach
- **Signal-based reactivity** - For better performance
- **Lazy Loading** - Route-based code splitting
- **Responsive Design** - Mobile-first approach

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### End-to-End Tests
```bash
ng e2e
```

### Coverage Report
```bash
ng test --code-coverage
```

## 🏗️ Building

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

## 🚀 Deployment

### Static Hosting
```bash
# Build for production
ng build --configuration production

# Deploy to your hosting provider
# (Netlify, Vercel, Firebase Hosting, etc.)
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
```

## 🔧 Development Guidelines

### Code Style
- Follow Angular Style Guide
- Use TypeScript strict mode
- Implement proper error handling
- Write component tests

### Component Creation
```bash
# Generate new component
ng generate component pages/my-component

# Generate new service
ng generate service services/my-service

# Generate new guard
ng generate guard guards/auth
```

### Best Practices
- Use Angular reactive forms
- Implement proper error handling
- Follow OnPush change detection strategy
- Use trackBy functions in *ngFor
- Implement proper unsubscribe patterns

## 📱 Features Overview

### Authentication Flow
1. User registration/login
2. JWT token storage
3. Automatic token refresh
4. Protected route guards

### Sports Data Management
1. League browsing by country
2. Detailed league information
3. Favorites management
4. Real-time data updates

### AI Integration
1. Natural language sports queries
2. Intelligent search results
3. Formatted response display
4. Search history

## 🤝 Contributing

1. Follow Angular style guide
2. Write unit tests for new components
3. Update documentation
4. Ensure responsive design
5. Test across different browsers

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Angular Material](https://material.angular.io)
- [RxJS Documentation](https://rxjs.dev)

---

For backend integration and full project setup, see the main [README.md](../README.md) in the root directory.
