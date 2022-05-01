alter table "public"."users" alter column "uid" drop not null;
alter table "public"."users" add column "uid" text;
