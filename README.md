<p align="center">
  <img src="assets/logo.png" alt="Logo" width="200" draggable="false"/>
</p>

# Dialectiq <!-- omit in toc -->

Watch AI minds meet and speak. Spin up AI agents that generate, debate, and refine ideas in streamed conversations. Built to explore agent orchestration, prompting strategies, and reasoning.

## Table of Contents <!-- omit in toc -->

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Run Locally](#run-locally)
  - [Build](#build)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

Dialectiq began as a personal exploration into modern generative AI APIs (OpenAI, Anthropic, Ollama) and evolved into a laboratory for multi‑agent dialogue and reasoning. Multiple AI "agents" respond, debate, and build on each other's ideas while the UI streams their dialogs chunk‑by‑chunk.

Core objectives:

- A safe sandbox to experiment with multi‑agent orchestration & prompt design
- Rapid, resilient UI updates from streaming sources (Server‑Sent style parsing over fetch body)
- Scalable, normalized Redux state with ergonomic selector & hook patterns
- Performance‑minded rendering (virtualized lists, minimal re-renders, small memory footprint)

## Tech Stack

- Language: TypeScript
- Frontend: React 19 + Vite
- Styling: Tailwind CSS
- State: Redux Toolkit + custom hooks
- Async AI layer: Fetch + streaming parser to a personal LLM manager service (OpenAI under the hood)

## Features

Implemented:

- Configurable agent personalities: model, system prompt, avatar seed, icebreaker
- Multi‑agent chat with streaming message generation
- Abort support for runaway generations
- Virtualized message list for long conversations (`react-virtuoso`)
- Normalized message & agent state slices

Planned / in progress:

- Dynamic AI‑generated avatars (image generation)
- Text‑to‑speech playback for messages
- Comprehensive multi‑modal (text + voice + images) expansion
- Conversation scoring / reasoning analytics layer
- Session persistence & replay

## Project Structure

```text
src/
├─ app/                # Redux store setup
├─ features/
│  ├─ chat/            # chat slice, streaming components
│  ├─ agents/          # agents slice, settings & profiles
│  └─ session/         # session flow orchestration & async thunks
├─ ui/                 # reusable UI
├─ services/           # API client to LLM manager (stream + completion)
├─ types/              # domain models & shared types
├─ utils/              # helpers
├─ assets/             # local images/logo
└─ public/             # static assets served by Vite
```

## Getting Started

### Environment Variables

Create a `.env` file at the project root:

```bash
# LLM manager base URL (point to your running llm-manager instance)
VITE_LLM_MANAGER_BASE_URL=http://localhost:3000
```

### Installation

```bash
git clone https://github.com/MrEttore/Dialectiq.git
cd Dialectiq
npm install
```

### Run Locally

```bash
npm run dev           # start Vite dev server
npm run test          # run unit tests (Vitest)
npm run test:coverage # coverage report
npm run lint          # ESLint checks
npm run typecheck     # TypeScript type checking
```

### Build

```bash
npm run build         # type check then create production bundle
npm run preview       # locally preview production build
```

## License

Currently unlicensed (personal learning project). If you intend to use code beyond personal experimentation, please open an issue to discuss adding a license.

## Acknowledgements

- OpenAI API
- Inspiration from chat UIs focusing on streaming & virtualization techniques
- Community tooling: Vite, Redux Toolkit, Tailwind CSS, React Query, React Virtuoso

---

If you read this far and want to chat about frontend and AI development, reach out. I'm always happy to connect!
