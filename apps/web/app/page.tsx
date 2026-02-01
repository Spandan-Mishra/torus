"use client";

import { joinMeet } from "@/lib/api";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input"
import { useState } from "react"

export default function Page() {
  const [url, setUrl] = useState("");

  const handleJoin = async (url: string) => {
    if (!url) return;

    try {
      const response = await joinMeet(url);
      console.log("Joined meeting:", response.data);
    } catch (error) {
      console.error("Error joining meeting:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Torus</h1>
        <Input placeholder="Enter meeting url" value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button onClick={() => handleJoin(url)}>Join</Button>
      </div>
    </div>
  )
}
