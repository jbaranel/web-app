export interface User {
    user_id: string
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    avatar_url: string
    created_at: string,
    password: string  
    followers?: User[]
    following?: User[]
}

export interface Post {
    post_id: string,
    user_id: string,
    created_at: string,
    post: string
}

export interface Comment {
    commend_id: string,
    post_id: string,
    user_id: string,
    created_at: string,
    comment: string
}

export interface Follow {
    follower_id: string,
    follwing_id: string,
    created_at: string
}

export interface Like {
    post_id: string,
    user_id: string,
    created_at: string
}