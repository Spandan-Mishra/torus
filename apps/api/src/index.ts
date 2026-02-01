import express from "express";
import cors from "cors";
import { db, eq } from "@workspace/db";
import { meeting } from "../../../packages/db/src/schema";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/join", async (req, res) => {
    const { url } = req.body;

    const validUrl = /^https?:\/\/(meet\.google\.com|google\.com\/meet)\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
    const match = url.match(validUrl);
    if (!match) {
        return res.status(400).json({ error: "Invalid meeting URL" });
    }

    const meetingId = match[1];

    // TODO: Check if meeting exists with bot ACTIVE

    const newMeeting = await db
        .insert(meeting)
        .values({
            status: "pending",
            meetingUrl: url,
            recallBotId: "bot-123",
            metadata: {},
            createdAt: new Date().toISOString(),
            startedAt: "",
            endedAt: "",
        })
        .returning();
    
    // TODO: Recall bot join logic & update meeting status to JOINING

    res.json({ meeting: newMeeting[0] });
})

app.listen(3001, () => {
    console.log("Torus backend running on port 3001");
})
