export default class User {
    constructor(id, username, password, firstName, lastName, email, createdAt, following, followers, avatar) {
        this.id = id
        this.username = username,
        this.password = password,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.createdAt = createdAt.toString(),
        this.following = following,
        this.followers = followers,
        this.avatar = avatar
    }
  }