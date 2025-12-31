import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import { generateAvatar } from "@/features/agents/thunks";
import type { Agent, AgentsState } from "@/features/agents/types";
import { generateResponse } from "@/features/session/thunks/generateResponse";
import type { ApiMessage } from "@/types/domain";

const initialState: AgentsState = {
  agentIds: [],
  agentsById: {},
  activeAgentId: undefined,
  slotAgentIds: [null, null],
};

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setActiveAgentId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.agentsById[id]) return;

      state.activeAgentId = id;
    },
    switchActiveAgent: (state) => {
      const activeId = state.activeAgentId;
      const nonActiveId = state.agentIds.find((id) => id !== activeId);
      if (!nonActiveId) return;

      state.activeAgentId = nonActiveId;
    },
    addAgent: {
      reducer: (state, action: PayloadAction<{ agent: Agent; slotIndex: 0 | 1 }>) => {
        const { agent, slotIndex } = action.payload;

        const prevId = state.slotAgentIds[slotIndex];
        if (prevId && prevId !== agent.id) {
          delete state.agentsById[prevId];

          const prevIndex = state.agentIds.indexOf(prevId);
          if (prevIndex !== -1) state.agentIds.splice(prevIndex, 1);

          if (state.slotAgentIds[0] === prevId) state.slotAgentIds[0] = null;
          if (state.slotAgentIds[1] === prevId) state.slotAgentIds[1] = null;

          if (state.activeAgentId === prevId) state.activeAgentId = undefined;
        }

        state.agentsById[agent.id] = agent;
        if (!state.agentIds.includes(agent.id)) state.agentIds.push(agent.id);
        state.slotAgentIds[slotIndex] = agent.id;
      },
      prepare: (input: { agent: Omit<Agent, "id">; slotIndex: 0 | 1 }) => {
        const id = crypto.randomUUID();
        const agent = { id, ...input.agent };
        const slotIndex = input.slotIndex;
        return { payload: { agent, slotIndex } };
      },
    },
    updateAgent: (state, action: PayloadAction<Partial<Agent>>) => {
      const id = action.payload.id;
      if (!id) return;

      const existing = state.agentsById[id];
      if (!existing) return;

      state.agentsById[id] = { ...existing, ...action.payload } as Agent;
    },
    clearAgent: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.agentsById[id]) return;

      const index = state.agentIds.indexOf(id);
      if (index === -1) return;

      delete state.agentsById[id];
      state.agentIds.splice(index, 1);

      if (state.slotAgentIds[0] === id) state.slotAgentIds[0] = null;
      if (state.slotAgentIds[1] === id) state.slotAgentIds[1] = null;

      if (state.activeAgentId === id) state.activeAgentId = undefined;
    },
    updateAgentConversationMemory: (
      state,
      action: PayloadAction<{ agentId: string; message: ApiMessage }>,
    ) => {
      const { agentId, message } = action.payload;
      const agent = state.agentsById[agentId];
      if (!agent) return;

      agent.conversationMemory.push(message);
    },
    setAvatar: (state, action: PayloadAction<{ agentId: string; avatarUrl: string }>) => {
      const { agentId, avatarUrl } = action.payload;
      const agent = state.agentsById[agentId];
      if (!agent) return;

      agent.avatar = avatarUrl;
      agent.isGeneratingAvatar = false;
    },
    resetAgents: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.fulfilled, (state, action) => {
      const { assistantMessage, userMessage } = action.payload;

      const activeId = state.activeAgentId;
      const nonActiveId = state.agentIds.find((id) => id !== activeId);
      if (!activeId || !nonActiveId) return;
      if (!state.agentsById[activeId] || !state.agentsById[nonActiveId]) return;

      agentsSlice.caseReducers.updateAgentConversationMemory(
        state,
        updateAgentConversationMemory({ agentId: activeId, message: assistantMessage }),
      );

      agentsSlice.caseReducers.updateAgentConversationMemory(
        state,
        updateAgentConversationMemory({
          agentId: nonActiveId,
          message: userMessage,
        }),
      );
    });

    builder.addCase(generateAvatar.pending, (state, action) => {
      const { agentId } = action.meta.arg;
      const agent = state.agentsById[agentId];
      if (!agent) return;

      agent.isGeneratingAvatar = true;
    });
    builder.addCase(generateAvatar.fulfilled, (state, action) => {
      const { agentId, avatarUrl } = action.payload;
      agentsSlice.caseReducers.setAvatar(state, setAvatar({ agentId, avatarUrl }));
    });
    builder.addCase(generateAvatar.rejected, (state, action) => {
      const { agentId } = action.meta.arg;
      const agent = state.agentsById[agentId];
      if (!agent) return;

      agent.isGeneratingAvatar = false;
    });
  },
});

export const getAgentIds = (state: RootState) => state.agents.agentIds;
export const getAgentsById = (state: RootState) => state.agents.agentsById;
export const getAgents = createSelector(getAgentIds, getAgentsById, (ids, byId) =>
  ids.map((id) => byId[id]).filter(Boolean),
);
export const getActiveAgentId = (state: RootState) => state.agents.activeAgentId;
export const getSlotAgentId = (state: RootState, slotIndex: 0 | 1) =>
  state.agents.slotAgentIds[slotIndex];
export const getAgentForSlot = (state: RootState, slotIndex: 0 | 1) => {
  const id = getSlotAgentId(state, slotIndex);
  return id ? state.agents.agentsById[id] : undefined;
};
export const getAgentIdAndIndex = (state: RootState, id: string) => {
  const agent = state.agents.agentsById[id];
  const index = state.agents.agentIds.indexOf(id);
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
  setAvatar,
} = agentsSlice.actions;
export default agentsSlice.reducer;
