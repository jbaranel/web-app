create table Web_App.Likes (
    post_id CHAR (36),
    user_id CHAR (36),   
    created_at TIMESTAMP,    
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (post_id) REFERENCES Post(post_id)
);