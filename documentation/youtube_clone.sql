CREATE TABLE "users" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "full_name" varchar NOT NULL,
  "email" varchar(100) UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "avatar" varchar,
  "birthdate" timestamp NOT NULL,
  "role" varchar DEFAULT 'user',
  "active" boolean DEFAULT true,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "videos" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer,
  "link" varchar NOT NULL,
  "title" varchar NOT NULL,
  "description" varchar,
  "poster" varchar,
  "slug" varchar UNIQUE NOT NULL,
  "hide_element" boolean DEFAULT false,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "comments" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer,
  "video_id" integer,
  "title" varchar,
  "body" text NOT NULL,
  "hide_element" boolean DEFAULT false,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "likes" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer,
  "video_id" integer,
  "status" boolean,
  "hide_element" boolean DEFAULT false,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "history" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer,
  "video_id" integer,
  "hide_element" boolean DEFAULT false,
  "created_at" timestamp DEFAULT 'now()'
);

ALTER TABLE "videos" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("video_id") REFERENCES "videos" ("id");

ALTER TABLE "likes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "likes" ADD FOREIGN KEY ("video_id") REFERENCES "videos" ("id");

ALTER TABLE "history" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "history" ADD FOREIGN KEY ("video_id") REFERENCES "videos" ("id");
