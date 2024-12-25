-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `level` INTEGER NOT NULL,
    `profile_pic` VARCHAR(250) NULL,
    `description` VARCHAR(100) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `points` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Badges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `description` VARCHAR(45) NOT NULL,
    `icon` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBadges` (
    `badges_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `earned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`badges_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(45) NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` ENUM('INFO', 'REMINDER', 'ALERT') NOT NULL DEFAULT 'INFO',
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LearningSteps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `step_title` VARCHAR(45) NOT NULL,
    `step_description` VARCHAR(45) NOT NULL,
    `is_completed` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `learning_plan_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LearningPlans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `description` VARCHAR(45) NOT NULL,
    `is_completed` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('MODERATOR', 'AI') NOT NULL,
    `score` DOUBLE NOT NULL,
    `feedback` VARCHAR(500) NULL,
    `date` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,
    `moderator_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(1000) NOT NULL,
    `sent_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sender_id` INTEGER NOT NULL,
    `channel_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityMembers` (
    `user_id` INTEGER NOT NULL,
    `community_id` INTEGER NOT NULL,
    `role` ENUM('ADMIN', 'MODERATOR', 'PROUSER', 'USER') NOT NULL,
    `joined_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `community_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityChannels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `community_id` INTEGER NOT NULL,
    `creator_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Communities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `description` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `community_banner` VARCHAR(300) NULL,
    `community_logo` VARCHAR(300) NULL,
    `creator_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserBadges` ADD CONSTRAINT `UserBadges_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBadges` ADD CONSTRAINT `UserBadges_badges_id_fkey` FOREIGN KEY (`badges_id`) REFERENCES `Badges`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningSteps` ADD CONSTRAINT `LearningSteps_learning_plan_id_fkey` FOREIGN KEY (`learning_plan_id`) REFERENCES `LearningPlans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningPlans` ADD CONSTRAINT `LearningPlans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interviews` ADD CONSTRAINT `Interviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interviews` ADD CONSTRAINT `Interviews_moderator_id_fkey` FOREIGN KEY (`moderator_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chats` ADD CONSTRAINT `Chats_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chats` ADD CONSTRAINT `Chats_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `CommunityChannels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityMembers` ADD CONSTRAINT `CommunityMembers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityMembers` ADD CONSTRAINT `CommunityMembers_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `Communities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityChannels` ADD CONSTRAINT `CommunityChannels_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `Communities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityChannels` ADD CONSTRAINT `CommunityChannels_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Communities` ADD CONSTRAINT `Communities_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
