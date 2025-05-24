import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './components/ui/select'
import { Button } from "./components/ui/button"
import { useState } from "react"


function App() {
const [prompt, setPrompt] = useState<string>('')
const [platform, setPlatform] = useState<string>('')


const handleSave = async() =>{
    await chrome.storage.local.set({'prompt' : prompt})
    await chrome.storage.local.set({'platform' : platform})
    console.log("saved default prompt and platform", prompt,platform)
}
  return (
    <div className="rounded-lg">
        <Card className="w-[350px] mx-4 my-4 ">
      <CardHeader>
        <CardTitle>Select Your Preferance</CardTitle>
        <CardDescription>Get youtube transcript in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Default Prompt</Label>
              <Input id="prompt" placeholder="type your prompt"  onChange={(e) => {setPrompt(e.target.value)}} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="model">Choose Model</Label>
              <Select onValueChange={(value) => { setPlatform(value) }}>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
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
        <Button onClick={handleSave}>Save Preferance</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default App
