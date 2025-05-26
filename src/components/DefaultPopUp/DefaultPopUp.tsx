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

interface DefaulPropUpProps {
  setPropmt: (value: string) => void;
  setPlatform: (value: string) => void;
  handleSave: () => void;
}

function DefaultSettingsPopUp({
  setPropmt,
  setPlatform,
  handleSave,
}: DefaulPropUpProps) {
  return (
    <div className="rounded-lg bg-zinc-900 flex justify-center items-center h-screen ">
      <Card className="w-[300px] mx-4 my-4 h-72 bg-zinc-800 text-white border border-zinc-700">
        <CardHeader>
          <CardTitle>Select Your Preference</CardTitle>
          <CardDescription className="text-zinc-400">
            Get youtube transcript in one click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-white">
                  Default Prompt
                </Label>
                <Input
                  id="prompt"
                  placeholder="type your prompt"
                  className="bg-zinc-700 text-white placeholder:text-zinc-400"
                  onChange={(e) => {
                    setPropmt(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="model" className="text-white">
                  Choose Model
                </Label>
                <Select
                  onValueChange={(value) => {
                    setPlatform(value);
                  }}
                >
                  <SelectTrigger id="model" className="bg-zinc-700 text-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-700 text-white">
                    <SelectItem value="chatGpt">chat Gpt</SelectItem>
                    <SelectItem value="Gemini">Gemini</SelectItem>
                    <SelectItem value="Claude">Claude</SelectItem>
                    <SelectItem value="Perplexity">Perplexity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
            onClick={handleSave}
          >
            Save Preference
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DefaultSettingsPopUp;
