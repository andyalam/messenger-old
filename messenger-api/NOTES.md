Sudo into the postgres user
> sudo su - postgres

Log into the postgres session
> psql

Create the database
> CREATE DATABASE myproject;

Create the user
> CREATE USER myprojectuser WITH PASSWORD 'password';

Set the permissions
> ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
> ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
> ALTER ROLE myprojectuser SET timezone TO 'UTC';

Give the database user access rights to the database
> GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;

Exit the SQL prompt
> \q

Exit the shell session
> exit
