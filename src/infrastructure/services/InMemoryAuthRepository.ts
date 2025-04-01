import { User } from "../../core/domain/User";
import { AuthRepository } from "../../core/ports/AuthRepository";

export default class InMemoryAuthRepository implements AuthRepository {
  private users: User[] = [];

  async register(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }
}