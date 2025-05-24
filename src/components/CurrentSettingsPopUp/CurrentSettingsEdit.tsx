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
    <div className="rounded-lg">
      <Card className="w-[300px] mx-4 my-4 border-blue-950 border-2">
        <CardHeader>
          <CardTitle>Your Preferences</CardTitle>
          <CardDescription>Update your default settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="prompt">Default Prompt</Label>
                <Input
                  id="prompt"
                  placeholder="Type your prompt"
                  value={initialPrompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="platform">Default Platform</Label>
                <Select
                  value={initialPlatform}
                  onValueChange={(value) => setPlatform (value)}
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
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
          <Button onClick={onSave}>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PopupSettings;
