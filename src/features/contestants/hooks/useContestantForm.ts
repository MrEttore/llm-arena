import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { PRESETS } from "@/data/presets";
import {
  addContestant,
  clearContestant,
  getContestants,
  updateContestant,
} from "@/features/contestants/slice";
import type { Contestant } from "@/types/domain";

export function useContestantForm(contestantNumber: number) {
  const [name, setName] = useState<string>("");
  const [model, setModel] = useState<string>("gpt-4.1-mini");
  const [personality, setPersonality] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const contestants = useAppSelector(getContestants);

  const existing = contestants[contestantNumber];

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
    const { name, model, systemPrompt } = PRESETS[contestantNumber];
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
        updateContestant({
          id: existing.id,
          name,
          model,
          systemPrompt: personality,
          avatarUrl,
        }),
      );
    } else {
      const newContestant: Contestant = {
        id: crypto.randomUUID(),
        name,
        model,
        systemPrompt: personality,
        messages: [],
        avatarUrl,
      };
      dispatch(addContestant(newContestant));
    }
    setError(null);
  };

  const handleClear = () => {
    if (existing) dispatch(clearContestant(existing.id));
    setName("");
    setModel("gpt-4.1-mini");
    setPersonality("");
    setAvatarUrl("");
    setIsLoadingImage(false);
    setError(null);
  };

  return {
    fields: { name, model, personality, avatarUrl, isLoadingImage },
    setters: { setName, setModel, setPersonality, setIsLoadingImage },
    error,
    existing,
    handleLoadPreset,
    handleGenerateAvatar,
    handleSubmit,
    handleClear,
  };
}
