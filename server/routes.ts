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
