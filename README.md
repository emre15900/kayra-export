# Micro-Frontend E-commerce Platform

Modern e-commerce platform built with Next.js MultiZone architecture, featuring separate micro-frontends for home and cart functionality.

## Architecture

This project demonstrates a micro-frontend architecture with:

- **Home App** (Port 3000): Product listing, details, and main shopping interface
- **Cart App** (Port 3001): Shopping cart management and checkout process
- **Shared**: Common types, utilities, and data structures

## Technologies

- **Framework**: Next.js 13 with App Router
- **Package Manager**: Yarn with Workspaces
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Event-driven communication via localStorage
- **Containerization**: Docker & Docker Compose
- **Architecture**: Next.js MultiZone for micro-frontend coordination

## Features

### Home Application
- Product catalog with responsive grid layout
- Product cards with images, ratings, and descriptions
- Add to cart functionality with toast notifications
- Cross-app cart counter updates
- Modern hero section and feature highlights
- Responsive navigation with mobile menu

### Cart Application
- Real-time cart item display and management
- Quantity adjustment and item removal
- Order summary with tax calculation
- Checkout process simulation
- Empty cart state with call-to-action
- Cross-app navigation integration

### Technical Features
- **Micro-frontend Communication**: Event-driven architecture using custom events
- **State Synchronization**: Real-time updates between apps via localStorage
- **Docker Integration**: Containerized services with Docker Compose
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Shared TypeScript types across applications
- **Performance**: Optimized images and lazy loading

## Getting Started

### Prerequisites
- Node.js 18+
- Yarn package manager
- Docker & Docker Compose (for containerized deployment)

### Development Setup

1. **Install dependencies**:
```bash
yarn install
```

2. **Start development servers**:
```bash
yarn dev
```

This will start both applications:
- Home: http://localhost:3000
- Cart: http://localhost:3001/cart

### Docker Deployment

1. **Build and start containers**:
```bash
yarn docker:build
yarn docker:up
```

2. **Stop containers**:
```bash
yarn docker:down
```

## Project Structure

```
├── apps/
│   ├── home/                 # Home micro-frontend
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/            # Utilities
│   │   └── Dockerfile      # Container configuration
│   └── cart/               # Cart micro-frontend
│       ├── app/           # Next.js App Router pages
│       ├── components/    # React components
│       ├── lib/          # Utilities
│       └── Dockerfile    # Container configuration
├── shared/                # Shared utilities and types
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Common utilities
│   └── data/             # Mock data
├── docker-compose.yml    # Multi-container orchestration
└── package.json         # Root package configuration
```

## Configuration

### MultiZone Setup
Each application is configured with Next.js rewrites for cross-app navigation:

- **Home App**: Proxies `/cart/*` requests to cart application
- **Cart App**: Uses `/cart` base path for proper routing

### Environment Variables
Applications communicate via:
- localStorage for persistent state
- Custom DOM events for real-time updates
- HTTP rewrites for navigation

## Development Guidelines

### Adding New Features
1. Determine which micro-frontend owns the feature
2. Update shared types if needed
3. Implement event-driven communication for cross-app updates
4. Ensure responsive design principles
5. Add appropriate error handling and loading states

### State Management
- Use localStorage for persistent cart state
- Dispatch custom events for cross-app communication
- Implement optimistic updates for better UX

### Styling Guidelines
- Follow Tailwind CSS utility-first approach
- Use consistent spacing (8px system)
- Implement proper contrast ratios
- Ensure mobile responsiveness

## Deployment

### Production Build
```bash
yarn build
```

### Docker Production
```bash
docker-compose -f docker-compose.yml up --build -d
```

### CI/CD Integration
The project is ready for deployment on:
- Vercel (with appropriate configurations)
- Netlify (static builds)
- AWS/GCP (containerized deployment)

## Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components and images loaded on demand
- **Caching**: Proper HTTP headers and static asset caching
- **Bundle Analysis**: Use `@next/bundle-analyzer` for optimization

## Security Considerations

- **CORS Configuration**: Proper cross-origin headers
- **Input Validation**: Client-side validation with proper sanitization
- **State Management**: Secure localStorage usage
- **Container Security**: Non-root user in Docker containers

## Testing Strategy

Recommended testing approach:
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Cypress for cross-app workflows
- **E2E Tests**: Playwright for full user journeys
- **Visual Regression**: Chromatic for UI consistency

## Contributing

1. Follow conventional commit messages
2. Ensure type safety across all applications
3. Test cross-app communication thoroughly
4. Update documentation for architectural changes
5. Maintain consistent code style

## License

This project is licensed under the MIT License.