# SportHub - Complete Sports Management Application

<div align="center">

![SportHub Logo](https://img.shields.io/badge/SportHub-Sports%20Management-blue?style=for-the-badge&logo=sports)

[![Angular](https://img.shields.io/badge/Angular-20.1.0-red?style=flat&logo=angular)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?style=flat&logo=spring)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17%2B-orange?style=flat&logo=java)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)](LICENSE)

**A comprehensive sports management platform with AI-powered search, league management, and user personalization features.**

</div>

## 🌟 Features

- **🌍 Global Sports Coverage** - Access leagues and competitions worldwide
- **⚽ Multi-Sport Support** - Football, Basketball, Cricket, Tennis, and more
- **🤖 AI-Powered Search** - Intelligent sports information retrieval using Google Gemini
- **❤️ Favorites Management** - Save and manage your favorite leagues and teams
- **👤 User Profiles** - Personalized user experience with profile management
- **🔐 Secure Authentication** - JWT-based authentication and authorization
- **📱 Responsive Design** - Modern, mobile-friendly Angular interface
- **⚡ Real-time Updates** - Live statistics and data updates
- **🏗️ Microservices Architecture** - Scalable and maintainable backend

## 🏗️ Architecture

SportHub follows a modern microservices architecture with the following components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Angular App   │    │   API Gateway   │    │ Service Registry│
│   (Port 4200)   │◄───►│   (Port 8080)   │◄───►│   (Port 8761)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │ Auth Service │ │User Profile │ │  League   │
        │ (Port 8081)  │ │(Port 8089)  │ │(Port 8082)│
        └──────────────┘ └─────────────┘ └───────────┘
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │ Favorites    │ │  AI/Gemini  │ │   Config  │
        │ (Port 8085)  │ │(Port 8083)  │ │  Server   │
        └──────────────┘ └─────────────┘ └───────────┘
                │               │
        ┌───────▼──────┐ ┌──────▼──────┐
        │   MongoDB    │ │    MySQL    │
        │  Database    │ │  Database   │
        └──────────────┘ └─────────────┘
                │
        ┌───────▼──────┐
        │Apache Kafka  │
        │ (Port 9092)  │
        └──────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Angular CLI** - `npm install -g @angular/cli`
- **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- **MySQL 8.0+** - [Download](https://www.mysql.com/downloads/)
- **MongoDB 4.4+** - [Download](https://www.mongodb.com/try/download/community)
- **Apache Kafka 2.8+** - [Download](https://kafka.apache.org/downloads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shailendra-08/Sports-App.git
   cd Sports-App
   ```

2. **Set up databases**
   ```bash
   # MySQL (for auth and user profiles)
   mysql -u root -p
   CREATE DATABASE auth;
   CREATE DATABASE bookdb;
   
   # MongoDB (for favorites)
   mongosh
   use sportsapp
   ```

3. **Start Kafka**
   ```bash
   # Start Zookeeper
   bin/zookeeper-server-start.sh config/zookeeper.properties
   
   # Start Kafka
   bin/kafka-server-start.sh config/server.properties
   ```

4. **Start Backend Services** (in order)
   ```bash
   # 1. Service Registry
   cd sports-app/Backend/eureka-server
   mvn spring-boot:run
   
   # 2. Config Server
   cd ../config-server
   mvn spring-boot:run
   
   # 3. API Gateway
   cd ../api-gateway
   mvn spring-boot:run
   
   # 4. Auth Service
   cd ../auth-service
   mvn spring-boot:run
   
   # 5. User Profile Service
   cd ../UserProfile
   mvn spring-boot:run
   
   # 6. League Service
   cd ../league-service
   mvn spring-boot:run
   
   # 7. Favorites Service
   cd ../favorites-service
   mvn spring-boot:run
   
   # 8. AI Service
   cd ../spring-ai
   mvn spring-boot:run
   ```

5. **Start Frontend**
   ```bash
   cd sportsapp-frontend
   npm install
   ng serve
   ```

6. **Access the application**
   - Frontend: http://localhost:4200
   - API Gateway: http://localhost:8080
   - Eureka Dashboard: http://localhost:8761

## 📊 API Documentation

### Base URL
All API requests go through the API Gateway: `http://localhost:8080`

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Register new user | `{"username": "string", "password": "string"}` |
| POST | `/api/auth/login` | User login | `{"username": "string", "password": "string"}` |
| GET | `/api/auth/secure` | Test secure endpoint | Headers: `Authorization: Bearer <token>` |

### User Profile Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/user/register` | Create user profile | `{"fullName": "string", "email": "string", "password": "string", "age": number, "bio": "string"}` |
| GET | `/api/user/getUser/{email}` | Get user by email | - |
| PATCH | `/api/user/update/{email}` | Update user profile | `{"field": "value"}` |

### League Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/api/league/` | Get leagues by country | `country=string` |

### Favorites Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/fav/favorites` | Add favorite league | `{"strLeague": "string", "strSport": "string", "strCountry": "string", "idLeague": number, "email": "string", ...}` |
| GET | `/api/fav/favorites/{email}` | Get user favorites | - |
| DELETE | `/api/fav/favorites/delete` | Remove favorite | Query: `email=string&idLeague=number` |

### AI/Gemini Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/gemini/ask` | Ask AI about sports | `{"prompt": "string"}` |

## 🧪 Testing

### Backend Testing
```bash
# Run tests for specific service
cd sports-app/Backend/[service-name]
mvn test

# Run all tests
mvn test -f sports-app/Backend/
```

### Frontend Testing
```bash
cd sportsapp-frontend
npm test                # Unit tests
npm run e2e            # End-to-end tests
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in each service directory:

**Auth Service**
```
MYSQL_URL=jdbc:mysql://localhost:3306/auth
MYSQL_USERNAME=root
MYSQL_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

**AI Service**
```
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend (environment.ts)**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  geminiApiUrl: 'http://localhost:8080/api/gemini'
};
```

## 🛠️ Development

### Project Structure
```
Sports-App/
├── sports-app/Backend/          # Backend microservices
│   ├── api-gateway/            # API Gateway (Port 8080)
│   ├── auth-service/           # Authentication (Port 8081)
│   ├── auth-service-kafka/     # Kafka Auth Service
│   ├── config-server/          # Configuration Server
│   ├── eureka-server/          # Service Discovery (Port 8761)
│   ├── favorites-service/      # Favorites Management (Port 8085)
│   ├── league-service/         # League Data (Port 8082)
│   ├── spring-ai/             # AI Services (Port 8083)
│   └── UserProfile/           # User Profiles (Port 8089)
└── sportsapp-frontend/         # Angular Frontend (Port 4200)
    ├── src/app/components/     # Reusable components
    ├── src/app/pages/         # Page components
    ├── src/app/services/      # Angular services
    └── src/assets/           # Static assets
```

### Code Style

**Backend (Java)**
- Follow Spring Boot conventions
- Use Lombok for reducing boilerplate
- Implement proper exception handling
- Add comprehensive tests

**Frontend (Angular)**
- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Write component tests

### Adding New Features

1. **Backend Service**
   ```bash
   # Create new Spring Boot service
   spring init --dependencies=web,jpa,mysql my-service
   # Add to Eureka registration
   # Configure API Gateway routing
   ```

2. **Frontend Component**
   ```bash
   ng generate component my-component
   ng generate service my-service
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write comprehensive tests for new features
- Update documentation as needed
- Ensure all services start successfully
- Test API endpoints thoroughly

## 📱 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Production Configuration
- Configure production databases
- Set up SSL certificates
- Configure environment-specific variables
- Set up monitoring and logging

## 🏷️ Versioning

We use [SemVer](http://semver.org/) for versioning. See [releases](https://github.com/Shailendra-08/Sports-App/releases) for available versions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Shailendra** - *Lead Developer* - [Shailendra-08](https://github.com/Shailendra-08)

## 🙏 Acknowledgments

- [The Sports DB](https://www.thesportsdb.com/) for sports data API
- [Google Gemini](https://deepmind.google/technologies/gemini/) for AI capabilities
- [Spring Boot](https://spring.io/projects/spring-boot) for microservices framework
- [Angular](https://angular.io/) for frontend framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Shailendra-08/Sports-App/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Shailendra-08/Sports-App/discussions)
- **Email**: [Contact](mailto:your-email@example.com)

---

<div align="center">
Made with ❤️ by the SportHub Team
</div>