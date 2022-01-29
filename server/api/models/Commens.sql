create table Web_App.Comments (
	comment_id CHAR (36) PRIMARY KEY,
    post_id CHAR (36) not null,
    user_id CHAR (36) not null,   
    created_at TIMESTAMP,
    comment VARCHAR(512),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (post_id) REFERENCES Post(post_id)
);