const express = require("express");
const router = express.Router();
const { Job } = require("../models/user");
const authenticate = require("../middleware/authenticate");
const authorizeOwner = require("../middleware/authorizeowner");

// GET all jobs (public)
router.get("/view", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// GET single job (public)
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: "Invalid job ID", error: err.message });
  }
});

// CREATE job (protected)
router.post("/", authenticate, async (req, res) => {
  const { title, company, location, description } = req.body;
  if (!title || !company)
    return res.status(400).json({ message: "Title and company are required" });

  const job = new Job({
    title,
    company,
    location,
    description,
    creatorId: req.user.id,
  });
  await job.save();
  res.status(201).json({ message: "Job created successfully", job });
});

// UPDATE job (protected + owner)
router.put("/:id", authenticate, authorizeOwner, async (req, res) => {
  Object.assign(req.job, req.body, { updatedAt: Date.now() });
  await req.job.save();
  res.json({ message: "Job updated successfully", job: req.job });
});

// DELETE job (protected + owner)
router.delete("/:id", authenticate, authorizeOwner, async (req, res) => {
  await req.job.deleteOne();
  res.json({ message: "Job deleted successfully" });
});

module.exports = router;
