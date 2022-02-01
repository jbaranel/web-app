export interface Post {
    post_id: sting    
    created_at: string,
    post: string,
    user: User,
    comments?: Comments[],
    likes?: Likes[]
}

export interface Comments {
    comment_id: string,
    created_at: string,
    comment: string
    user: User
}

export interface Likes {
    user: User[]
}