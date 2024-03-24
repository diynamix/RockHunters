export interface User {
    _id: string,
    email: string,
    username: string,
    accessToken?: string,
}

export interface UserForAuth {
    email: string,
    username?: string,
    password: string,
}