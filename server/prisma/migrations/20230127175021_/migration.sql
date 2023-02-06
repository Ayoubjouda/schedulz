/*
  Warnings:

  - You are about to drop the column `VideoUrl` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `VideoUrl`,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL;
