-- CreateTable
CREATE TABLE "public"."Turma" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Professor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "professor_id" INTEGER NOT NULL,
    "turma_id" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProfessorTurma" (
    "professor_id" INTEGER NOT NULL,
    "turma_id" INTEGER NOT NULL,

    CONSTRAINT "ProfessorTurma_pkey" PRIMARY KEY ("professor_id","turma_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Turma_nome_key" ON "public"."Turma"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "public"."Professor"("email");

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "public"."Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "public"."Turma"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfessorTurma" ADD CONSTRAINT "ProfessorTurma_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "public"."Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfessorTurma" ADD CONSTRAINT "ProfessorTurma_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "public"."Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
