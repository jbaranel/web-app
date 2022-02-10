export interface User {
    user_id: string
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    avatar_url: string
    created_at: string,
    password: string,
    followers?: User[],
    following?: User[]
}