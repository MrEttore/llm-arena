<p align="center">
  <img src="assets/logo.png" alt="Logo" width="200" draggable="false"/>
</p>

# Dialectiq <!-- omit in toc -->

> Watch AI minds meet and speak. A multi-agent AI conversation laboratory with real-time streaming.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8-764abc?logo=redux)](https://redux-toolkit.js.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)](https://vite.dev/)

> **📣 Handcrafted Code**: This project was built the **old-fashioned way**, with actual thinking, debugging, and keyboard time. No AI code generation or "vibe-coding" shortcuts here. Every line, bug, and architectural decision came from human brain cells.

## Table of Contents <!-- omit in toc -->

- [Overview](#overview)
- [Why This Project?](#why-this-project)
- [Key Features](#key-features)
- [Tech Stack \& Architecture](#tech-stack--architecture)
- [Project Structure](#project-structure)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

**Problem Statement:** Traditional AI chat interfaces focus on single-agent interactions, limiting exploration of emergent behaviors, debate dynamics, and collaborative reasoning patterns that arise from multi-agent systems.

**Solution:** Dialectiq is a real-time multi-agent conversation platform where configurable AI personas engage in streamed dialogues. Each agent maintains independent conversational memory, system prompts, and personality traits, enabling emergent interactions that showcase modern prompt engineering and agent orchestration patterns.

This project demonstrates:

- **Real-world application:** Laboratory environment for exploring multi-agent AI dynamics, prompt design strategies, and streaming architecture patterns used in production AI systems
- **Production-grade architecture:** Normalized Redux state management, custom hooks abstraction layer, virtualized rendering for performance at scale

## Why This Project?

This project explores emergent behaviors in multi-agent AI systems by enabling multiple autonomous agents to collaborate, debate, and build on each other's reasoning in real-time. As generative AI continues to evolve beyond single-agent chat interfaces, understanding multi-agent orchestration patterns becomes essential for building sophisticated AI applications. Dialectiq serves as a technical laboratory for experimenting with streaming architectures, prompt engineering strategies, and state management patterns required to coordinate complex AI interactions at scale.

**Learning Objectives:**

- **Real-time streaming architecture:** Built fetch-based streaming parser handling backpressure, incomplete chunks, and signal-based cancellation.

- **State management at scale:** Implemented normalized Redux patterns with memoized selectors, custom hooks layer for component decoupling, and thunk-based async orchestration separating business logic from UI.

- **Performance optimization:** Integrated `react-virtuoso` for windowed rendering (constant memory regardless of message count), memoization strategies preventing unnecessary re-renders, and chunk-batching reducing layout thrashing during streaming.

## Key Features

- **Multi-Agent Orchestration:** Configure 2 agents with independent GPTs models, custom system prompts, avatars, and icebreaker messages. Agents maintain separate conversational contexts enabling personality-driven interactions.

- **Real-Time Streaming Generation:** Server-Sent Events style streaming parser updates messages token-by-token as generation occurs. Provides sub-50ms perceived latency from first token with full abort capability mid-generation.

- **Virtualized Chat Performance:** `react-virtuoso` windowed rendering maintains constant memory (~5MB) regardless of conversation length.

## Tech Stack & Architecture

### Technology Choices <!-- omit from toc -->

- **React:** Essential for this project's heavy reliance on dynamic, real-time UI updates during streaming. Concurrent features enable non-blocking message rendering as chunks arrive, preventing UI freezes during rapid token generation. Component-based architecture naturally maps to the multi-agent system where each agent is an independent entity with its own state and controls.

- **TypeScript** Critical for managing the complexity of multi-agent orchestration. Strict typing catches errors in message routing between agents, ensures type-safe reducer actions during streaming, and provides autocomplete for nested state structures. Path aliases (`@/*`) keep imports clean across the feature-based architecture.

- **Redux Toolkit:** Specifically chosen for normalized state management required by multi-agent systems. The `agentsById` and `messagesById` pattern prevents performance degradation as conversations grow. Thunk middleware provides a clean way to orchestrate async operations like sequential agent responses.

- **Tailwind CSS:** Enables rapid UI iteration when experimenting with agent presentation styles and chat layouts. Utility classes make it easy to adjust spacing, colors, and responsive behavior without context switching.

- **React Virtuoso:** Essential for handling potentially infinite conversation lengths. Automatically calculates variable message heights (agents produce different length responses), maintains smooth scrolling performance, and prevents memory bloat by rendering only visible messages. Critical for the project's goal of supporting extended multi-agent dialogues.

### Architecture Overview <!-- omit from toc -->

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (SPA)                       │
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │    React    │───▶│ Redux Toolkit│───▶│  React Query │    │
│  │  Components │    │  Normalized  │    │   (planned)  │    │
│  └─────────────┘    │    State     │    └──────────────┘    │
│         │           └──────────────┘                        │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Streaming Parser                   │    │
│  │  Chunk-by-chunk SSE-style parsing + abort support   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTP/REST
                ┌──────────────────────────┐
                │  LLM Manager Service     │
                │  (External Backend)      │
                │  ─────────────────────── │
                │  • OpenAI API Wrapper    │
                │  • Stream Endpoint       │
                │  • Completion Endpoint   │
                │  • Image Generation      │
                └──────────────────────────┘
```

**Core Architectural Decisions:**

The architecture is built on three fundamental choices that enable production-grade performance and maintainability:

1. **Normalized Redux State:** Agent and message entities stored by ID (`agentsById`, `messagesById`) rather than nested structures. This mirrors relational database normalization, preventing deep updates and enabling O(1) lookups that scale linearly with conversation length.

2. **Custom Streaming Parser:** Chunk-by-chunk SSE-style parsing via fetch rather than awaiting complete responses. Provides instant visual feedback, abort semantics mid-generation, and mirrors production patterns used by OpenAI/Anthropic APIs.

3. **Modern Tooling Choices:** Vite selected for sub-second HMR and optimal tree-shaking. React 19's concurrent features enable non-blocking streaming updates and automatic batching, critical for smooth UI during rapid message generation.

**Frontend Architecture:**

- **Feature-based organization:** `features/` directory containing domain slices (`agents/`, `chat/`, `session/`) with co-located components, thunks, hooks, types, and utils
- **Normalized state:** Entities stored by ID in maps (`agentsById: Record<string, Agent>`) with arrays of IDs for ordering (`agentIds: string[]`)
- **Selector layer:** Memoized selectors (`selectAgentById`, `selectAllAgents`) prevent re-computations on unrelated state changes
- **Custom hooks abstraction:** Components access state via custom hooks (`useAgentSettings()`) enabling easy refactoring

**Data Flow:**

1. User action triggers thunk dispatch (`runConversation`)
2. Thunk orchestrates sequential agent responses via streaming API
3. Streaming parser yields chunks to reducer (`appendToMessage` action)
4. Memoized selectors compute derived state (active agent, visible messages)
5. Virtuoso renders only visible messages (~50 DOM nodes for any list size)

**Streaming Strategy:**

- Custom fetch-based parser handles incomplete UTF-8 sequences across chunk boundaries
- Signal-based abort propagation allows mid-generation cancellation
- Reducer batches rapid chunk updates preventing 60fps render blocking
- Optimistic UI updates show loading states before first token arrives

**Scalability Considerations:**

- Normalized state prevents O(n²) nested updates as agent/message counts grow
- Virtualized rendering maintains constant memory (5MB baseline regardless of conversation length)
- Selector memoization with referential equality checks prevent cascade re-renders
- Code-splitting planned for agent preset library (reduces initial bundle by ~30KB)

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

### Future Considerations <!-- omit from toc -->

- **Text-to-Speech:** Web Speech API or ElevenLabs integration for message narration
- **Multi-Modal Expansion:** Image + voice inputs for richer agent interactions
- **Conversation Analytics:** Sentiment analysis, topic modeling, reasoning quality scoring
- **Export Capabilities:** Markdown/JSON export of conversation threads
- **Deployment:** Vercel/Netlify deployment with LLM Manager backend integration
- **CI/CD Pipeline:** GitHub Actions for automated testing, linting, and deployment

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **OpenAI API:** Powering the conversational AI capabilities
- **Inspiration:** ChatGPT, Claude, and other modern streaming chat interfaces

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/MrEttore">Ettore Marangon</a>
</p>

<p align="center">
  <sub>⭐ If you found this project helpful, consider giving it a star!</sub>
</p>
