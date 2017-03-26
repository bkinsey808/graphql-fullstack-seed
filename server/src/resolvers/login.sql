SELECT *
FROM app_user
WHERE (email = lower($1) OR username = $1) AND password = crypt($2, password);