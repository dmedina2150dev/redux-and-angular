export interface UserCreated {
    nombre: string;
    email: string;
    password: string;
}

export interface UserSignin {
    email: string;
    password: string;
}