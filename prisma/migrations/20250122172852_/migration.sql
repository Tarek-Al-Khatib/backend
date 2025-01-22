-- DropForeignKey
ALTER TABLE `communitychannels` DROP FOREIGN KEY `communitychannels_community_id_fkey`;

-- DropForeignKey
ALTER TABLE `communitychannels` DROP FOREIGN KEY `communitychannels_creator_id_fkey`;

-- DropForeignKey
ALTER TABLE `communitymembers` DROP FOREIGN KEY `communitymembers_community_id_fkey`;

-- DropForeignKey
ALTER TABLE `communitymembers` DROP FOREIGN KEY `communitymembers_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `learningplans` DROP FOREIGN KEY `learningplans_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `learningsteps` DROP FOREIGN KEY `learningsteps_learning_plan_id_fkey`;

-- AddForeignKey
ALTER TABLE `learningsteps` ADD CONSTRAINT `LearningSteps_learning_plan_id_fkey` FOREIGN KEY (`learning_plan_id`) REFERENCES `learningplans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `learningplans` ADD CONSTRAINT `LearningPlans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `communitymembers` ADD CONSTRAINT `CommunityMembers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `communitymembers` ADD CONSTRAINT `CommunityMembers_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `communities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `communitychannels` ADD CONSTRAINT `CommunityChannels_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `communities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `communitychannels` ADD CONSTRAINT `CommunityChannels_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
