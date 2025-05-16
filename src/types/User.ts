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
  avatar_path: string | null;
  email: string;
  user_role: string;
  game_collections?: UserGameCollections[];
}

interface UserGameCollections {
  game_id: number;
  is_wished: boolean;
  is_owned: boolean;
  be_notified: boolean;
}
