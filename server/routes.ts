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
    try {
      // Look for token in Authorization header (Bearer token) or custom header
      const authHeader = req.headers.authorization;
      const xAuthToken = req.headers["x-auth-token"];
      
      const token = authHeader?.startsWith("Bearer ") 
        ? authHeader.substring(7) 
        : (xAuthToken as string);

      if (!token || !token.startsWith("mock-token-")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userId = token.replace("mock-token-", "");
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Auth check failed" });
    }
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
  
  app.patch("/api/monuments/:id", async (req, res) => {
    try {
      const monument = await storage.updateMonument(req.params.id, req.body);
      if (!monument) {
        return res.status(404).json({ error: "Monument not found" });
      }
      res.json(monument);
    } catch {
      res.status(500).json({ error: "Failed to update monument" });
    }
  });

  app.delete("/api/monuments/:id", async (req, res) => {
    try {
      const success = await storage.deleteMonument(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Monument not found" });
      }
      res.sendStatus(204);
    } catch {
      res.status(500).json({ error: "Failed to delete monument" });
    }
  });

  return httpServer;
}
