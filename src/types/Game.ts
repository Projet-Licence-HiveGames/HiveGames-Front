import { User } from "./User";

export interface Game {
    id: number;
    name: string;
    short_description?: string;
    description?: string;
    images?: GameImage[];
    price: number;
    oldPrice?: number;
    current_version?: string;
    categories?: GameCategory[];
    languages?: GameLanguage[];
    studios?: GameStudio[];
    release_date?: string;
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

export interface GameStudio {
    id: number;
    name: string;
    logo_path: string;
}

export interface GameImage {
    id: number;
    file_name: string;
    file_url?: string;
    game: Game;
    alt: string;
}