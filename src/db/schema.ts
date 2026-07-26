import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  repoUrl: text("repo_url").notNull(),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
