import { User } from "./user.model";

export interface Token {
    idUser: string;
    isAdmin: boolean;
    expiresAt: number;
}

export interface TokenUser {
    token: string;
    user: User;
}

export function saveToken(token: string) {
    sessionStorage.setItem('token', token);
}

export function getToken(): string {
    return JSON.parse(sessionStorage.getItem('token'));
}