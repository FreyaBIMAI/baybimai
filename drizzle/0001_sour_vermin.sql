CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stripe_session_id` text NOT NULL,
	`customer_email` text,
	`product_id` text NOT NULL,
	`price_id` text NOT NULL,
	`amount_total` integer NOT NULL,
	`currency` text NOT NULL,
	`payment_status` text NOT NULL,
	`fulfilled_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_stripe_session_id_unique` ON `orders` (`stripe_session_id`);