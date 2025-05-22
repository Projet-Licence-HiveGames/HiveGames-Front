import { User } from "./User";

export interface Game {
  id: number;
  name: string;
  short_description?: string;
  long_description?: string;
  features?: GameFeature[];
  images?: GameImage[];
  price: number;
  oldPrice?: number;
  current_version?: string;
  categories?: GameCategory[];
  languages?: GameLanguage[];
  is_wished?: boolean;
  is_owned?: boolean;
  be_notified?: boolean;
  studios?: GameStudio[];
  release_date?: string;
  game_type?: "base" | "dlc";
  dlcs: Game[];
  reviews?: GameReview[];
}

export interface Language {
  id: number;
  label: string;
  code: string;
}

export interface GameDlc extends Omit<Game, "dlcs"> {
  base_game_id?: number;
}

export interface GameLanguage extends Language {
  has_subtitles: boolean;
  has_voice_over: boolean;
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

export interface GameFeature {
  id: number;
  description: string;
  label: string;
}

type PartialWithRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export interface GameReview {
  id: number;
  user: PartialWithRequired<User, "id" | "pseudo">;
  game_id: number;
  created_at: Date;
  updated_at: Date;
  commentary: string | null;
  gameplay_rate: number | null;
  graphics_rate: number | null;
  sound_design_rate: number | null;
  story_rate: number | null;
  translation_quality_rate: number | null;
  usability_rate: number | null;
  value_for_money_rate: number | null;
}

export function findGameCollection(gameId: number, user?: User | null) {
  return user?.game_collections?.find(
    (c) => Number(c.game_id) === Number(gameId),
  );
}

export function isGameDlc(game: Game | GameDlc): game is GameDlc {
  return "base_game_id" in game && !("dlcs" in game);
}
