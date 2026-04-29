const Lead = require("../models/leadModel");


// CREATING LEAD
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  GET ALL LEADS (filter)
exports.getLeads = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const leads = await Lead.find(filter);

    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET SINGLE LEAD
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE LEAD
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE LEAD
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// STATUS TRANSITION LOGIC
const allowedTransitions = {
  NEW: ["CONTACTED", "LOST"],
  CONTACTED: ["QUALIFIED", "LOST"],
  QUALIFIED: ["CONVERTED", "LOST"],
  CONVERTED: [],
  LOST: [],
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    const currentStatus = lead.status;

    if (!allowedTransitions[currentStatus].includes(status)) {
      return res.status(400).json({
        error: `Invalid status transition from ${currentStatus} to ${status}`,
      });
    }

    lead.status = status;
    await lead.save();

    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
