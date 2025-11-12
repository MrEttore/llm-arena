<p align="center">
  <img src="assets/logo.png" alt="Logo" width="200" draggable="false"/>
</p>

# Dialectiq <!-- omit in toc -->

Watch AI minds meet and speak. Spin up AI contestants that generate, debate, and refine ideas in streamed conversations. Built to explore agent orchestration, prompting strategies, and reasoning.

## Table of Contents <!-- omit in toc -->

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Run Locally](#run-locally)
  - [Build](#build)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

Dialectiq began as a personal exploration into modern generative AI APIs (OpenAI, custom LLM manager) and evolved into a laboratory for multi‑agent dialogue and reasoning. Multiple AI "contestants" respond, debate, and build on each other's ideas while the UI streams their words chunk‑by‑chunk.

Core objectives:

- Rapid, resilient UI updates from streaming sources (Server‑Sent style parsing over fetch body)
- Scalable, normalized Redux state (messages + agents) with ergonomic selector & hook patterns
- Performance‑minded rendering (virtualized lists, minimal re-renders, small memory footprint)
- A safe sandbox to experiment with multi‑agent orchestration & prompt design

## Tech Stack

- Language: TypeScript
- Frontend: React 19 + Vite
- Styling: Tailwind CSS
- State: Redux Toolkit + custom hooks
- Async AI layer: Fetch + streaming parser to a personal LLM manager service (OpenAI under the hood)
- Tooling: ESLint (custom config), Prettier (+ Tailwind plugin), Vitest, TypeScript strict mode

## Features

Implemented:

- Multi‑agent chat with streaming message generation (append chunks as they arrive)
- Abort support for runaway generations
- Configurable contestant personalities: model, system prompt, avatar seed, icebreaker
- Virtualized message list for long conversations (`react-virtuoso`)
- Normalized message & agent state slices (fast lookup + derived selectors)

Planned / in progress:

- Dynamic AI‑generated avatars (image generation)
- Text‑to‑speech playback for messages
- Multi‑modal (text + voice + images) expansion
- Conversation scoring / reasoning analytics layer
- Session persistence & replay

## Project Structure

```text
src/
├─ app/                # Redux store setup
├─ features/
│  ├─ chat/            # chat slice, streaming components
│  ├─ contestants/     # contestant slice, settings & profiles
│  └─ match/           # match flow orchestration & async thunks
├─ ui/                 # reusable UI
├─ services/           # API client to LLM manager (stream + completion)
├─ types/              # domain models & shared types
├─ utils/              # small helpers
├─ assets/             # local images/logo
└─ public/             # static assets served by Vite
```

## Getting Started

### Prerequisites

- Node.js 18+ (tested on recent LTS)
- npm (bundled) — or swap for pnpm/yarn if preferred

### Environment Variables

Create a `.env` file at the project root:

```bash
# LLM manager base URL (point to your running manager instance)
VITE_LLM_MANAGER_BASE_URL=http://localhost:8787
```

`VITE_` prefix exposes the variable to the client via Vite.

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

## Roadmap

- [ ] AI avatar/image generation for contestants
- [ ] Text‑to‑speech integration
- [ ] Conversation scoring & reasoning analytics
- [ ] Session save + replay viewer
- [ ] Multi‑modal expansion (voice/image alongside text)

## License

Currently unlicensed (personal learning project). If you intend to use code beyond personal experimentation, please open an issue to discuss adding a license.

## Acknowledgements

- OpenAI API
- Inspiration from chat UIs focusing on streaming & virtualization techniques
- Community tooling: Vite, Redux Toolkit, Tailwind CSS, React Query, React Virtuoso

---

If you read this far and want to chat about frontend and AI, reach out. I'm always happy to connect!
