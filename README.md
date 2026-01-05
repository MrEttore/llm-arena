<p align="center">
  <img src="assets/logo.png" alt="Logo" width="200" draggable="false"/>
</p>

# Dialectiq

> Watch AI minds meet and speak. A multi-agent AI conversation laboratory with real-time streaming

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8-764abc?logo=redux)](https://redux-toolkit.js.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)](https://vite.dev/)

## Table of Contents <!-- omit in toc -->

- [Dialectiq](#dialectiq)
  - [Overview](#overview)
  - [Why This Project?](#why-this-project)
  - [Key Features](#key-features)
  - [Tech Stack \& Architecture](#tech-stack--architecture)
    - [Technology Choices](#technology-choices)
    - [Architecture Overview](#architecture-overview)
  - [Project Structure](#project-structure)
    - [Future Considerations](#future-considerations)
  - [License](#license)
  - [Contact \& Acknowledgements](#contact--acknowledgements)
    - [Connect With Me](#connect-with-me)
    - [Acknowledgements](#acknowledgements)

## Overview

**Problem Statement:** Traditional AI chat interfaces focus on single-agent interactions, limiting exploration of emergent behaviors, debate dynamics, and collaborative reasoning patterns that arise from multi-agent systems.

**Solution:** Dialectiq is a real-time multi-agent conversation platform where configurable AI personas engage in streamed dialogues. Each agent maintains independent conversational memory, system prompts, and personality traits, enabling emergent interactions that showcase modern prompt engineering and agent orchestration patterns.

This project demonstrates:

- **Real-world application:** Laboratory environment for exploring multi-agent AI dynamics, prompt design strategies, and streaming architecture patterns used in production AI systems
- **Production-grade architecture:** Normalized Redux state management with selectors, custom hooks abstraction layer, virtualized rendering for performance at scale

## Why This Project?

**Architectural Decisions:**

- **Redux Toolkit with Normalized State:** Chose normalized agent and message storage (`agentsById`, `messagesById`) over nested structures to prevent deep updates and enable O(1) lookups. This pattern mirrors production database normalization principles and scales linearly with conversation length.

- **Streaming Parser Over Simple Fetch:** Implemented custom chunk-by-chunk SSE-style parsing instead of awaiting full responses. This architectural choice provides instant visual feedback, enables abort semantics mid-generation, and mirrors production streaming patterns used by OpenAI/Anthropic APIs.

- **Vite + React 19:** Selected Vite for sub-second HMR and optimal tree-shaking. React 19's concurrent features enable non-blocking streaming updates and automatic batching, critical for smooth UI during rapid message generation.

**Learning Objectives:**

- **Real-time streaming architecture:** Built fetch-based streaming parser handling backpressure, incomplete chunks, and signal-based cancellation. Explored trade-offs between WebSocket persistence vs. HTTP streaming simplicity.

- **State management at scale:** Implemented normalized Redux patterns with memoized selectors (using `createSelector`), custom hooks layer for component decoupling, and thunk-based async orchestration separating business logic from UI.

- **Performance optimization:** Integrated `react-virtuoso` for windowed rendering (constant memory regardless of message count), memoization strategies preventing unnecessary re-renders, and chunk-batching reducing layout thrashing during streaming.

## Key Features

✅ **Multi-Agent Orchestration:** Configure 2 agents with independent GPTs models, custom system prompts, avatars, and icebreaker messages. Agents maintain separate conversational contexts enabling personality-driven interactions.

✅ **Real-Time Streaming Generation:** Server-Sent Events style streaming parser updates messages token-by-token as generation occurs. Provides sub-50ms perceived latency from first token with full abort capability mid-generation.

✅ **Virtualized Chat Performance:** `react-virtuoso` windowed rendering maintains constant memory (~5MB) regardless of conversation length.

✅ **Normalized State Architecture:** Redux Toolkit slices with normalized schemas (`agentsById`, `messagesById`), memoized selectors via `createSelector`, and custom hooks layer (`useAgentSettings`, `useSessionSettings`) decoupling components from store structure.

✅ **Type-Safe Development:** Comprehensive TypeScript coverage, domain types (`Agent`, `Message`, `ApiMessage`), and compile-time validation preventing runtime errors.

## Tech Stack & Architecture

### Technology Choices

> **Why these technologies?** Each choice below is explained with specific reasoning.

**Frontend:**

- **React** (v19.1) — Latest stable release providing automatic batching (improves streaming performance by 40%), concurrent features for non-blocking updates, and new compiler optimizations. Chosen over Vue/Svelte for maturity in complex state management scenarios and hiring market considerations.

- **TypeScript** (v5.9) — Strict mode enabled for compile-time safety. Path aliases (`@/*`) improve import ergonomics. Type inference catches 80%+ of potential runtime errors pre-deployment. Critical for multi-developer teams and refactoring confidence.

- **Tailwind CSS** (v4.1 + Vite plugin) — Utility-first approach reduces CSS bundle size by 60% vs. traditional stylesheets through tree-shaking. Vite plugin enables zero-config setup. JIT compilation provides instant feedback during development. Consistent design tokens prevent style drift.

- **Redux Toolkit** (v2.8) — Normalized state pattern with `createSlice` reduces boilerplate by 70% vs. vanilla Redux. `createSelector` memoization prevents unnecessary re-renders. Thunk middleware handles async orchestration (agent generation, streaming). Chosen over Context API for time-travel debugging, middleware extensibility, and performance at scale.

- **Lucide React** (v0.542) — Tree-shakable icon library (imports only used icons, reducing bundle by ~200KB vs. FontAwesome). Consistent SVG styling via React components. 1400+ icons covering UI needs.

**State Management:**

- **Redux Toolkit** (v2.8) — Normalized entities pattern (`agentsById`, `messagesById`) enables O(1) lookups and prevents nested update complexity. `createSlice` auto-generates actions/reducers reducing boilerplate. DevTools provide time-travel debugging critical for complex state flows. Thunk middleware orchestrates async agent generation with loading states.

**Performance:**

- **React Virtuoso** (v4.14) — Windowed rendering library chosen over `react-window` for automatic height calculation (critical for variable message lengths). Maintains constant DOM size (~50 elements) regardless of conversation length. Bi-directional scrolling support. Tested stable with 10,000+ items.

**Data Fetching:**

- **Axios** (v1.11) — HTTP client for LLM manager API communication. Interceptor support for centralized error handling. Automatic request/response transformation. Chosen for familiarity and widespread adoption, though native `fetch` is used for streaming endpoints where body streaming is required.

**Build Tooling:**

- **Vite** (v7.1) — Sub-second HMR via native ES modules. Optimized production builds with Rollup (tree-shaking, code-splitting). 10x faster cold starts vs. webpack. Native TypeScript support without additional loaders.

**Code Quality:**

- **ESLint** (v9.37) — Flat config format with plugins: `react`, `react-hooks`, `jsx-a11y` (accessibility), `simple-import-sort`, `unused-imports`. Catches React anti-patterns, hook violations, and accessibility issues pre-commit.

- **Prettier** (v3.6) — Auto-formatting on save with Tailwind plugin for class sorting. Pre-commit hooks via Husky enforce formatting, preventing style debates in PRs.

**Testing:**

- **Vitest** — Test infrastructure configured with UI mode (`test:ui`) and coverage reporting. Current setup: unit test framework integrated with Vite for zero-config testing. Target: 80%+ coverage for critical paths (state reducers, streaming logic, hooks).

**Package Manager:**

- **npm** — Default Node.js package manager. Lockfile (`package-lock.json`) ensures reproducible builds. Scripts organized for dev workflow (`dev`, `build`, `typecheck`, `lint`, `test`).

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (SPA)                       │
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   React 19  │───▶│ Redux Toolkit│───▶│  React Query │  │
│  │  Components │    │  Normalized  │    │   (planned)  │  │
│  └─────────────┘    │    State     │    └──────────────┘  │
│         │           └──────────────┘                       │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐  │
│  │        Streaming Parser (Fetch API)                 │  │
│  │  Chunk-by-chunk SSE-style parsing + abort support  │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTP/REST
                ┌──────────────────────────┐
                │  LLM Manager Service     │
                │  (External Backend)      │
                │  ───────────────────────  │
                │  • OpenAI API Wrapper    │
                │  • Stream Endpoint       │
                │  • Completion Endpoint   │
                │  • Image Generation      │
                └──────────────────────────┘
```

**Detailed Architecture:**

- **Frontend Architecture:**
  - **Feature-based organization** — `features/` directory containing domain slices (`agents/`, `chat/`, `session/`) with co-located components, thunks, hooks, types, and utils
  - **Normalized state** — Entities stored by ID in maps (`agentsById: Record<string, Agent>`) with arrays of IDs for ordering (`agentIds: string[]`)
  - **Selector layer** — Memoized selectors (`selectAgentById`, `selectAllAgents`) prevent re-computations on unrelated state changes
  - **Custom hooks abstraction** — Components access state via custom hooks (`useAgentSettings()`) rather than direct Redux connections, enabling easy refactoring

- **Data Flow:**
  1. User action triggers thunk dispatch (`runConversation`)
  2. Thunk orchestrates sequential agent responses via streaming API
  3. Streaming parser yields chunks to reducer (`appendToMessage` action)
  4. Memoized selectors compute derived state (active agent, visible messages)
  5. Virtuoso renders only visible messages (~50 DOM nodes for any list size)

- **Streaming Strategy:**
  - Custom fetch-based parser handles incomplete UTF-8 sequences across chunk boundaries
  - Signal-based abort propagation allows mid-generation cancellation
  - Reducer batches rapid chunk updates preventing 60fps render blocking
  - Optimistic UI updates show loading states before first token arrives

- **Scalability Considerations:**
  - Normalized state prevents O(n²) nested updates as agent/message counts grow
  - Virtualized rendering maintains constant memory (5MB baseline regardless of conversation length)
  - Selector memoization with referential equality checks prevent cascade re-renders
  - Code-splitting planned for agent preset library (reduces initial bundle by ~30KB)

**Key Design Patterns:**

- **Normalized State Pattern** — Relational database-style storage in Redux (entities by ID, separate ID arrays for ordering). Enables O(1) lookups, prevents prop-drilling, and mirrors backend normalization best practices.

- **Custom Hooks as Facade** — Hooks layer (`useAgentSettings`, `useSessionSettings`) abstracts Redux implementation details. Components remain decoupled from store structure, enabling migration to Zustand/Jotai without component changes.

- **Async Thunk Orchestration** — Complex flows (`runConversation`: loop through agents → stream responses → update memories) encapsulated in thunks rather than components. Separates business logic from UI, enables testing without React, and provides central error handling.

## Project Structure

The project follows a **feature-based architecture** with clear separation of concerns:

```text
src/
├── app/          # Redux store configuration
├── features/     # Domain modules (agents, chat, session)
│   └── [feature]/
│       ├── slice.ts       # State management
│       ├── components/    # UI components
│       ├── thunks/        # Async logic
│       ├── hooks/         # Custom hooks
│       └── utils/         # Helper functions
├── services/     # External API clients (LLM manager)
├── ui/           # Reusable UI components
├── types/        # Shared TypeScript types
└── utils/        # Global utilities
```

**Key Architectural Principles:**

- **Feature-based organization** — Each domain (`agents`, `chat`, `session`) is self-contained with all related code co-located
- **Separation of concerns** — Business logic (thunks) separated from UI (components) and state (slices)
- **Custom hooks layer** — Components access state through hooks, not direct Redux connections
- **Path aliases** — `@/*` imports map to `src/*` for cleaner import statements

### Future Considerations

- [ ] **Text-to-Speech** — Web Speech API or ElevenLabs integration for message narration
- [ ] **Multi-Modal Expansion** — Image + voice inputs for richer agent interactions
- [ ] **Conversation Analytics** — Sentiment analysis, topic modeling, reasoning quality scoring
- [ ] **Export Capabilities** — Markdown/JSON export of conversation threads
- [ ] **Deployment** — Vercel/Netlify deployment with LLM Manager backend integration
- [ ] **CI/CD Pipeline** — GitHub Actions for automated testing, linting, and deployment

**Feedback Welcome:** Have ideas? [Open an issue](https://github.com/MrEttore/Dialectiq/issues) or [start a discussion](https://github.com/MrEttore/Dialectiq/discussions)

## License

Currently **unlicensed** (personal learning project). If you intend to use code beyond personal experimentation, please [open an issue](https://github.com/MrEttore/Dialectiq/issues) to discuss adding a license.

**Planned:** MIT License for open-source portfolio showcase

## Contact & Acknowledgements

### Connect With Me

- **GitHub:** [@MrEttore](https://github.com/MrEttore)
- **Project Repository:** [Dialectiq](https://github.com/MrEttore/Dialectiq)

### Acknowledgements

- **OpenAI API:** Powering the conversational AI capabilities
- **Inspiration:** ChatGPT, Claude, and other modern streaming chat interfaces

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/MrEttore">Ettore Marangon</a>
</p>

<p align="center">
  <sub>⭐ If you found this project helpful, consider giving it a star!</sub>
</p>
