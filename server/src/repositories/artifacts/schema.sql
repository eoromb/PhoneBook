DROP TABLE IF EXISTS "pb"."PhoneRecord";
DROP SCHEMA IF EXISTS pb CASCADE;

CREATE SCHEMA pb AUTHORIZATION pbuser
	CREATE TABLE "PhoneRecord" (
        id SERIAL PRIMARY KEY,
        fname varchar(250) not null,
        lname varchar(250) not null,
        phonenumber varchar(250) not null
    );
    CREATE UNIQUE INDEX fullname_unique on pb."PhoneRecord" (LOWER(fname), LOWER(lname));

