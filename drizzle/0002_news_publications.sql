CREATE TABLE `news_publications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`language` text NOT NULL,
	`issue_date` text NOT NULL,
	`headline` text NOT NULL,
	`summary` text NOT NULL,
	`signals` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `news_publications_language_issue_date_unique` ON `news_publications` (`language`,`issue_date`);
