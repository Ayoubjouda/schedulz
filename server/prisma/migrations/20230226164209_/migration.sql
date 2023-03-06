-- DropForeignKey
ALTER TABLE `UserCourses` DROP FOREIGN KEY `UserCourses_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `UserCourses` DROP FOREIGN KEY `UserCourses_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserCourses` ADD CONSTRAINT `UserCourses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourses` ADD CONSTRAINT `UserCourses_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
