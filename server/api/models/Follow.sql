create table Web_App.Follow (
    follower_id CHAR (36),
    following_id CHAR (36),
    created_at TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES USER(user_id),
    FOREIGN KEY (following_id) REFERENCES USER(user_id)
);