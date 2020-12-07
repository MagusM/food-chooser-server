CREATE TABLE Users (
    USER_ID SERIAL PRIMARY KEY,
	EMAIL varchar(255),
	FIRST_NAME varchar(255),
	LAST_NAME varchar(255),
	BIRTH_DATE DATE,
	ID_NUMBER varchar(255),
	PHONE_NAMBER varchar(255),
	CREATED_AT TIMESTAMP,
	LAST_UPDATED TIMESTAMP,
	LAST_LOGGED_IN TIMESTAMP
);

UPDATE Users SET FIRST_NAME='israel', LAST_NAME='israeli', BIRTH_DATE='2001-02-16', ID_NUMBER='066584103', PHONE_NAMBER='066584103'  WHERE EMAIL='israel@gmail.com';
INSERT INTO Users(EMAIL, FIRST_NAME, LAST_NAME, BIRTH_DATE, ID_NUMBER, PHONE_NAMBER)
SELECT 'israel@gmail.com', 'israel', 'israeli', '2001-02-16', '066584103', '066584103' 
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE EMAIL='israel@gmail.com');