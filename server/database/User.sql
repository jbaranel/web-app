create table Web_App.User (
    user_id CHAR (36) PRIMARY KEY,
    username VARCHAR (32) UNIQUE NOT NULL,
    password CHAR (60) NOT NULL,
    firstName VARCHAR(64),
    lastName VARCHAR(64),
    email VARCHAR(64) UNIQUE NOT NULL,
    createdAt TIMESTAMP,
    following BLOB,
    followers BLOB,
    avatarUrl CHAR (88)
);
