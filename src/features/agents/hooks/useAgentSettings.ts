import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addAgent, clearAgent, getAgentForSlot, updateAgent } from "@/features/agents/slice";
import { generateAvatar } from "@/features/agents/thunks";
import { loadAgentPreset } from "@/features/agents/utils";

export function useAgentSettings(agentIndex: number) {
  const slotIndex = agentIndex as 0 | 1;

  const [name, setName] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [personality, setPersonality] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const existing = useAppSelector((state) => getAgentForSlot(state, slotIndex));

  const agentId = existing?.id ?? null;
  const isGeneratingAvatar = existing?.isGeneratingAvatar ?? false;

  const canSubmit = useMemo(() => {
    return Boolean(name.trim() && model.trim() && personality.trim());
  }, [name, model, personality]);

  const canGenerateAvatar = useMemo(() => {
    return Boolean(agentId && personality.trim() && !isGeneratingAvatar);
  }, [agentId, personality, isGeneratingAvatar]);

  const isDirty = useMemo(() => {
    if (!existing) return false;

    const updatedName = name.trim();
    const updatedModel = model.trim();
    const updatedPersonality = personality.trim();

    const existingName = (existing.name ?? "").trim();
    const existingModel = (existing.model ?? "").trim();
    const existingPersonality = (existing.systemPrompt ?? "").trim();

    return (
      updatedName !== existingName ||
      updatedModel !== existingModel ||
      updatedPersonality !== existingPersonality
    );
  }, [existing, name, model, personality]);

  const canUpdate = useMemo(() => {
    return Boolean(existing && isDirty && canSubmit);
  }, [existing, isDirty, canSubmit]);

  useEffect(() => {
    setName(existing?.name ?? "");
    setModel(existing?.model ?? "");
    setPersonality(existing?.systemPrompt ?? "");
    setAvatar(existing?.avatar ?? "");
  }, [existing]);

  const handleGenerateAvatar = () => {
    if (!agentId) {
      setError("Add the agent first before generating an avatar.");
      return;
    }
    dispatch(generateAvatar({ agentId, name, personality }));
  };

  const handleLoadPreset = () => {
    const randomPreset = loadAgentPreset();
    const { name, model, systemPrompt } = randomPreset;

    setName(name);
    setModel(model);
    setPersonality(systemPrompt);
    setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      setError("All fields are required!");
      return;
    }

    if (existing) {
      if (!isDirty) {
        setError(null);
        return;
      }

      dispatch(
        updateAgent({
          id: existing.id,
          name: name.trim(),
          model: model.trim(),
          systemPrompt: personality.trim(),
          avatar,
        }),
      );

      setError(null);
      return;
    }

    const agent = {
      name: name.trim(),
      model: model.trim(),
      systemPrompt: personality.trim(),
      conversationMemory: [],
      avatar,
    };

    dispatch(addAgent({ agent, slotIndex }));

    setError(null);
  };

  const handleClear = () => {
    if (agentId) dispatch(clearAgent(agentId));

    setName("");
    setModel("");
    setPersonality("");
    setAvatar("");
    setError(null);
  };

  const handleClearError = () => setError(null);

  return {
    fields: { name, model, personality, avatar },
    setters: { setName, setModel, setPersonality },
    error,
    existing,
    isGeneratingAvatar,
    canSubmit,
    canGenerateAvatar,
    canUpdate,
    handleLoadPreset,
    handleGenerateAvatar,
    handleSubmit,
    handleClear,
    handleClearError,
  };
}
