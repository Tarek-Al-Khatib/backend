-- AlterTable
ALTER TABLE `learningplans` MODIFY `title` VARCHAR(200) NOT NULL,
    MODIFY `description` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `learningsteps` MODIFY `step_title` VARCHAR(200) NOT NULL,
    MODIFY `step_description` VARCHAR(500) NOT NULL;
