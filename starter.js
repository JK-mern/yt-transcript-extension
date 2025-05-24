import { YoutubeTranscript } from "youtube-transcript";
import {GoogleGenAI} from '@google/genai';

const transcript = await YoutubeTranscript.fetchTranscript(
  "https://www.youtube.com/watch?v=SDJanxZSssI",
);
const videoAsText = transcript.map((ts) => ts.text)
  .join(" ")

let geminiApikey = 'AIzaSyBN272IHERU-1nLpjLMM_kv3A4Hk_DP-sI'
const instructions = `Your task is to read the following text and generate a concise and informative summary. Focus on capturing the main ideas and essential details while preserving the original meaning. Keep the summary clear, coherent, and free of unnecessary repetition or filler.`


const ai = new GoogleGenAI({apiKey: geminiApikey});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: ` ${instructions} : ${videoAsText}`,
  });
  console.log(response.text);
}


main(videoAsText)
