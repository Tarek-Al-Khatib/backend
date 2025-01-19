-- AlterTable
ALTER TABLE `badges` MODIFY `description` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `learningplans` MODIFY `description` VARCHAR(300) NOT NULL;

-- AlterTable
ALTER TABLE `learningsteps` MODIFY `step_description` VARCHAR(300) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `description` VARCHAR(300) NULL;
