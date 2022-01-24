export default class User {
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