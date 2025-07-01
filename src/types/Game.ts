import { User } from "./User";

export interface GameType {
  id: number;
  name: string;
  short_description?: string;
  long_description?: string;
  features?: GameFeature[];
  images?: GameImage[];
  price: number;
  promotion?: Promotion | null;
  current_version?: string;
  categories?: GameCategory[];
  languages?: GameLanguageDetails[];
  is_wished?: boolean;
  is_owned?: boolean;
  be_notified?: boolean;
  studios?: GameStudio[];
  release_date?: string;
  game_type: "base" | "dlc" | "demo" | "beta";
  votes?: {
    likes: number;
    dislikes: number;
  };
}

export interface GameBaseType extends GameType {
  dlcs: GameDlcType[];
}

export interface GameDlcType extends GameType {
  base_game_id: number;
}

export interface GameLanguage {
  id: number;
  label: string;
  code: string;
}

export interface GameLanguageDetails extends GameLanguage {
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
  game: GameBaseType;
  user: User;
  start_date: Date;
  end_date?: Date;
}

export interface GameCategory {
  id: number;
  label: string;
}

export interface GameInfoResponse {
  categories: GameCategory[];
  languages: GameLanguage[];
  features: GameFeature[];
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
  game: GameType;
  alt: string;
}

export interface GameFeature {
  id: number;
  description: string;
  label: string;
}

export interface Promotion {
  id: number;
  promotion_rate: number;
  start_date: Date;
  end_date: Date;
}

type PartialWithRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export interface GameReview extends ReviewRatings {
  id: number;
  user: PartialWithRequired<User, "id" | "pseudo">;
  game_id: number;
  created_at: Date;
  updated_at: Date;
  commentary: string | null;
}

export interface ReviewRatings {
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

export function isGameDlc(
  game: GameBaseType | GameDlcType,
): game is GameDlcType {
  return "base_game_id" in game && !("dlcs" in game);
}
