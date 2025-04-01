import express from "express";
import cors from "cors";
import AuthController from "./infrastructure/controllers/AuthController";
import InMemoryAuthRepository from "./infrastructure/services/InMemoryAuthRepository";
import RegisterUseCase from "./core/useCases/RegisterUseCase";
import LoginUseCase from "./core/useCases/LoginUseCase";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const authRepository = new InMemoryAuthRepository();
const registerUseCase = new RegisterUseCase(authRepository);
const loginUseCase = new LoginUseCase(authRepository);
const authController = new AuthController(registerUseCase, loginUseCase);

app.post("/register", (req, res) => authController.register(req, res));
app.post("/login", (req, res) => authController.login(req, res));

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});