# Portfolio Website & AI Chatbot - Technical Documentation

## Overview

This document provides comprehensive technical documentation for the portfolio website and integrated AI chatbot system. The application showcases a modern, responsive portfolio with an embedded AI assistant that can answer questions about the portfolio owner.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Frontend Components](#frontend-components)
4. [Chatbot Integration](#chatbot-integration)
5. [Deployment Architecture](#deployment-architecture)
6. [Data Flow Diagrams](#data-flow-diagrams)
7. [Development Workflow](#development-workflow)
8. [Configuration](#configuration)

---

## System Architecture

### High-Level Architecture

```mermaid
flowchart TB
    subgraph Client["Client Browser"]
        UI["React Frontend<br/>portfolio-c5c4d.web.app"]
        CW["ChatWidget Component"]
        CS["Chat Service<br/>(chatService.js)"]
    end
    
    subgraph Firebase["Firebase Hosting"]
        FH["Static Assets<br/>(HTML, CSS, JS)"]
    end
    
    subgraph GCP["Google Cloud Platform"]
        CR["Cloud Run<br/>Chatbot Backend"]
        AI["AI/LLM Service"]
    end
    
    User((User)) --> UI
    UI --> FH
    CW --> CS
    CS -->|"HTTPS/SSE"| CR
    CR --> AI
    AI -->|"Streaming Response"| CR
    CR -->|"data: chunks"| CS
    
    style Client fill:#1a1a2e,stroke:#6366f1,color:#fff
    style Firebase fill:#ff9800,stroke:#e65100,color:#fff
    style GCP fill:#4285f4,stroke:#1a73e8,color:#fff
```

### Component Architecture

```mermaid
flowchart TD
    subgraph App["App.jsx"]
        Navbar
        Main["main"]
        ChatWidget
        Footer
    end
    
    subgraph Main
        Hero["Hero (id='about')"]
        Expertise["Expertise (id='skills')"]
        Experience["Experience (id='experience')"]
        Projects["Projects (id='projects')"]
    end
    
    subgraph ChatWidget
        ChatMessage["ChatMessage<br/>(renders messages)"]
    end
    
    ChatWidget -->|"imports"| chatService["chatService.js"]
    
    style App fill:#1a1a2e,stroke:#6366f1,color:#fff
    style Main fill:#2d2d44,stroke:#8b5cf6,color:#fff
    style ChatWidget fill:#2d2d44,stroke:#8b5cf6,color:#fff
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Component Library |
| **Vite** | 7.2.4 | Build Tool & Dev Server |
| **Framer Motion** | 12.26.2 | Animations & Transitions |
| **Lucide React** | 0.562.0 | Icon Library |
| **React Icons** | 5.5.0 | Additional Icons |
| **Vanilla CSS** | - | Styling (with CSS Variables) |

### Backend (Chatbot)

| Technology | Purpose |
|------------|---------|
| **Google Cloud Run** | Serverless Container Hosting |
| **AI/LLM Service** | Natural Language Processing |
| **Server-Sent Events (SSE)** | Real-time Streaming Responses |

### Deployment & Infrastructure

| Service | Purpose |
|---------|---------|
| **Firebase Hosting** | Static Site Hosting (CDN) |
| **Firebase CLI** | Deployment Automation |

---

## Frontend Components

### Component Hierarchy

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Root component
├── index.css             # Global styles & CSS variables
├── components/
│   ├── Navbar.jsx        # Navigation with smooth scroll
│   ├── Hero.jsx          # Hero section with profile
│   ├── Expertise.jsx     # Skills/expertise cards
│   ├── Experience.jsx    # Work experience timeline
│   ├── Projects.jsx      # Project portfolio grid
│   ├── Footer.jsx        # Contact info & social links
│   ├── ChatWidget.jsx    # AI chatbot interface
│   └── ChatMessage.jsx   # Individual chat message
└── lib/
    └── chatService.js    # Chatbot API communication
```

### Component Descriptions

| Component | Description |
|-----------|-------------|
| **Navbar** | Sticky navigation with logo, nav links, and smooth scrolling |
| **Hero** | Profile section with photo, name, title, and CTA buttons |
| **Expertise** | Skills cards showcasing technical competencies |
| **Experience** | Timeline of professional work experience |
| **Projects** | Grid display of portfolio projects |
| **Footer** | Contact information, social links, and copyright |
| **ChatWidget** | Floating AI chatbot with expandable chat window |
| **ChatMessage** | Renders individual user/assistant messages |

---

## Chatbot Integration

### Chatbot Architecture

```mermaid
sequenceDiagram
    participant User
    participant ChatWidget
    participant chatService
    participant Backend as Cloud Run Backend
    participant AI as AI Service

    User->>ChatWidget: Types message & clicks Send
    ChatWidget->>chatService: sendMessageStream(message, callbacks)
    chatService->>Backend: POST /chat/stream<br/>{message, session_id}
    Backend->>AI: Process query
    AI-->>Backend: Generate response
    
    loop Streaming Response
        Backend-->>chatService: data: {chunk: "..."}
        chatService-->>ChatWidget: onChunk(text)
        ChatWidget-->>User: Display streaming text
    end
    
    Backend-->>chatService: data: {session_id: "..."}
    chatService->>chatService: saveSessionId()
    chatService-->>ChatWidget: onComplete()
    ChatWidget-->>User: Show complete response
```

### Chat Service API

The `chatService.js` module provides the following functions:

```javascript
// Session Management
getSessionId()      // Retrieve session ID from localStorage
saveSessionId(id)   // Store session ID in localStorage
clearSession()      // Remove session from localStorage

// API Communication
sendMessageStream(message, onChunk, onComplete, onError)
                    // Send message with streaming response
getSessionHistory() // Retrieve conversation history
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chat/stream` | POST | Send message, receive streaming response |
| `/session/{id}/history` | GET | Retrieve conversation history |

### Request/Response Format

**Request:**
```json
{
  "message": "Tell me about your experience",
  "session_id": "abc123-session-id"
}
```

**Streaming Response (SSE):**
```
data: {"chunk": "I have over "}
data: {"chunk": "17 years of "}
data: {"chunk": "experience..."}
data: {"session_id": "abc123-session-id"}
```

---

## Deployment Architecture

### Deployment Flow

```mermaid
flowchart LR
    subgraph Dev["Development"]
        Code["Source Code"]
        Vite["Vite Dev Server<br/>localhost:5173"]
    end
    
    subgraph Build["Build Process"]
        ViteBuild["vite build"]
        Dist["dist/<br/>Static Assets"]
    end
    
    subgraph Deploy["Deployment"]
        Firebase["firebase deploy<br/>--only hosting"]
        CDN["Firebase Hosting<br/>Global CDN"]
    end
    
    Code -->|"npm run dev"| Vite
    Code -->|"npm run build"| ViteBuild
    ViteBuild --> Dist
    Dist --> Firebase
    Firebase --> CDN
    
    style Dev fill:#1a1a2e,stroke:#6366f1,color:#fff
    style Build fill:#2d2d44,stroke:#8b5cf6,color:#fff
    style Deploy fill:#ff9800,stroke:#e65100,color:#fff
```

### Infrastructure Diagram

```mermaid
flowchart TB
    subgraph Internet["Internet"]
        Users((Users))
    end
    
    subgraph CDN["Firebase Hosting CDN"]
        Edge1["Edge Location 1"]
        Edge2["Edge Location 2"]
        EdgeN["Edge Location N"]
    end
    
    subgraph Origin["Origin"]
        Static["Static Assets<br/>(dist/)"]
    end
    
    subgraph Backend["GCP Cloud Run"]
        ChatAPI["Chatbot API<br/>us-central1"]
    end
    
    Users --> Edge1
    Users --> Edge2
    Users --> EdgeN
    Edge1 --> Static
    Edge2 --> Static
    EdgeN --> Static
    Users -->|"API Calls"| ChatAPI
    
    style Internet fill:#1a1a2e,stroke:#6366f1,color:#fff
    style CDN fill:#ff9800,stroke:#e65100,color:#fff
    style Origin fill:#4285f4,stroke:#1a73e8,color:#fff
    style Backend fill:#34a853,stroke:#1e8e3e,color:#fff
```

---

## Data Flow Diagrams

### User Navigation Flow

```mermaid
flowchart TD
    Start((User Visits Site)) --> Load["Load index.html"]
    Load --> Render["Render React App"]
    Render --> Display["Display Hero Section"]
    
    Display --> Nav{User Clicks Nav?}
    Nav -->|"About"| ScrollAbout["Smooth Scroll to Hero"]
    Nav -->|"Experience"| ScrollExp["Smooth Scroll to Experience"]
    Nav -->|"Expertise"| ScrollSkills["Smooth Scroll to Skills"]
    Nav -->|"Projects"| ScrollProj["Smooth Scroll to Projects"]
    Nav -->|"Contact"| ScrollContact["Smooth Scroll to Footer"]
    
    Display --> Chat{Open Chatbot?}
    Chat -->|"Click Chat Button"| OpenChat["Expand Chat Window"]
    OpenChat --> LoadHistory["Load Session History<br/>(if exists)"]
    LoadHistory --> Ready["Ready for Chat"]
    
    style Start fill:#6366f1,stroke:#4f46e5,color:#fff
    style Display fill:#1a1a2e,stroke:#6366f1,color:#fff
```

### Chatbot Message Flow

```mermaid
flowchart TD
    Start((User Types Message)) --> Validate{Valid Input?}
    Validate -->|"Empty"| Ignore["Ignore"]
    Validate -->|"Has Text"| AddUser["Add User Message to State"]
    
    AddUser --> SetLoading["Set Loading State"]
    SetLoading --> CallAPI["sendMessageStream()"]
    
    CallAPI --> Stream{Receive Chunk?}
    Stream -->|"data: chunk"| Append["Append to Assistant Message"]
    Append --> Stream
    
    Stream -->|"Complete"| ClearLoading["Clear Loading State"]
    Stream -->|"Error"| ShowError["Display Error Message"]
    
    ClearLoading --> SaveSession["Save Session ID"]
    SaveSession --> Ready((Ready for Next))
    
    style Start fill:#6366f1,stroke:#4f46e5,color:#fff
    style Ready fill:#34a853,stroke:#1e8e3e,color:#fff
    style ShowError fill:#ea4335,stroke:#c5221f,color:#fff
```

---

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev
# → Runs on http://localhost:5173

# Build for production
npm run build
# → Outputs to dist/

# Preview production build
npm run preview

# Deploy to Firebase
firebase deploy --only hosting
# → Deploys to https://portfolio-c5c4d.web.app
```

### Development Proxy Configuration

For local development, API calls are proxied to avoid CORS issues:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chatbot-backend-822791247982.us-central1.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

---

## Configuration

### Environment Variables

| Variable | Development | Production |
|----------|-------------|------------|
| `VITE_CHATBOT_API_URL` | `/api` (proxied) | `https://chatbot-backend-822791247982.us-central1.run.app` |

**Development (.env.development):**
```
VITE_CHATBOT_API_URL=/api
```

### Firebase Configuration

**firebase.json:**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

---

## Key Design Decisions

### 1. Streaming Responses
The chatbot uses Server-Sent Events (SSE) for real-time streaming responses, providing a responsive user experience as answers are generated.

### 2. Session Persistence
Session IDs are stored in `localStorage`, allowing conversation history to persist across page refreshes.

### 3. Vanilla CSS
The project uses vanilla CSS with CSS custom properties (variables) for theming, avoiding external CSS frameworks for maximum control and smaller bundle size.

### 4. Component-Based Architecture
React components are organized by feature, with clear separation between:
- **Layout components** (Navbar, Footer)
- **Content sections** (Hero, Experience, Projects)
- **Interactive features** (ChatWidget, ChatMessage)

### 5. Smooth Navigation
All navbar links use smooth scrolling with `scrollIntoView({ behavior: 'smooth' })` for polished user experience.

---

## URLs & Resources

| Resource | URL |
|----------|-----|
| **Live Website** | https://portfolio-c5c4d.web.app |
| **Chatbot API** | https://chatbot-backend-822791247982.us-central1.run.app |
| **Firebase Console** | https://console.firebase.google.com/project/portfolio-c5c4d |

---

*Documentation generated: January 2026*
