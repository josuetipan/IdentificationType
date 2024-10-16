/*
  Warnings:

  - You are about to drop the `document_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "document_type";

-- CreateTable
CREATE TABLE "identificationTypes" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "identificationTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_name_email_idx" ON "users"("name", "email");
