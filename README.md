![Logo](assets/logo.png)

# Dialectiq

> Watch AI minds meet and speak. Dialectiq is a playground for multi‑agent conversation and reasoning experiments.

Dialectiq started as a personal exploration into modern generative AI APIs from streaming chat completions to image generation and text‑to‑speech. It quickly evolved into a full‑featured experimental web app where multiple AI “contestants” debate, respond, and build on each other’s ideas while the UI streams their words in real time.

This is not a product; it’s a learning lab. The goal is to prototype, refine, and push the boundaries of UI/AI integration: fast and resilient state management, performance‑minded rendering, and ergonomic hooks that make experimentation fun. If you’re curious about scalable frontend architecture for AI experiences, this is the kind of playground where ideas grow into patterns.

## 💡 Current Features

- Multi‑agent chat (“contestants”) powered by streaming text completions. Messages render as they arrive via a SSE stream parser. Abort/cancel support for long or runaway generations
- Configurable agent personalities. Choose model, system prompt, avatar, and an icebreaker to kick off the match
- Efficient chat rendering using virtualization. Smooth scrolling and low memory footprint even with long conversations
- Normalized Redux state for messages and participants

## 🔮 Roadmap / Upcoming Work

- Image generation: dynamic avatars for contestants via AI APIs
- Text‑to‑Speech: let contestants “speak” their messages
- Multi‑modal expansion: combine text, voice, and visuals
- Advanced reasoning / scoring mode: analyze conversation quality
- Session saving & replays: explore past debates and outcomes

## 🧰 Tech Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS
- State management: Redux Toolkit + custom hooks
- Async & API layer: OpenAI (and other GenAI providers) via a [personal LLM manager](https://github.com/MrEttore/SanctuAIry/tree/main/llm-manager) service
- Optimizations: Chat message virtualization + normalized state

These choices are intentional for learning best practices in scalable frontend architecture: co‑locating feature logic, normalizing state to avoid re‑renders, composing UI from focused components, and wiring streaming APIs through predictable async boundaries.

## 🧪 Learning Goals

- Build modular, scalable React apps with Redux and custom hooks
- Integrate real‑time streaming APIs for conversational UIs
- Experiment with generative AI (text now; image/audio next)
- Design clean component architecture and performance‑first UIs

## 🧱 Project Structure

```text
src/
├─ app/                # store, app-wide setup
├─ features/
│  ├─ chat/            # chat logic, streaming state, virtualization
│  ├─ contestants/     # agent settings, avatars
│  └─ match/           # match orchestration & flow
├─ ui/
│  ├─ layout/          # layout pieces
│  └─ buttons/         # reusable UI components
├─ assets/             # local assets (logos, images)
├─ services/           # LLM manager API client
├─ types/              # domain models & shared types
└─ utils/              # small helpers (scroll, builders)
```

## ✨ About This Project

Dialectiq reflects my curiosity for modern frontend engineering and AI‑powered experiences. It's being built in my free time to explore how humans and machines might reason together. It’s an evolving space to practice scalable UI patterns while integrating real‑time generative systems.

---

If you read this far and want to chat about frontend + AI, reach out — always happy to exchange notes on patterns and performance.
