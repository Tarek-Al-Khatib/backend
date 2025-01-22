/*
  Warnings:

  - You are about to drop the column `score` on the `interviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `interviews` DROP FOREIGN KEY `Interviews_moderator_id_fkey`;

-- DropIndex
DROP INDEX `Interviews_moderator_id_fkey` ON `interviews`;

-- AlterTable
ALTER TABLE `interviews` DROP COLUMN `score`,
    MODIFY `moderator_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `interviews` ADD CONSTRAINT `Interviews_moderator_id_fkey` FOREIGN KEY (`moderator_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
