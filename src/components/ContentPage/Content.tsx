import { useEffect, useState } from "react";

function ContentPage() {
  const [_summary, setSummary] = useState<string | null>(null);
  const [_error, setError] = useState<string | null>(null);
  const [_loading, setLoading] = useState<boolean>(true);

  function insertShowTranscriptButton() {
    const interval = setInterval(() => {
      const subscribeButton = document.querySelector("#subscribe-button");

      if (subscribeButton && !document.getElementById("show-transcript-btn")) {
        const button = document.createElement("button");
        button.id = "show-transcript-btn";
        button.textContent = "Show Transcript";
        button.style.marginLeft = "10px";
        button.style.padding = "6px 12px";
        button.style.backgroundColor = "#cc0000";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.style.fontWeight = "bold";

        button.onclick = () => {
          chrome.runtime.sendMessage({ type: "openSidePanel" });
        };

        subscribeButton.parentElement?.appendChild(button);
        clearInterval(interval);
      }
    }, 1000);
  }

  async function handleVideoChange() {
    const currentUrl = window.location.href;

    if (!currentUrl.includes("/watch?v=")) return;

    insertShowTranscriptButton();

    try {
      const data = await chrome.runtime.sendMessage({
        type: "getTranscript",
        url: currentUrl,
      });

      if (data && typeof data === "string") {
        setSummary(data);
      } else {
        throw new Error(data?.error || "Unknown error");
      }
    } catch (err: any) {
      console.error("Failed to get summary:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let lastUrl = window.location.href;

    handleVideoChange();

    const observer = new MutationObserver(() => {
      const currentUrl = window.location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        setSummary(null);
        setError(null);
        setLoading(true);
        handleVideoChange();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return <></>;
}

export default ContentPage;
