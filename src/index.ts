import express from "express";
import cors from "cors";
import { AuthServiceImpl } from "./infrastructure/services/AuthServiceImpl";
import { LoginUseCase } from "./core/useCases/LoginUseCase";
import { RegisterUseCase } from "./core/useCases/RegisterUseCase";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
const authService = new AuthServiceImpl();
const loginUseCase = new LoginUseCase(authService);
const registerUseCase = new RegisterUseCase(authService);

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUseCase.execute(email, password);
  if (user) res.json(user);
  else res.status(401).json({ error: "Invalid credentials" });
});

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const user = await registerUseCase.execute(email, password, name);
  if (user) res.json(user);
  else res.status(400).json({ error: "User already exists" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});