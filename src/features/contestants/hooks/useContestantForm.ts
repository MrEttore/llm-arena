import type { FormEvent } from "react";
import { useState } from "react";

import { useAppDispatch } from "@/app/hooks";
import { PRESETS } from "@/data/presets";
import { addContestant, clearContestant, updateContestant } from "@/features/contestants/slice";
import type { Contestant } from "@/types";

export function useContestantForm(contestantNumber: number) {
  const [name, setName] = useState<string>("");
  const [model, setModel] = useState<string>("gpt-4.1-mini");
  const [personality, setPersonality] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [contestantId, setContestantId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

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

    if (!contestantId) {
      const contestant: Contestant = {
        id: crypto.randomUUID(),
        name,
        model,
        systemPrompt: personality,
        messages: [],
      };
      dispatch(addContestant(contestant));
      setContestantId(contestant.id);
      setError(null);
    } else {
      dispatch(
        updateContestant({
          id: contestantId,
          name,
          model,
          systemPrompt: personality,
        }),
      );
    }
  };

  const handleClear = () => {
    if (contestantId) dispatch(clearContestant(contestantId));
    setName("");
    setModel("");
    setPersonality("");
    setError(null);
    setContestantId(null);
  };

  return {
    fields: { name, model, personality },
    contestantId,
    error,
    handleNameChange,
    handleModelChange,
    handlePersonalityChange,
    handleLoadPreset,
    handleSubmit,
    handleClear,
  };
}
