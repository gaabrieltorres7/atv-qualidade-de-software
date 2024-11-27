-- CreateTable
CREATE TABLE "Pedais" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "start_date" DATE NOT NULL,
    "start_date_registration" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date_registration" DATE NOT NULL,
    "additional_information" VARCHAR(255),
    "start_place" VARCHAR(255) NOT NULL,
    "participants_limit" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Pedais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Pedais" ADD CONSTRAINT "Pedais_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
