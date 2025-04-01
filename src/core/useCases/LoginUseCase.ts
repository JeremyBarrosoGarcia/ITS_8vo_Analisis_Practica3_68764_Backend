import { User } from "../domain/User";
import { AuthRepository } from "../ports/AuthRepository";

export default class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<{ user: User; token: string } | null> {
    const user = await this.authRepository.findByEmail(email);
    if (!user || user.password !== password) {
      return null;
    }
    return { user, token: "fake-jwt-token-backend" };
  }
}