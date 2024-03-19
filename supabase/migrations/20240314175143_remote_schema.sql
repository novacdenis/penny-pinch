create schema if not exists "next_auth";

create table "next_auth"."accounts" (
    "id" uuid not null default uuid_generate_v4(),
    "type" text not null,
    "provider" text not null,
    "providerAccountId" text not null,
    "refresh_token" text,
    "access_token" text,
    "expires_at" bigint,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text,
    "oauth_token_secret" text,
    "oauth_token" text,
    "userId" uuid
);


create table "next_auth"."sessions" (
    "id" uuid not null default uuid_generate_v4(),
    "expires" timestamp with time zone not null,
    "sessionToken" text not null,
    "userId" uuid
);


create table "next_auth"."users" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text,
    "email" text,
    "emailVerified" timestamp with time zone,
    "image" text
);


create table "next_auth"."verification_tokens" (
    "identifier" text,
    "token" text not null,
    "expires" timestamp with time zone not null
);


CREATE UNIQUE INDEX accounts_pkey ON next_auth.accounts USING btree (id);

CREATE UNIQUE INDEX email_unique ON next_auth.users USING btree (email);

CREATE UNIQUE INDEX provider_unique ON next_auth.accounts USING btree (provider, "providerAccountId");

CREATE UNIQUE INDEX sessions_pkey ON next_auth.sessions USING btree (id);

CREATE UNIQUE INDEX sessiontoken_unique ON next_auth.sessions USING btree ("sessionToken");

CREATE UNIQUE INDEX token_identifier_unique ON next_auth.verification_tokens USING btree (token, identifier);

CREATE UNIQUE INDEX users_pkey ON next_auth.users USING btree (id);

CREATE UNIQUE INDEX verification_tokens_pkey ON next_auth.verification_tokens USING btree (token);

alter table "next_auth"."accounts" add constraint "accounts_pkey" PRIMARY KEY using index "accounts_pkey";

alter table "next_auth"."sessions" add constraint "sessions_pkey" PRIMARY KEY using index "sessions_pkey";

alter table "next_auth"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "next_auth"."verification_tokens" add constraint "verification_tokens_pkey" PRIMARY KEY using index "verification_tokens_pkey";

alter table "next_auth"."accounts" add constraint "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE not valid;

alter table "next_auth"."accounts" validate constraint "accounts_userId_fkey";

alter table "next_auth"."accounts" add constraint "provider_unique" UNIQUE using index "provider_unique";

alter table "next_auth"."sessions" add constraint "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE not valid;

alter table "next_auth"."sessions" validate constraint "sessions_userId_fkey";

alter table "next_auth"."sessions" add constraint "sessiontoken_unique" UNIQUE using index "sessiontoken_unique";

alter table "next_auth"."users" add constraint "email_unique" UNIQUE using index "email_unique";

alter table "next_auth"."verification_tokens" add constraint "token_identifier_unique" UNIQUE using index "token_identifier_unique";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION next_auth.uid()
 RETURNS uuid
 LANGUAGE sql
 STABLE
AS $function$
  select
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$function$
;

grant delete on table "next_auth"."accounts" to "service_role";

grant insert on table "next_auth"."accounts" to "service_role";

grant references on table "next_auth"."accounts" to "service_role";

grant select on table "next_auth"."accounts" to "service_role";

grant trigger on table "next_auth"."accounts" to "service_role";

grant truncate on table "next_auth"."accounts" to "service_role";

grant update on table "next_auth"."accounts" to "service_role";

grant delete on table "next_auth"."sessions" to "service_role";

grant insert on table "next_auth"."sessions" to "service_role";

grant references on table "next_auth"."sessions" to "service_role";

grant select on table "next_auth"."sessions" to "service_role";

grant trigger on table "next_auth"."sessions" to "service_role";

grant truncate on table "next_auth"."sessions" to "service_role";

grant update on table "next_auth"."sessions" to "service_role";

grant delete on table "next_auth"."users" to "service_role";

grant insert on table "next_auth"."users" to "service_role";

grant references on table "next_auth"."users" to "service_role";

grant select on table "next_auth"."users" to "service_role";

grant trigger on table "next_auth"."users" to "service_role";

grant truncate on table "next_auth"."users" to "service_role";

grant update on table "next_auth"."users" to "service_role";

grant delete on table "next_auth"."verification_tokens" to "service_role";

grant insert on table "next_auth"."verification_tokens" to "service_role";

grant references on table "next_auth"."verification_tokens" to "service_role";

grant select on table "next_auth"."verification_tokens" to "service_role";

grant trigger on table "next_auth"."verification_tokens" to "service_role";

grant truncate on table "next_auth"."verification_tokens" to "service_role";

grant update on table "next_auth"."verification_tokens" to "service_role";


create schema if not exists "penny-pinch";


create table "public"."categories" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "type" text not null,
    "updated_at" timestamp with time zone not null,
    "name" character varying not null
);


create table "public"."reports" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "file_name" text,
    "user_id" uuid default auth.uid()
);


create table "public"."transaction-reports" (
    "id" uuid not null default gen_random_uuid(),
    "transaction_id" bigint generated by default as identity not null,
    "report_id" uuid not null default gen_random_uuid()
);


create table "public"."transactions" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid default auth.uid(),
    "date" timestamp without time zone,
    "sum" numeric,
    "sumInLei" numeric,
    "transactionCurrency" text,
    "description" text,
    "transactionType" text,
    "category_id" bigint
);


CREATE UNIQUE INDEX "Reports_pkey" ON public.reports USING btree (id);

CREATE UNIQUE INDEX "Reports_user_id_key" ON public.reports USING btree (user_id);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX main_pkey ON public.transactions USING btree (id);

CREATE UNIQUE INDEX "transaction-reports_pkey" ON public."transaction-reports" USING btree (id);

CREATE INDEX "transactions_sumInLei_category_id_date_idx" ON public.transactions USING btree ("sumInLei", category_id, date);

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."reports" add constraint "Reports_pkey" PRIMARY KEY using index "Reports_pkey";

alter table "public"."transaction-reports" add constraint "transaction-reports_pkey" PRIMARY KEY using index "transaction-reports_pkey";

alter table "public"."transactions" add constraint "main_pkey" PRIMARY KEY using index "main_pkey";

alter table "public"."reports" add constraint "Reports_user_id_key" UNIQUE using index "Reports_user_id_key";

alter table "public"."reports" add constraint "public_Reports_user_id_fkey" FOREIGN KEY (user_id) REFERENCES next_auth.users(id) not valid;

alter table "public"."reports" validate constraint "public_Reports_user_id_fkey";

alter table "public"."transaction-reports" add constraint "public_transaction-reports_report_id_fkey" FOREIGN KEY (report_id) REFERENCES reports(id) not valid;

alter table "public"."transaction-reports" validate constraint "public_transaction-reports_report_id_fkey";

alter table "public"."transaction-reports" add constraint "public_transaction-reports_transaction_id_fkey" FOREIGN KEY (transaction_id) REFERENCES transactions(id) not valid;

alter table "public"."transaction-reports" validate constraint "public_transaction-reports_transaction_id_fkey";

alter table "public"."transactions" add constraint "public_transactions_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) not valid;

alter table "public"."transactions" validate constraint "public_transactions_category_id_fkey";

alter table "public"."transactions" add constraint "public_transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES next_auth.users(id) not valid;

alter table "public"."transactions" validate constraint "public_transactions_user_id_fkey";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."reports" to "anon";

grant insert on table "public"."reports" to "anon";

grant references on table "public"."reports" to "anon";

grant select on table "public"."reports" to "anon";

grant trigger on table "public"."reports" to "anon";

grant truncate on table "public"."reports" to "anon";

grant update on table "public"."reports" to "anon";

grant delete on table "public"."reports" to "authenticated";

grant insert on table "public"."reports" to "authenticated";

grant references on table "public"."reports" to "authenticated";

grant select on table "public"."reports" to "authenticated";

grant trigger on table "public"."reports" to "authenticated";

grant truncate on table "public"."reports" to "authenticated";

grant update on table "public"."reports" to "authenticated";

grant delete on table "public"."reports" to "service_role";

grant insert on table "public"."reports" to "service_role";

grant references on table "public"."reports" to "service_role";

grant select on table "public"."reports" to "service_role";

grant trigger on table "public"."reports" to "service_role";

grant truncate on table "public"."reports" to "service_role";

grant update on table "public"."reports" to "service_role";

grant delete on table "public"."transaction-reports" to "anon";

grant insert on table "public"."transaction-reports" to "anon";

grant references on table "public"."transaction-reports" to "anon";

grant select on table "public"."transaction-reports" to "anon";

grant trigger on table "public"."transaction-reports" to "anon";

grant truncate on table "public"."transaction-reports" to "anon";

grant update on table "public"."transaction-reports" to "anon";

grant delete on table "public"."transaction-reports" to "authenticated";

grant insert on table "public"."transaction-reports" to "authenticated";

grant references on table "public"."transaction-reports" to "authenticated";

grant select on table "public"."transaction-reports" to "authenticated";

grant trigger on table "public"."transaction-reports" to "authenticated";

grant truncate on table "public"."transaction-reports" to "authenticated";

grant update on table "public"."transaction-reports" to "authenticated";

grant delete on table "public"."transaction-reports" to "service_role";

grant insert on table "public"."transaction-reports" to "service_role";

grant references on table "public"."transaction-reports" to "service_role";

grant select on table "public"."transaction-reports" to "service_role";

grant trigger on table "public"."transaction-reports" to "service_role";

grant truncate on table "public"."transaction-reports" to "service_role";

grant update on table "public"."transaction-reports" to "service_role";

grant delete on table "public"."transactions" to "anon";

grant insert on table "public"."transactions" to "anon";

grant references on table "public"."transactions" to "anon";

grant select on table "public"."transactions" to "anon";

grant trigger on table "public"."transactions" to "anon";

grant truncate on table "public"."transactions" to "anon";

grant update on table "public"."transactions" to "anon";

grant delete on table "public"."transactions" to "authenticated";

grant insert on table "public"."transactions" to "authenticated";

grant references on table "public"."transactions" to "authenticated";

grant select on table "public"."transactions" to "authenticated";

grant trigger on table "public"."transactions" to "authenticated";

grant truncate on table "public"."transactions" to "authenticated";

grant update on table "public"."transactions" to "authenticated";

grant delete on table "public"."transactions" to "service_role";

grant insert on table "public"."transactions" to "service_role";

grant references on table "public"."transactions" to "service_role";

grant select on table "public"."transactions" to "service_role";

grant trigger on table "public"."transactions" to "service_role";

grant truncate on table "public"."transactions" to "service_role";

grant update on table "public"."transactions" to "service_role";

create policy "Enable read access for all users"
on "public"."transactions"
as permissive
for all
to public;



