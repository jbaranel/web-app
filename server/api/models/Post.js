export default class Post {
    constructor(id, username, createdAt, post) {
        this.id = id,
        this.username = username,        
        this.createdAt = createdAt.toString(),
        this.post = post,
        this.likes = 0
    }
}