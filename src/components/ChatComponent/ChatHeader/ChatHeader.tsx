import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ChatHeaderProps {
  setEdit: (value: boolean) => void;
}
function ChatHeader({ setEdit }: ChatHeaderProps) {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-2">🎬 YouTube Transcript</h1>
        <Button onClick={() => setEdit(true)}>Edit</Button>
      </div>
      <p className="text-sm opacity-80 mb-4">
        Your AI-powered summary will appear here.
      </p>
      <Separator className="border-2"/>
    </div>
  );
}

export default ChatHeader;
