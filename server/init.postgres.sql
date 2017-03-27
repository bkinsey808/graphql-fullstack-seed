CREATE TABLE public.app_user
(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL,
  username text NOT NULL,
  password text NOT NULL,
  CONSTRAINT app_user_pkey PRIMARY KEY (id),
  CONSTRAINT app_user_email_key UNIQUE (email),
  CONSTRAINT app_user_username_key UNIQUE (username)
)
WITH (
  OIDS=FALSE
);