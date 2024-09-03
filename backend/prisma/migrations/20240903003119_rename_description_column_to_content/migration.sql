/*
  Warnings:

  - You are about to drop the column `description` on the `incidents` table. All the data in the column will be lost.
  - Added the required column `content` to the `incidents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `incidents` DROP COLUMN `description`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('CITIZEN', 'API', 'BACKOFFICE') NOT NULL DEFAULT 'CITIZEN';
