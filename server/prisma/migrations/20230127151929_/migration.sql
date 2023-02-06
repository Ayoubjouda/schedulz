-- AlterTable
ALTER TABLE `Course` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `VideoUrl` VARCHAR(191) NULL,
    MODIFY `captions` BOOLEAN NULL,
    MODIFY `categorie` VARCHAR(191) NULL,
    MODIFY `instructor` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NULL,
    MODIFY `skillLevel` VARCHAR(191) NULL;
