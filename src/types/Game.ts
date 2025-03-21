import { User } from "./User";

export interface Game {
    id: number;
    name: string;
    short_description?: string;
    description?: string;
    image?: string[];
    price?: number;
    current_version?: string;
    categories?: GameCategory[];
    languages?: GameLanguage[];
}

export interface Language {
    id: number;
    label: string;
    code: string;
}

export interface GameLanguage extends Language {
    has_subtitle: boolean;
    has_voice: boolean;
    has_interface: boolean;
}

export interface GameFeature {
    id: number;
    label: string;
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