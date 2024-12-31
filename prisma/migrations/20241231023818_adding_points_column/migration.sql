-- AlterTable
ALTER TABLE `interviews` ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `learningplans` ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `learningsteps` ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0;
