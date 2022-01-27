create table Web_App.User (
    user_id CHAR (36) PRIMARY KEY,
    username VARCHAR (32) UNIQUE NOT NULL,
    password VARCHAR (60) NOT NULL,
    firstName VARCHAR(64),
    lastName VARCHAR(64),
    email VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMP,
    avatar_url CHAR (88)
);
