-- CreateTable
CREATE TABLE "Todos" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "completed" BOOLEAN,

    PRIMARY KEY ("id")
);
