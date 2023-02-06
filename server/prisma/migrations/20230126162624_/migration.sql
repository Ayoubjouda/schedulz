/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `VideoUrl` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `captions` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categorie` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructor` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillLevel` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CourseMedia` DROP FOREIGN KEY `CourseMedia_courseId_fkey`;

-- AlterTable
ALTER TABLE `Course` DROP PRIMARY KEY,
    ADD COLUMN `VideoUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `captions` BOOLEAN NOT NULL,
    ADD COLUMN `categorie` VARCHAR(191) NOT NULL,
    ADD COLUMN `instructor` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `skillLevel` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CourseMedia` MODIFY `courseId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CourseMedia` ADD CONSTRAINT `CourseMedia_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
