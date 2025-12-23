import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

async function fetchGitHubRepos(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!response.ok) return [];
    const repos = await response.json();
    return repos
      .filter((repo: any) => !repo.fork)
      .sort((a: any, b: any) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .map((repo: any) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
      }));
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Maxdebdavgag@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Routes
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      api.projects.create.input.parse(req.body);
      res.status(201).json({ success: true, message: "Projects are read-only in this portfolio" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.skills.create.path, async (req, res) => {
    try {
      api.skills.create.input.parse(req.body);
      res.status(201).json({ success: true, message: "Skills are read-only in this portfolio" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.github.repos.path, async (req, res) => {
    const { username } = req.params;
    const repos = await fetchGitHubRepos(username);
    res.json(repos);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      
      // Send email notification
      await transporter.sendMail({
        from: "Maxdebdavgag@gmail.com",
        to: "Maxdebdavgag@gmail.com",
        subject: `New Contact Form Submission from ${input.name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Message:</strong></p>
          <p>${input.message.replace(/\n/g, '<br>')}</p>
        `,
        replyTo: input.email,
      });
      
      res.json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("Contact form error:", err);
      throw err;
    }
  });

  return httpServer;
}
