import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Authentication Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password, role } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const user = await storage.createUser({ username, password, role: role || "enthusiast" });
      // In a real app, we would issue a JWT here. For now, we simulate with a token.
      res.status(201).json({ token: "mock-token-" + user.id, user });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);

      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ token: "mock-token-" + user.id, user });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    // For now, since we don't have real session middleware, 
    // we'll return a 401 to force a login redirect if no session is active.
    // In a full implementation, we'd check req.headers.authorization
    res.status(401).json({ error: "Unauthorized" });
  });

  app.post("/api/auth/logout", async (_req, res) => {
    res.json({ message: "Logged out successfully" });
  });

  // Monument Routes
  app.get("/api/monuments", async (_req, res) => {
    try {
      const monuments = await storage.getMonuments();
      res.json(monuments);
    } catch {
      res.status(500).json({ error: "Failed to fetch monuments" });
    }
  });

  app.get("/api/monuments/:id", async (req, res) => {
    try {
      const monument = await storage.getMonument(req.params.id);
      if (!monument) {
        return res.status(404).json({ error: "Monument not found" });
      }
      res.json(monument);
    } catch {
      res.status(500).json({ error: "Failed to fetch monument" });
    }
  });

  app.post("/api/monuments", async (req, res) => {
    try {
      const monument = await storage.createMonument(req.body);
      res.status(201).json(monument);
    } catch {
      res.status(500).json({ error: "Failed to create monument" });
    }
  });

  return httpServer;
}
