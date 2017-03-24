INSERT INTO "app_user" (username, email, password) VALUES 
( $1, lower($2), crypt($3, gen_salt('bf', 8))) RETURNING id;