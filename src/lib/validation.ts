import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(60),
  email: z.string().email().max(160),
  password: z.string().min(8).max(100),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email().max(160),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2500),
});

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(100),
  summary: z.string().trim().min(10).max(300),
  problem: z.string().trim().min(10).max(1000),
  solution: z.string().trim().min(10).max(1000),
  result: z.string().trim().min(10).max(1000),
  techStack: z.array(z.string().trim().min(1)).min(1),
  liveUrl: z.string().url().or(z.literal("")).optional(),
  githubUrl: z.string().url().or(z.literal("")).optional(),
  imageUrl: z.string().url().or(z.literal("")).optional(),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  featured: z.boolean(),
  sortOrder: z.number().int(),
});
