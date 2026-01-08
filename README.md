<p align="center">
  <img src="assets/logo.png" alt="Logo" width="200" draggable="false"/>
</p>

# Dialectiq <!-- omit in toc -->

> Watch AI minds meet and speak. A multi-agent AI conversation laboratory with real-time streaming.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8-764abc?logo=redux)](https://redux-toolkit.js.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)](https://vite.dev/)
[![OpenAI](https://img.shields.io/badge/OpenAI-Models-white)](https://platform.openai.com/docs/models)
[![Anthropic](https://img.shields.io/badge/Anthropic-Models-orange)](https://platform.claude.com/docs/en/about-claude/models/overview)
[![GoogleAI](https://img.shields.io/badge/GoogleAI-Models-yellow)](https://ai.google.dev/gemini-api/docs/models)

> **📣 Handcrafted Code**: This project was built the **old-fashioned way**, with actual thinking, debugging, and keyboard time. No "vibe-coding" shortcuts here. Every line, bug, and architectural decision came from human brain cells.

## Table of Contents <!-- omit in toc -->

- [🔍 Overview](#-overview)
- [💡 Why This Project?](#-why-this-project)
- [✨ Key Features](#-key-features)
- [🏗️ Tech Stack \& Architecture](#️-tech-stack--architecture)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [📁 Project Structure](#-project-structure)
- [📜 License](#-license)
- [🙏 Acknowledgements](#-acknowledgements)

## 🔍 Overview

**What It Is:** Dialectiq is an experimental platform for exploring modern generative AI capabilities through debate-driven dialogues. Multiple AI agents, each powered by different frontier or open-source LLMs, engage in topic-focused conversations that reveal their reasoning patterns, thinking capabilities, and generative strengths across text, images, and (planned) audio.

**Why It Matters:** As the GenAI landscape rapidly expands with models from OpenAI, Anthropic, Google, and open-source communities, understanding how these models reason, debate, and generate content in conversational contexts becomes crucial. Dialectiq provides a controlled environment to compare model behaviors, test prompt engineering strategies, and observe emergent interaction patterns when different AI architectures collaborate or compete in dialogue.

This project demonstrates:

- **GenAI Exploration:** Hands-on experimentation with frontier models (GPT-5, Claude 3.7 Sonnet, Gemini Pro) and open-source alternatives (Llama 3.2, gpt-oss-120b, Mixtral) to understand their reasoning and generation capabilities
- **Multi-Modal Generation:** Integration of text generation (conversation), image generation (agent avatars and conversation "snapshots"), and future audio synthesis for comprehensive AI output exploration
- **Debate-Driven Testing:** Topic-focused conversations that push models to demonstrate logical reasoning, creative thinking, and collaborative or adversarial dialogue patterns

## 💡 Why This Project?

The explosion of generative AI models from multiple providers creates a unique opportunity to explore and compare how different architectures think, reason, and generate content. Dialectiq was built to answer practical questions: _How does GPT-5's reasoning compare to Claude 3.5 Sonnet's in a debate?_ _Can open-source models like Llama 3.2 hold their own against frontier models?_ _What emergent patterns arise when models with different training approaches interact?_

Beyond model comparison, this project serves as a technical playground for modern AI integration challenges such as: handling real-time token streaming from multiple providers, orchestrating complex multi-agent dialogues, generating images programmatically for agent identities, and building responsive UIs that don't freeze during heavy generation workloads.

**What I Learned:**

- **GenAI Model Behaviors:** Hands-on experience with diverse models reveals distinct reasoning styles, verbosity patterns, and creative capabilities. Frontier models show stronger coherence in extended debates, while open-source models offer impressive performance at lower latency.

- **Prompt Engineering Strategies:** Crafting system prompts that elicit debate-worthy responses, maintain agent personalities, and guide topic-focused conversations requires iteration and model-specific tuning.

- **Multi-Modal AI Integration:** Combining text generation (conversations), image generation (avatars), and (planned) audio synthesis in a cohesive application reveals API integration patterns and resource management challenges.

- **Real-Time Streaming Architecture:** Building responsive UIs for token-by-token streaming from multiple concurrent LLM calls, handling backpressure, and supporting abort semantics mid-generation.

- **State Management at Scale:** Normalized Redux patterns for tracking multiple agents, messages, and streaming states without performance degradation as conversations grow.

## ✨ Key Features

- **Multi-Agent Orchestration:** Configure 2 agents with independent frontier LLMs, custom personalities, AI-generated avatars, and icebreaker messages. Agents maintain separate conversational contexts enabling personality-driven interactions.

- **Multi-Provider LLM Support:** Agents can be powered by different LLMs from various providers: **OpenAI** (gpt-5-mini, gpt-4o, gpt-4o-mini), **Anthropic** (claude-3-5-sonnet, claude-3-opus, claude-3-haiku), **Google Gemini** (gemini-pro, gemini-flash), or **open-source models** (llama-3.2-3b, mixtral-8x7b, gpt-oss-120b) hosted on Groq. Mix and match models within the same conversation to explore how different AI architectures interact.

- **AI-Generated Avatars:** Agent avatars are dynamically generated using OpenAI's image models (gpt-image-1, gpt-image-1-mini), creating unique visual identities that reflect each agent's personality and role in the conversation.

- **Topic-Driven Conversations:** Sessions are organized around specific discussion topics, ensuring focused multi-agent interactions and coherent dialogue flow. Agents build on the conversation theme while maintaining their individual perspectives.

- **Real-Time Streaming Generation:** Server-Sent Events style streaming parser updates messages token-by-token as generation occurs. Provides sub-50ms perceived latency from first token with full abort capability mid-generation.

- **Virtualized Chat Performance:** `react-virtuoso` windowed rendering maintains constant memory (~5MB) regardless of conversation length.

## 🏗️ Tech Stack & Architecture

This project combines modern frontend technologies with a custom backend abstraction layer to enable seamless multi-provider GenAI experimentation.

### Frontend <!-- omit in toc -->

- **React:** Handles real-time UI updates during token streaming without freezing. Concurrent features enable smooth rendering as multiple agents generate responses simultaneously.

- **TypeScript:** Manages complexity of multi-agent orchestration with strict typing for message routing, streaming states, and API responses across different LLM providers.

- **Redux Toolkit:** Normalized state pattern (`agentsById`, `messagesById`) prevents performance issues as conversations grow. Orchestrates async operations for sequential or concurrent agent responses.

- **React Virtuoso:** Renders only visible messages regardless of conversation length. Essential for extended debates without memory bloat.

- **Tailwind CSS:** Rapid UI iteration for agent layouts and conversation styling.

### Backend <!-- omit in toc -->

Powered by **[⚡️LLM Manager](https://github.com/MrEttore/llm-manager)**, a personal custom Node.js service providing a unified abstraction layer over multiple GenAI provider APIs (OpenAI, Anthropic, Google, Groq). It provides:

- **Chat Completions:** Standardized interface for text generation across all supported LLM providers
- **Response Streaming:** SSE-style token streaming for real-time message rendering
- **Image Generation:** Image creation via OpenAI's GPT image models
- **Audio Generation:** (Planned) Text-to-speech and speech-to-text capabilities

### Architecture Overview <!-- omit from toc -->

```
┌─────────────────────────────────────────────────────────────┐
│                    DIALECTIQ (Client)                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Multi-Agent Orchestration                          │    │
│  │  • Agent state management                           │    │
│  │  • Streaming message parsing                        │    │
│  │  • UI rendering (virtualized)                       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST + SSE
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   LLM MANAGER (Backend)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Unified API Abstraction Layer                       │   │
│  │  • Chat completions routing                          │   │
│  │  • Token streaming (SSE)                             │   │
│  │  • Image generation                                  │   │
│  │  • Audio synthesis                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Multiple Provider APIs
                            ▼
    ┌───────────┬────────────┬────────────┬──────────────┐
    │  OpenAI   │ Anthropic  │  Google    │  Groq        │
    │  API      │  API       │  Gemini    │  (OSS Models)│
    └───────────┴────────────┴────────────┴──────────────┘
```

**Key Architectural Decisions:**

- **Backend Abstraction (LLM Manager):** Instead of calling provider APIs directly from the frontend, all LLM interactions route through a custom backend service. This centralizes API key management, provides consistent interfaces across providers, and enables server-side rate limiting and caching.

- **Normalized Redux State:** Agents and messages stored by ID rather than nested structures. Enables O(1) lookups and prevents deep updates as conversations grow. Critical for multi-agent systems where state updates are frequent.

- **Streaming-First Architecture:** Token-by-token rendering via SSE parsing. LLM Manager streams responses from providers, frontend parses chunks incrementally. Provides instant feedback and reduces perceived latency.

**Data Flow:**

1. User initiates conversation with topic and agent configurations
2. Frontend dispatches thunk to orchestrate agent responses
3. LLM Manager receives request, routes to appropriate provider(s)
4. Provider streams tokens back through LLM Manager
5. Frontend parser yields chunks to Redux reducer
6. Virtuoso renders only visible messages (~50 DOM nodes regardless of total)

> This architecture separates provider-specific API complexity from the frontend, enabling easy addition of new LLM providers and multi-modal capabilities.

## 📁 Project Structure

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

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- **Frontier Model Providers:** OpenAI, Anthropic, and Google for their exceptional models and developer-friendly APIs that make multi-provider experimentation possible

- **Open-Source Communities:** The contributors behind Llama, Mixtral, and other open-weight models for democratizing access to powerful AI capabilities

- **[Ed Donner](https://github.com/ed-donner):** For outstanding AI engineering courses covering GenAI, LLMs, and agentic AI systems that informed many architectural decisions in this project

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/MrEttore">Ettore Marangon</a>
</p>

<p align="center">
  <sub>⭐ If you found this project helpful, consider giving it a star!</sub>
</p>
