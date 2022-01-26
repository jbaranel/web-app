create table Web_App.Post (
    post_id CHAR (36) PRIMARY KEY,
    user_id VARCHAR (32),        
    createdAt TIMESTAMP,
    post VARCHAR(512),
    likes BLOB,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);