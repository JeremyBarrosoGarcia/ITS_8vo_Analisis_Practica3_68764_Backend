import { Request, Response } from "express";
import RegisterUseCase from "../../core/useCases/RegisterUseCase";
import LoginUseCase from "../../core/useCases/LoginUseCase";

export default class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase
  ) {}

  async register(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const user = await this.registerUseCase.execute({
        id: Date.now().toString(),
        email,
        name,
        password,
      });
      res.status(201).json(user);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUseCase.execute(email, password);
      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      res.status(200).json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  }
}