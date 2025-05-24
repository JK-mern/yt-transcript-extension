import { useEffect, useState } from "react";
import DefaultSettingsPopUp from "./components/DefaultPopUp/DefaultPopUp";
import CurrentSettings from "./components/CurrentSettingsPopUp/CurrentSettings";

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [showDefaultPopUp, setDefaultPopUP] = useState<boolean>(false);

  useEffect(() => {
    async function getDefault() {
      const { prompt: storedPrompt } = await chrome.storage.local.get([
        "prompt",
      ]);
      const { platform: storedPlatform } = await chrome.storage.local.get([
        "platform",
      ]);
      if (storedPrompt && storedPlatform) {
        setPlatform(storedPlatform);
        setPrompt(storedPrompt);
      } else {
        setDefaultPopUP(true);
      }
    }
    getDefault();
  }, []);

  const handleSave = async () => {
    await chrome.storage.local.set({ prompt: prompt });
    await chrome.storage.local.set({ platform: platform });
    setDefaultPopUP(false)
  };
  return (
    <div>
      {showDefaultPopUp ? (
        <DefaultSettingsPopUp
          handleSave={handleSave}
          setPlatform={setPlatform}
          setPropmt={setPrompt}
        />
      ) : (
        <CurrentSettings prompt={prompt} platform={platform} />
      )}
    </div>
  );
}

export default App;
