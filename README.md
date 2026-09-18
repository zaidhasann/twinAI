# TwinAI

TwinAI is an AI-powered career dashboard for students and early-career developers. It brings together skill analysis, placement readiness, interview preparation, resume feedback, company matching, and a Digital Twin view in one focused workspace.

## Features

- Placement readiness overview with performance metrics
- Digital Twin skill and career signal visualization
- Skill gap analysis with prioritized learning recommendations
- Personalized placement roadmap
- Company matching with readiness scores and preparation plans
- DSA, system design, and interview practice workflows
- Interview analytics and progress tracking
- Resume analysis and ATS-oriented recommendations
- Career profile integrations
- Responsive dashboard navigation with mobile support
- AI Career Assistant panel
- Glass-inspired dark UI with green and purple accents

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Recharts
- Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The Vite server is configured to run on port `3000`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Available Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/dashboard` | Career overview dashboard |
| `/digital-twin` | Digital Twin visualization |
| `/skills` | Skill gap analysis |
| `/roadmap` | Placement preparation roadmap |
| `/companies` | Company matches |
| `/companies/:id` | Company preparation details |
| `/practice` | Practice recommendations |
| `/interviews` | Interview readiness and analytics |
| `/progress` | Progress history |
| `/resume` | Resume analysis |
| `/integrations` | Career data integrations |
| `/profile` | Student profile |
| `/help` | Help and guidance |

## Project Structure

```text
src/
├── components/    Reusable dashboard and UI components
├── data/          Mock data used by the local prototype
├── layouts/       Shared application layouts
├── pages/         Route-level screens
├── services/      Data access and API service layer
├── types/         Shared TypeScript types
├── utils/         Shared utility functions
├── App.tsx        Application routes
├── index.css      Global theme and typography
└── main.tsx       React entry point
```

## Data Layer

The current application uses the service layer in `src/services/apiService.ts` with local mock data for the prototype experience. This makes the dashboard usable without an external backend while keeping data access separated from the UI components.

## Development Notes

- The `@` alias resolves to `src`.
- The application uses a dark graphite surface system with green and purple accent colors.
- Google Fonts are loaded for the Bodoni Moda display typeface and Plus Jakarta Sans interface typography.
- Build output is generated in `dist/`.

## License

This project is currently intended for private development and demonstration. Add a license before distributing it publicly.
# TwinAI

TwinAI is an AI-powered career readiness dashboard for students and early-career developers. It combines a digital career twin, skill-gap analysis, placement readiness metrics, company matching, interview practice, roadmap planning, resume insights, and career-data integrations in one workspace.

## Features

- Placement readiness overview with performance metrics
- Digital Twin visualization for career signals and confidence
- Skill-gap analysis with prioritized learning recommendations
- Personalized placement roadmap with progress tracking
- Company matching with readiness scores and preparation plans
- Coding and interview practice workflows
- Interview analytics and feedback
- Resume analysis and ATS-oriented suggestions
- Career profile and integration management
- Responsive dashboard layout with mobile navigation
- Glass-inspired dark UI with green and purple accents

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Recharts
- Lucide React
- PostCSS and Autoprefixer

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone <your-repository-url>
cd ai_twin
npm install
```

### Development

```bash
npm run dev
```

The development server runs on [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/dashboard` | Career readiness overview |
| `/digital-twin` | Digital Twin visualization |
| `/skills` | Skill-gap analysis |
| `/roadmap` | Placement preparation roadmap |
| `/companies` | Company matching |
| `/companies/:id` | Company readiness details |
| `/practice` | Coding practice |
| `/interviews` | Interview practice and analytics |
| `/progress` | Readiness progress tracking |
| `/resume` | Resume analysis |
| `/integrations` | Career-data integrations |
| `/profile` | Student profile |
| `/help` | Help and support |

## Project Structure

```text
src/
├── components/   Shared UI components
├── data/         Mock application data
├── layouts/      Shared page layouts
├── pages/        Routed application screens
├── services/     Data-access and API service layer
├── types/        Shared TypeScript interfaces
├── utils/        Reusable helpers
├── App.tsx       Application routes
├── index.css     Global theme and styling
└── main.tsx      React entry point
```

## Data Layer

The current application uses the service layer and mock data to simulate profile, skills, roadmap, company, interview, resume, and integration responses. This makes the frontend runnable without a backend. Replace the implementations in `src/services/` when connecting TwinAI to a real API.

## Design Direction

TwinAI uses a dark graphite foundation with emerald green and violet accents. Typography combines Bodoni Moda for editorial display headings with Plus Jakarta Sans for product UI and data-heavy content.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |

## Contributing

1. Create a feature branch.
2. Make focused changes that follow the existing component and styling patterns.
3. Run `npm run build` before opening a pull request.
4. Describe user-facing behavior and validation steps in the pull request.

## License

No license has been specified yet. Add a license file before distributing the project publicly.
