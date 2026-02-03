# Hono Backend CI/CD Project

A demonstration of Continuous Integration and Continuous Deployment (CI/CD) pipeline implementation using a modern TypeScript backend application.

## 🚀 Project Overview

This project showcases a complete CI/CD workflow with automated building, testing, and deployment. It features a RESTful API built with Hono.js, comprehensive automated testing, Docker containerization, and dual CI/CD pipelines (Jenkins and GitHub Actions).

## 📋 Features

- **RESTful API** with multiple endpoints
- **Comprehensive Testing** with 40+ automated tests
- **Docker Containerization** for consistent deployments
- **Dual CI/CD Pipelines** (Jenkins & GitHub Actions)
- **Test Coverage Reporting** with detailed metrics
- **Automated Deployment** with Docker containers

## 🛠️ Technology Stack

- **Framework**: Hono.js (TypeScript)
- **Runtime**: Node.js 20
- **Testing**: Vitest with coverage reporting
- **Containerization**: Docker
- **CI/CD**: Jenkins & GitHub Actions
- **Version Control**: Git & GitHub

## 📁 Project Structure

```
hono-backend-cicd/
├── src/
│   ├── index.ts          # Main application with API routes
│   └── server.ts         # Server entry point
├── test/
│   ├── health.test.ts    # Health endpoint tests
│   ├── api.test.ts       # API endpoint tests
│   └── integration.test.ts # Integration tests
├── Dockerfile            # Docker configuration
├── Jenkinsfile          # Jenkins pipeline
├── vitest.config.ts     # Test configuration
└── PROJECT_DOCUMENTATION.md # Full documentation
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Welcome message and API info |
| `/health` | GET | Health check with uptime |
| `/api/users` | GET | Get all users |
| `/api/users/:id` | GET | Get user by ID |
| `/api/status` | GET | Application status and metrics |

## 🚦 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm (comes with Node.js)
- Docker (optional, for containerization)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ArsemaYemiru/hono-backend-cicd.git
cd hono-backend-cicd
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

The application will start on `http://localhost:3000`

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled application |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **API Tests**: Complete endpoint functionality testing

**Run tests:**
```bash
npm test
```

**Generate coverage report:**
```bash
npm run test:coverage
```

## 🐳 Docker

**Build Docker image:**
```bash
docker build -t hono-backend-cicd .
```

**Run container:**
```bash
docker run -p 3000:3000 hono-backend-cicd
```

## 🔄 CI/CD Pipeline

The project uses two CI/CD pipelines:

### Jenkins Pipeline Stages:
1. Checkout code
2. Install dependencies
3. Compile TypeScript
4. Run tests
5. Build Docker image
6. Push to Docker Hub
7. Deploy container

### GitHub Actions
Mirrors the Jenkins pipeline with YAML configuration.

## 📚 Documentation

For complete project documentation, see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)

The documentation includes:
- Detailed architecture explanation
- CI/CD pipeline design
- Testing strategy
- Deployment process
- Troubleshooting guide
- Future improvements

## 🎯 Project Goals

This project demonstrates:
- ✅ Automated CI/CD pipeline implementation
- ✅ Comprehensive automated testing
- ✅ Docker containerization
- ✅ Modern TypeScript development
- ✅ DevOps best practices

## 👥 Team

- **Developer**: Arsema Yemiru
- **CI/CD**: Jenkins & GitHub Actions implementation

## 📄 License

This is an educational project for CI/CD course demonstration.

## 🔗 Links

- **Repository**: https://github.com/ArsemaYemiru/hono-backend-cicd
- **Docker Hub**: arsema/hono-backend-cicd

---

**Made with ❤️ for CI/CD Course Project**

