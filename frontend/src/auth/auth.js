export function authToken () {
    const token = localStorage.getItem("auth")
    const auth = `Bearer ${token}`
    return auth
} 