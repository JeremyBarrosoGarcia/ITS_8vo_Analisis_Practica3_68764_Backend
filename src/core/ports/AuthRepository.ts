import { User } from "../domain/User";

export interface AuthRepository {
  register(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}