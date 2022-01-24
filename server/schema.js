export class User {
    constructor(username, password, firstName, lastName, email, createdAt, following, followers) {
        this.username = username,
        this.password = password,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.createdAt = createdAt.toString(),
        this.following = following,
        this.followers = followers
    }
  }

  export class Post {
    constructor(id, username, createdAt, post) {
        this.id = id,
        this.username = username,        
        this.createdAt = createdAt.toString(),
        this.post = post,
        this.likes = 0
    }
  }

