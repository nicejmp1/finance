export interface SignUpData {
    email: string;
    password: string;
    nickname: string;
    birthYear: string;
}

export interface User {
    id: string;
    email: string;
    nickname: string;
    birthYear: string;
}

export interface LoginData {
    email: string;
    password: string;
}