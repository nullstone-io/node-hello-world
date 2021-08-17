-- CreateTable
CREATE TABLE "Todos" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "completed" BOOLEAN,

    PRIMARY KEY ("id")
);

INSERT INTO "Todos"(name, completed) VALUES ('Login to Nullstone', false);
INSERT INTO "Todos"(name, completed) VALUES ('Launch apps in minutes to my cloud', false);
INSERT INTO "Todos"(name, completed) VALUES ('Duplicate to staging and prod', false);
INSERT INTO "Todos"(name, completed) VALUES ('Extend and customize any way I like', false);
INSERT INTO "Todos"(name, completed) VALUES ('Stay focused on my mission and product!', false);
