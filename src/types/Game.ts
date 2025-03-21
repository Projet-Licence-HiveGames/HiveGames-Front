import { User } from "./User";

export interface Game {
    id: number;
    name: string;
    short_description?: string;
    description?: string;
    image?: string[];
    current_price?: number;
    current_version?: string;
    categories?: GameCategory[];
    languages?: string[];
}

export interface Language {
    id: number;
    name: string;
    lang_code: string;
    has_subtitle: boolean;
    has_voice: boolean;
    has_interface: boolean;
}

export interface GameSession {
    id: number;
    game: Game;
    user: User;
    start_date: Date;
    end_date?: Date;
}

export interface GameCategory {
    id: number;
    label: string;
}