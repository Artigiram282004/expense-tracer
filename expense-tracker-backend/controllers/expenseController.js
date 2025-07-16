const Expense = require('../models/Expense');

// Create
exports.addExpense = async (req, res) => {
    try {
      console.log("Request body:", req.body);  // <--- Add this
      const expense = await Expense.create(req.body);
      res.status(201).json(expense);
    } catch (err) {
      console.error(err);                      // <--- Add this
      res.status(400).json({ message: err.message });
    }
  };
  
// exports.addExpense = async (req, res) => {
//   try {
//     const expense = await Expense.create(req.body);
//     res.status(201).json(expense);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// Read All
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
