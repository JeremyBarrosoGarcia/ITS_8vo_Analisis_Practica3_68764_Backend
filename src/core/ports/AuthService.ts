import { User } from "../domain/User";

export interface AuthService {
  login(email: string, password: string): Promise<User | null>;
  register(email: string, password: string, name: string): Promise<User | null>;
}