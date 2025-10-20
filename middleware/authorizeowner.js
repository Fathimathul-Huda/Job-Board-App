const { Job } = require("../models/user"); // or "../models/user" depending on export

async function authorizeOwner(req, res, next) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.creatorId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    req.job = job; // attach job to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid job ID", error: err.message });
  }
}

module.exports = authorizeOwner;
