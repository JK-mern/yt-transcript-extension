import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface PopupSettingsProps {
  initialPrompt: string;
  initialPlatform: string;
  onSave: () => void;
  setPrompt : (value : string) => void
  setPlatform : (value : string) => void
}

function PopupSettings({
  initialPrompt,
  initialPlatform,
  setPrompt,
  setPlatform,
  onSave,
}: PopupSettingsProps) {


 

  return (
    <div  className="rounded-lg bg-zinc-900 flex justify-center items-center h-screen ">
      <Card className="w-[300px] mx-4 my-4 h-72 bg-zinc-800 text-white border border-zinc-700">
  <CardHeader>
    <CardTitle>Your Preferences</CardTitle>
    <CardDescription className="text-zinc-400">Update your default settings.</CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="prompt" className="text-white">Default Prompt</Label>
          <Input
            id="prompt"
            placeholder="Type your prompt"
            className="bg-zinc-700 text-white placeholder:text-zinc-400"
            value={initialPrompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="platform" className="text-white">Default Platform</Label>
          <Select
            value={initialPlatform}
            onValueChange={(value) => setPlatform(value)}
          >
            <SelectTrigger
              id="platform"
              className="bg-zinc-700 text-white placeholder:text-zinc-400"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white">
              <SelectItem value="chatGpt">chatGpt</SelectItem>
              <SelectItem value="Gemini">Gemini</SelectItem>
              <SelectItem value="Perplexity">Perplexity</SelectItem>
              <SelectItem value="Claude">Claude</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-end">
    <Button
      className="bg-yellow-500 hover:bg-yellow-600 text-black"
      onClick={onSave}
    >
      Update Preferences
    </Button>
  </CardFooter>
</Card>

    </div>
  );
}

export default PopupSettings;
