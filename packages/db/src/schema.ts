import { jsonb, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const status = pgEnum("status", ["pending", "joining", "in_waiting_room", "active", "completed", "failed"])

export const meeting = pgTable('meeting', {
    id: uuid('id').defaultRandom().primaryKey(),
    status: status("status").notNull(),
    meetingUrl: text('meeting_url').notNull(),
    recallBotId: text('recall_bot_id').notNull(),
    metadata: jsonb('metadata').notNull(),
    createdAt: text('created_at').notNull(),
    startedAt: text('started_at').notNull(),
    endedAt: text('ended_at').notNull(),
})