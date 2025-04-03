import { User } from "../../core/domain/User";
import { AuthService } from "../../core/ports/AuthService";
import * as fs from "fs/promises";

const DATA_FILE = "./users.json";

async function loadUsers(): Promise<{ email: string; password: string; name: string }[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveUsers(users: { email: string; password: string; name: string }[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export class AuthServiceImpl implements AuthService {
  private users: { email: string; password: string; name: string }[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    this.users = await loadUsers();
  }

  async login(email: string, password: string): Promise<User | null> {
    await this.init();
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (!user) return null;
    return {
      id: Math.random().toString(36).substring(2),
      email: user.email,
      name: user.name,
      token: `token-${user.email}-${Date.now()}`,
    };
  }

  async register(email: string, password: string, name: string): Promise<User | null> {
    await this.init();
    if (this.users.some((u) => u.email === email)) return null;
    const newUser = { email, password, name };
    this.users.push(newUser);
    await saveUsers(this.users);
    return {
      id: Math.random().toString(36).substring(2),
      email,
      name,
      token: `token-${email}-${Date.now()}`,
    };
  }
}