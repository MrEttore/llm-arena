export function buildGenerateAvatarPrompt(agentName: string, agentPersonality: string): string {
  const hasEnoughPersonality = agentPersonality.length >= 24;

  const personalityGuidance = hasEnoughPersonality
    ? `Personality notes: ${agentPersonality}`
    : `Personality notes: ${agentPersonality}. If the personality is very short, creatively infer a distinctive vibe and visual character traits from the name "${agentName}". Pick 2-4 coherent personality traits (e.g., calm, witty, intense, optimistic, analytical) and express them visually through subtle choices (expression, styling, color accents) without adding text.`;

  const subject = `One fictional person only, centered, shoulders-up / head-and-shoulders framing. ${personalityGuidance}`;
  const style =
    "Clean, modern, creative portrait. Semi-realistic digital illustration (not a photograph), crisp details, professional finish. Studio-quality soft lighting, gentle shadowing, high contrast but not harsh. Background: simple, uncluttered, subtle gradient or soft bokeh. Keep focus on the face.";
  const compositionAndQuality =
    "Sharp focus on face, no motion blur, no grainy artifacts, no distortions. Keep the head fully in frame, do not crop off the chin or top of head";
  const constraints =
    "Do not include any text, captions, logos, watermarks, signatures, or UI elements. No additional people, no full-body shot. Do not resemble or imitate any real person or celebrity. Make the face clearly original.";

  let prompt = `Create a high-quality 1:1 square profile avatar (headshot) for a fictional AI agent character named "${agentName}". The image should look suitable for a modern chat app / social profile (Instagram/LinkedIn-style headshot).\n\n`;
  prompt += `SUBJECT:\n${subject}\n\n`;
  prompt += `STYLE:\n${style}\n\n`;
  prompt += `COMPOSITION & QUALITY:\n${compositionAndQuality}\n\n`;
  prompt += `CONSTRAINTS (IMPORTANT):\n${constraints}`;

  return prompt;
}
