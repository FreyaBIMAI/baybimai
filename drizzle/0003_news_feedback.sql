CREATE TABLE `news_feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`language` text NOT NULL,
	`issue_date` text NOT NULL,
	`signal` text NOT NULL,
	`note` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
