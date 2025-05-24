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

interface CurrentSettingsProps {
  prompt: string;
  platform: string;
}

function CurrentSettings({ prompt, platform }: CurrentSettingsProps) {
  return (
    <div className="rounded-lg">
      <Card className="w-[350px] mx-4 my-4  border-blue-950  border-2">
        <CardHeader>
          <CardTitle>Your Selected Preferance</CardTitle>
          <CardDescription>
            Get youtube transcript in one click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Default Prompt</Label>
                <Input
                  id="prompt"
                  placeholder="type your prompt"
                  value={prompt}
                  disabled={true}
                />
              </div>
              {platform && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="model">Default Model</Label>
                  <Select value={platform} disabled>
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={platform}>{platform}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          {/* <Button onClick={handleSave}>Save Preferance</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default CurrentSettings;
