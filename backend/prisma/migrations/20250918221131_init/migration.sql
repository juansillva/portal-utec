/*
  Warnings:

  - You are about to drop the column `avatar` on the `Post` table. All the data in the column will be lost.
  - Made the column `turma_id` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_turma_id_fkey";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "avatar",
ALTER COLUMN "turma_id" SET NOT NULL;

-- AlterTable
CREATE SEQUENCE "public".turma_id_seq;
ALTER TABLE "public"."Turma" ALTER COLUMN "id" SET DEFAULT nextval('"public".turma_id_seq');
ALTER SEQUENCE "public".turma_id_seq OWNED BY "public"."Turma"."id";

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "public"."Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
