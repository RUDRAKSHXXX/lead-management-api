const express = require("express");
const router = express.Router();

const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  updateStatus
} = require("../controllers/leadController");

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

// 🔥 IMPORTANT ROUTE
router.put("/:id/status", updateStatus);

module.exports = router;