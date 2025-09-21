# Sports App

A comprehensive sports application built with modern microservices architecture, featuring a Angular frontend and Spring Boot microservices backend with Kafka messaging.

## 🛠️ Technologies Used

### Frontend
- **Angular 20.1.0** - Modern TypeScript framework for building the user interface
- **Angular Material 20.1.6** - UI component library for Material Design
- **TailwindCSS 4.1.12** - Utility-first CSS framework for styling
- **Lucide Angular 0.541.0** - Beautiful icon library
- **RxJS 7.8.0** - Reactive programming library for handling asynchronous operations

### Backend
- **Spring Boot 3.5.4** - Java framework for building microservices
- **Spring Cloud Gateway** - API Gateway for routing and load balancing
- **Spring Cloud Netflix Eureka** - Service discovery and registration
- **Spring Cloud Config** - Centralized configuration management
- **Apache Kafka** - Distributed messaging system for async communication
- **JWT (JSON Web Tokens)** - Secure authentication and authorization
- **Spring AI** - AI integration for enhanced features
- **Java 24** - Latest Java version for backend services

### Infrastructure
- **Maven** - Dependency management and build tool
- **Netflix Eureka Server** - Service discovery
- **Config Server** - Centralized configuration
- **API Gateway** - Single entry point for all client requests

## 🖥️ Frontend Pages

The Angular frontend consists of several key pages and components:

### Main Pages
1. **Landing Page** (`/`) - Welcome page with app introduction and navigation to login/register
2. **Home Page** (`/home`) - Main dashboard displaying sports leagues with search and filtering
3. **Login Page** (`/login`) - User authentication interface
4. **Register Page** (`/register`) - New user registration
5. **Profile Page** (`/profile`) - User profile management and settings
6. **Favorites Page** (`/favorites`) - User's favorite leagues and teams
7. **League Details Page** (`/league_details/:id`) - Detailed information about specific leagues
8. **AI Search Page** (`/ai-search`) - AI-powered search functionality

### Key Features
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Authentication Guard** - Protected routes with JWT token validation
- **Search & Filter** - Advanced filtering by sport, country, and search terms
- **Favorites Management** - Add/remove leagues from personal favorites
- **AI Integration** - Smart search and recommendations
- **Material Design** - Consistent UI/UX with Angular Material components

## 🔗 Backend API Endpoints (Through Gateway)

All requests are routed through the API Gateway at port 8080. The gateway handles load balancing and service discovery.

### Authentication Service (`/api/auth/*`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login and JWT token generation
- `GET /api/auth/secure` - Protected endpoint example

### User Profile Service (`/api/user/*`)
- `POST /api/user/register` - Create user profile and auth credentials
- `GET /api/user/getUser/{email}` - Get user profile by email
- `PATCH /api/user/update/{email}` - Update user profile partially

### Favorites Service (`/api/fav/*`)
- `POST /api/fav/favorites` - Add league to favorites
- `GET /api/fav/favorites/{email}` - Get user's favorite leagues
- `DELETE /api/fav/favorites/delete` - Remove league from favorites

### League Service (`/api/league/*`)
- `GET /api/league/` - Get leagues by country (query param: country)

### AI Service (`/api/gemini/*`)
- `POST /api/gemini/ask` - AI-powered search and recommendations

## ⚡ Kafka Integration

The application uses Apache Kafka for asynchronous communication between microservices:

### Kafka Topics
- **`user-credentials`** - User registration credential events
- **`auth-events`** - Authentication and authorization events
- **`favorite-events`** - User favorites management events

### Kafka Producers
- **UserProfile Service** - Publishes user credentials to `user-credentials` topic
- **Auth Service** - Publishes authentication events to `auth-events` topic
- **Favorites Service** - Publishes favorite actions to `favorite-events` topic

### Kafka Consumers
- **Auth Service Kafka** - Consumes user credentials for account creation
- **Favorites Service** - Processes favorite events for data consistency

### Event Flow
1. User registers → UserProfile service saves profile → Publishes credentials to Kafka
2. Auth Service Kafka consumes credentials → Creates auth user with hashed password
3. User actions (login, favorites) trigger Kafka events for audit and processing

## 🔄 Application Flow

### User Registration Flow
1. User fills registration form on frontend
2. Frontend sends request to UserProfile service via Gateway
3. UserProfile service saves user profile to database
4. UserProfile service publishes credentials to Kafka topic
5. Auth Service Kafka consumer processes credentials
6. Auth service creates authentication user with hashed password
7. JWT token returned to frontend for immediate login

### User Authentication Flow
1. User submits login credentials
2. Frontend sends request to Auth service via Gateway
3. Auth service validates credentials
4. JWT token generated and returned
5. Frontend stores token for subsequent API calls
6. Protected routes use JWT for authorization

### League Management Flow
1. User browses leagues on home page
2. Frontend requests leagues from League service via Gateway
3. User can search, filter, and view league details
4. User can add leagues to favorites
5. Favorites service processes request and publishes Kafka event
6. Real-time updates reflect in user's favorites page

### AI Search Flow
1. User accesses AI search page
2. User submits search query
3. Frontend sends request to Spring AI service via Gateway
4. AI service processes query using Gemini integration
5. Enhanced search results returned with recommendations
6. Results displayed with smart filtering and suggestions

## 🚀 Getting Started

### Prerequisites
- Java 24
- Node.js 18+
- Apache Kafka
- Maven

### Backend Setup
1. Start Kafka server
2. Start Eureka Server
3. Start Config Server
4. Start all microservices (auth-service, userprofile-service, etc.)
5. Start API Gateway

### Frontend Setup
1. Navigate to `sportsapp-frontend` directory
2. Run `npm install`
3. Run `ng serve`
4. Access application at `http://localhost:4200`

## 🏗️ Architecture

The application follows a microservices architecture pattern with:
- **API Gateway** as the single entry point
- **Service Discovery** with Eureka
- **Event-Driven Architecture** with Kafka
- **Centralized Configuration** with Config Server
- **JWT-based Authentication** across services
- **Load Balancing** through Spring Cloud Gateway

This architecture ensures scalability, fault tolerance, and maintainability while providing a seamless user experience.