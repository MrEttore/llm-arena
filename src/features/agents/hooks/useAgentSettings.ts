import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addAgent, clearAgent, getAgents, updateAgent } from "@/features/agents/slice";
import type { Agent } from "@/features/agents/types";
import { loadRandomPreset } from "@/utils/loadRandomPreset";

export function useAgentSettings(agentIndex: number) {
  const [name, setName] = useState<string>("");
  const [model, setModel] = useState<string>("gpt-4.1-mini");
  const [personality, setPersonality] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const agents = useAppSelector(getAgents);

  const existing = agents[agentIndex];

  useEffect(() => {
    setName(existing?.name ?? "");
    setModel(existing?.model ?? "gpt-4.1-mini");
    setPersonality(existing?.systemPrompt ?? "");
    setAvatarUrl(existing?.avatarUrl ?? "");
    setIsLoadingImage(false);
  }, [existing]);

  // TODO: Generate avatar using AI service
  const handleGenerateAvatar = () => {
    setIsLoadingImage(true);
    const url = `https://avatar.iran.liara.run/public?ts=${Date.now()}`;
    setAvatarUrl(url);
  };

  const handleLoadPreset = () => {
    const randomPreset = loadRandomPreset();
    const { name, model, systemPrompt } = randomPreset;

    setName(name);
    setModel(model);
    setPersonality(systemPrompt);
    setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !model || !personality) {
      setError("All fields are required!");
      return;
    }

    if (existing) {
      dispatch(
        updateAgent({
          id: existing.id,
          name,
          model,
          systemPrompt: personality,
          avatarUrl,
        }),
      );
    } else {
      const newAgent: Agent = {
        id: crypto.randomUUID(),
        name,
        model,
        systemPrompt: personality,
        conversationMemory: [],
        avatarUrl,
      };
      dispatch(addAgent(newAgent));
    }
    setError(null);
  };

  const handleClear = () => {
    if (existing) dispatch(clearAgent(existing.id));
    setName("");
    setModel("gpt-4.1-mini");
    setPersonality("");
    setAvatarUrl("");
    setIsLoadingImage(false);
    setError(null);
  };

  const handleClearError = () => setError(null);

  return {
    fields: { name, model, personality, avatarUrl, isLoadingImage },
    setters: { setName, setModel, setPersonality, setIsLoadingImage },
    error,
    existing,
    handleLoadPreset,
    handleGenerateAvatar,
    handleSubmit,
    handleClear,
    handleClearError,
  };
}
