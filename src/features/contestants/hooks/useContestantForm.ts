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
import type { Contestant } from "@/types";

export function useContestantForm(contestantNumber: number) {
  const [name, setName] = useState<string>("");
  const [model, setModel] = useState<string>("gpt-4.1-mini");
  const [personality, setPersonality] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const contestants = useAppSelector(getContestants);

  const existing = contestants[contestantNumber];

  useEffect(() => {
    setName(existing?.name ?? "");
    setModel(existing?.model ?? "gpt-4.1-mini");
    setPersonality(existing?.systemPrompt ?? "");
  }, [existing]);

  const handleNameChange = (value: string) => setName(value);
  const handleModelChange = (value: string) => setModel(value);
  const handlePersonalityChange = (value: string) => setPersonality(value);

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
        }),
      );
    } else {
      const newContestant: Contestant = {
        id: crypto.randomUUID(),
        name,
        model,
        systemPrompt: personality,
        messages: [],
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
    setError(null);
  };

  return {
    fields: { name, model, personality },
    error,
    existing,
    handleNameChange,
    handleModelChange,
    handlePersonalityChange,
    handleLoadPreset,
    handleSubmit,
    handleClear,
  };
}
