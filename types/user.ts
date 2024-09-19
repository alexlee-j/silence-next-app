export type User = {
  id?: number;
  name: string;
  email: string;
  created_at?: string;
};
export type UserWithoutId = Omit<User, "id">;
