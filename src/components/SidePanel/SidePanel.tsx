import { useEffect, useState } from "react";
import DefaultSettingsPopUp from "../DefaultPopUp/DefaultPopUp";
import { Button } from "../ui/button";
import PopupSettings from "../CurrentSettingsPopUp/CurrentSettingsEdit";

function SidePanel() {
  const [prompt, setPrompt] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [showDefaultPopUp, setDefaultPopUP] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false)

  useEffect(() => {
    async function getDefault() {
      const { prompt: storedPrompt } = await chrome.storage.local.get([
        "prompt",
      ]);
      const { platform: storedPlatform } = await chrome.storage.local.get([
        "platform",
      ]);

      if (storedPrompt && storedPlatform) {
        setPrompt(storedPrompt);
        setPlatform(storedPlatform);
        setDefaultPopUP(false);
      } else {
        setDefaultPopUP(true);
      }
    }

    getDefault();
    console.log("Side panel activated");
  }, []);

  const handleSave = async () => {
    await chrome.storage.local.set({ prompt });
    await chrome.storage.local.set({ platform });
    console.log()
    setDefaultPopUP(false);
    setShowEdit(false)
  };

  return (
    <div>
      {showDefaultPopUp ? (
        <DefaultSettingsPopUp
          handleSave={handleSave}
          setPlatform={setPlatform}
          setPropmt={setPrompt}
        />
      ) :  showEdit ? (<div> <PopupSettings initialPlatform={platform} initialPrompt={prompt}  setPlatform={setPlatform} setPrompt={setPrompt} onSave={handleSave} /></div>)  : (
        <div className="bg-zinc-900 text-white h-screen w-screen p-4">
          <div className="flex justify-between">
           <h1 className="text-2xl font-semibold mb-2">🎬 YouTube Transcript</h1>
           <Button onClick={ () => setShowEdit(true)}>Edit</Button>
          </div>
         
          <p className="text-sm opacity-80 mb-4">
            Your AI-powered summary will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default SidePanel;
