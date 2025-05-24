import { GoogleGenAI } from "@google/genai";
import { geminiApikey, prompt } from "./constant/constant";

// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .catch((error) => console.error("Error setting panel behavior:", error));


 chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });


//@ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getTranscript") {
    handleTranscriptRequest(message.url)
      .then((result) => sendResponse(result))
      .catch((error) => sendResponse({ error: error.message }));

    return true;
  }
});

async function handleTranscriptRequest(url: string) {
  const response = await fetch("http://127.0.0.1:8000/transcript", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  if (!data?.transcript) {
    throw new Error("No transcript data received");
  }

  const summarizedData = await getSummarizedData(data.transcript);
  console.log("background", summarizedData);
  return summarizedData;
}

async function getSummarizedData(transcript: string) {
  const ai = new GoogleGenAI({ apiKey: geminiApikey });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `${prompt}: ${transcript}`,
  });

  const rawText = await response.text;
  return (rawText ?? "").replace(/\s*\n\s*/g, " ").trim();
}
