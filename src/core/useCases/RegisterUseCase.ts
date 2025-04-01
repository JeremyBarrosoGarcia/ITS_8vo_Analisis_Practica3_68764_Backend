import { User } from "../domain/User";
import { AuthRepository } from "../ports/AuthRepository";

export default class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(user: User): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    return this.authRepository.register(user);
  }
}