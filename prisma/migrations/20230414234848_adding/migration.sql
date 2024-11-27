/*
  Warnings:

  - You are about to drop the column `start_place_photo` on the `Pedais` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pedais" DROP COLUMN "start_place_photo";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" VARCHAR(255);
