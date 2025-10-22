/*
  Warnings:

  - Made the column `conteudo` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "data_atualizacao" TIMESTAMP(3),
ALTER COLUMN "conteudo" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."PostArquivo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tamanho" INTEGER,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "PostArquivo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PostArquivo" ADD CONSTRAINT "PostArquivo_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
