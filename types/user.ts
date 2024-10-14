export type User = {
  id?: number;
  name: string;
  email: string | null;
  created_at?: string;
  is_deleted?: string;
};
export type UserWithoutId = Omit<User, "id">;
