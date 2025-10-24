const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policy_number: { type: String, required: true },
  policy_start_date: { type: String, required: true },
  policy_end_date: { type: String, required: true },
  policy_mode: Number,
  premium_amount: Number,

  // Relations (references)
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lob' },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model('Policy', policySchema);
