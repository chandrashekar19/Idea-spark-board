import { Router } from "express";
import { supabase } from "../supabaseClient";

const router = Router();

// Get all ideas
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("public.ideas")
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Create a new idea
router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text || text.length > 280) {
    return res.status(400).json({ error: "Invalid idea" });
  }

  const { data, error } = await supabase
    .from("public.ideas")
    .insert([{ text, upvotes: 0 }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// Upvote idea
router.post("/:id/upvote", async (req, res) => {
  const { id } = req.params;

  // Option A: Simple update query (safe & works everywhere)
  // First, fetch current upvotes
  const { data: ideaData, error: fetchError } = await supabase
    .from("public.ideas")
    .select("upvotes")
    .eq("id", id)
    .single();

  if (fetchError || !ideaData) return res.status(404).json({ error: "Idea not found" });

  const newUpvotes = ideaData.upvotes + 1;

  const { data, error } = await supabase
    .from("public.ideas")
    .update({ upvotes: newUpvotes })
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

export default router;
