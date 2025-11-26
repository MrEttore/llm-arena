import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import type { Agent, AgentsState } from "@/features/agents/types";
import { generateResponse } from "@/features/session/thunks/generateResponse";
import type { ApiMessage } from "@/types/domain";

const initialState: AgentsState = {
  agents: [],
};

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setActiveAgentId: (state, action: PayloadAction<string>) => {
      state.activeAgentId = action.payload;
    },
    switchActiveAgent: (state) => {
      const nonActiveAgent = state.agents.find((a) => a.id !== state.activeAgentId);
      if (!nonActiveAgent) return;

      state.activeAgentId = nonActiveAgent.id;
    },
    addAgent: (state, action: PayloadAction<Agent>) => {
      state.agents.push(action.payload);
    },
    updateAgent: (state, action: PayloadAction<Partial<Agent>>) => {
      const index = state.agents.findIndex((a: Agent) => a.id === action.payload.id);
      if (index !== -1) {
        state.agents[index] = {
          ...state.agents[index],
          ...action.payload,
        } as Agent;
      }
    },
    clearAgent: (state, action: PayloadAction<string>) => {
      state.agents = state.agents.filter((a: Agent) => a.id !== action.payload);
    },
    updateAgentConversationMemory: (
      state,
      action: PayloadAction<{ agentId: string; message: ApiMessage }>,
    ) => {
      const { agentId, message } = action.payload;
      const agent = state.agents.find((a: Agent) => a.id === agentId);
      if (agent) agent.conversationMemory.push(message);
    },
    resetAgents: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.pending, (state) => {
      const activeAgentId = state.activeAgentId;
      const activeAgentIndex = state.agents.findIndex((a) => a.id === activeAgentId);
      if (activeAgentIndex !== -1) state.agents[activeAgentIndex].isThinking = true;
    });
    builder.addCase(generateResponse.fulfilled, (state, action) => {
      const { assistantMessage, userMessage } = action.payload;

      const activeAgentId = state.activeAgentId;
      const activeAgentIndex = state.agents.findIndex((a) => a.id === activeAgentId);
      const nonActiveAgent = state.agents.find((a: Agent) => a.id !== activeAgentId);
      if (!activeAgentId || !nonActiveAgent?.id) return;

      agentsSlice.caseReducers.updateAgentConversationMemory(
        state,
        updateAgentConversationMemory({ agentId: activeAgentId, message: assistantMessage }),
      );

      agentsSlice.caseReducers.updateAgentConversationMemory(
        state,
        updateAgentConversationMemory({
          agentId: nonActiveAgent.id,
          message: userMessage,
        }),
      );

      if (activeAgentIndex !== -1) state.agents[activeAgentIndex].isThinking = false;
    });
  },
});

export const getAgents = (state: RootState) => state.agents.agents;
export const getActiveAgentId = (state: RootState) => state.agents.activeAgentId;
export const getAgentById = (state: RootState, id: string) => {
  const agent = state.agents.agents.find((a) => a.id === id);
  const index = state.agents.agents.findIndex((a) => a.id === id);
  return { agent, index };
};
export const getActiveAgentPair = createSelector(
  [getAgents, getActiveAgentId],
  (agents, activeAgentId) => {
    const activeAgent = agents.find((a) => a.id === activeAgentId);
    const nonActiveAgent = agents.find((a) => a.id !== activeAgentId);
    return { activeAgent, nonActiveAgent };
  },
);

export const {
  setActiveAgentId,
  switchActiveAgent,
  addAgent,
  updateAgent,
  clearAgent,
  updateAgentConversationMemory,
  resetAgents,
} = agentsSlice.actions;
export default agentsSlice.reducer;
