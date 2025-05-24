import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import SidePanel from "../SidePanel/SidePanel";

function ContentPage() {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [close , setClose] = useState<boolean>(false)

  useEffect(() => {
    async function getVideoUrl() {
      const currentUrl = window.location.href;

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

    getVideoUrl();
  }, []);

  return (
    <>
      {!close ? (
        <div className="fixed top-0 right-0 z-[9999] h-screen w-[380px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-lg p-4">
          <Card className="h-full flex flex-col rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">YouTube Summary</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden">
              {loading && (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {summary && (
                <ScrollArea className="h-full pr-2">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {summary}
                  </p>
                </ScrollArea>
              )}
            </CardContent>
            <Button onClick={() => setClose(true)}>close</Button>
          </Card>
        </div>
      ) : (
        <div> <SidePanel /></div>
      )}
    </>
  );
}

export default ContentPage;
