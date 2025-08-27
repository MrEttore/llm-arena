import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

const getChatCompletion = async () => {
    try {
        const completion = await openai.chat.completions.create({});
    } catch (error) {
        console.error("Error fetching chat completion:", error);
    }
};
