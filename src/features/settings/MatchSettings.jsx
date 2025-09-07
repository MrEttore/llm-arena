import { useMutation } from "@tanstack/react-query";
import { getChatCompletion } from "../../services/openAI";
import { useState } from "react";
import {
  createContestant,
  createMatch,
  createMessage,
} from "../../domain/models";
import ContestantSettings from "./ContestantSettings";
import MatchStarter from "./MatchStarter";

export default function MatchSettings() {
  const [conversationStarter, setConversationStarter] = useState("");

  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn: getChatCompletion,
    onSuccess: (data) => {
      console.log("AI Response:", data);

      // TODO: dispatch action to add response to messages list

      // mutate({ userPrompt: data });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!conversationStarter) return;
    // mutate({ userPrompt: conversationStarter });

    const contA = createContestant(
      "Contestant A",
      "gpt-4o-mini",
      "You are a helpful assistant.",
    );
    const contB = createContestant(
      "Contestant B",
      "gpt-4o-mini",
      "You are a helpful assistant.",
    );
    const mess = createMessage(contA.id, "user", "A nice message", 1);
    const match = createMatch([contA, contB], "Hello", 4);

    console.log("contA: ", contA);
    console.log("contB: ", contB);
    console.log(mess);
    console.log(match);
  };

  return (
    <div className="space-y-2 px-4 py-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <ContestantSettings contestantId={i + 1} key={i} />
      ))}
      <MatchStarter />
    </div>
  );
}
