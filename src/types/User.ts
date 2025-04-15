export interface UserForm {
    pseudo: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    user: {};
    pseudo: string;
    user_tag: string;
    email: string;
    user_role: string;
    game_collection?: UserGameCollection[];
}

interface UserGameCollection {
    game_id: number;
    is_wished: boolean;
    is_owned: boolean;
    be_notified: boolean;
}