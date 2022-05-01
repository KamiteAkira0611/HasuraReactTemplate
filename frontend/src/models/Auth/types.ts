export type AuthUser = {
  id: UniqueId;
  token: String;
  avatar: ImageUrl;
  email: Email;
  name: String;
  tier: "Premium" | "";
};

export type Auth = {
  method: "FirebaseAuth";
  user: AuthUser;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: Email, password: string) => void;
  register: (email: Email, password: string) => void;
  logout: () => void;
};
