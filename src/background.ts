import { GoogleGenAI } from "@google/genai";
import { geminiApikey, prompt } from "./constant/constant";




 chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });


//@ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message.type === "getTranscript") {
    handleTranscriptRequest(message.url)
        .then((result) => sendResponse({ result }))
      .catch((error) => sendResponse({ error: error.message }));

    return true;
  }

     if (message.type === "openSidePanel") {
    if (sender.tab?.id !== undefined) {
      chrome.sidePanel
        .open({ tabId: sender.tab.id })
        .catch((error) => console.error("Failed to open side panel:", error));
    }
  }

});

async function handleTranscriptRequest(url: string) {
    console.log("handle transcript")

  const response = await fetch("http://127.0.0.1:8000/transcript", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status} - ${response.statusText}`);
  }
  const data = await response.json();

  console.log(data)
  if (!data.success) {
    let errorMessage = "An unknown error occurred.";

    switch (data.errorType) {
      case "transcript_disabled":
        errorMessage = "Transcripts are disabled for this video.";
        break;
      case "no_transcript":
        errorMessage = "No transcript is available for this video.";
        break;
      case "video_unavailable":
        errorMessage = "The video is unavailable.";
        break;
      case "unknown":
      default:
        errorMessage = data.message || "An unexpected error occurred.";
        break;
    }

    throw new Error(errorMessage);
  }

  if (!data.transcript) {
    throw new Error("Transcript not found in response.");
  }

  const summarizedData = await getSummarizedData(data.transcript);
  return summarizedData;
}

async function getSummarizedData(transcript: string) {
  console.log("Summary function")
  const ai = new GoogleGenAI({ apiKey: geminiApikey });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${prompt}\n\nTranscript:\n${transcript}`,
          },
        ],
      },
    ],
  });

  const rawText = await response.text;
  console.log(rawText)
  return (rawText ?? "").replace(/\s*\n\s*/g, " ").trim();
}