const Deal = require('../models/Deal'); // your Deal Mongoose model

// GET all deals
exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json({ data: deals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE deal
exports.createDeal = async (req, res) => {
  try {
    const deal = await Deal.create(req.body);
    res.status(201).json({ data: deal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE deal
exports.updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.json({ data: deal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE deal
exports.deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
