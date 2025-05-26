import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import ChatHeader from "./ChatHeader/ChatHeader";
import Loader from "../Loader/Loader";
import ThreeDotLoader from "../Loader/ThreeDotLoader";

interface chatComponentProps {
  setEdit: (value: boolean) => void;
}

function ChatComponent({ setEdit }: chatComponentProps) {
  const [defaultPrompt, setDefaultPrompt] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    async function getDefaultPrompt() {
      const data = await chrome.storage.local.get(["prompt"]);
      setDefaultPrompt(data.prompt);
    }
    getDefaultPrompt();
  }, []);

async function handleGetSummary() {
  setLoading(true);
  setErrorMessage(null);

  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentUrl = tabs[0]?.url || "";

    if (!currentUrl.includes("/watch?v=")) {
      setErrorMessage("Not a valid YouTube video URL.");
      setLoading(false);
      return;
    }

    const response = await new Promise<{ error?: string; result?: string }>((resolve) => {
      chrome.runtime.sendMessage(
        { type: "getTranscript", url: currentUrl },
        (response) => {
          resolve(response || { error: "No response from background worker" });
        }
      );
    });

    if (response.error) {
      setErrorMessage(response.error);
      setSummary("");
    } else if (response.result) {
      setSummary(response.result);
    } else {
      setErrorMessage("Unexpected response from background worker.");
      setSummary("");
    }
  } catch (err: any) {
    setErrorMessage("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
}

 return (
  <div className="h-full flex flex-col">
    <ChatHeader setEdit={setEdit} />

    {loading ? (
      <Loader />
    ) : (
      <div className="flex-1 overflow-auto p-4">
        <div className="text-slate-100 text-sm flex flex-col gap-2">
          {errorMessage ? (
            <div className="text-red-400">
              {errorMessage}
              <div className="mt-2">
                <Button
                  onClick={handleGetSummary}
                  className="text-white bg-red-600 hover:bg-red-500"
                >
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="whitespace-pre-wrap">{summary}</div>
              {summary && (
                <div className="flex justify-end">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors duration-200"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )}

    <div className="flex flex-col gap-y-4 justify-end mb-4">
      <Separator className="border-2" />
      <div className="flex gap-x-2 items-center">
        <Input
          className="flex-1 rounded-md p-2 border-blue-500 text-sm"
          placeholder="Enter your prompt here"
          value={defaultPrompt}
        />
        <Button
          disabled={loading}
          onClick={handleGetSummary}
          className="bg-green-600 text-white hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <ThreeDotLoader /> : "Send"}
        </Button>
      </div>
    </div>
  </div>
);
}

export default ChatComponent;
