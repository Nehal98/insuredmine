const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Agent = require('../models/agent');
const User = require('../models/user');
const Account = require('../models/account');
const Lob = require('../models/lob');
const Carrier = require('../models/carrier');
const Policy = require('../models/policy');

mongoose.connect(process.env.MONGO_URL);

fs.createReadStream(workerData.filePath)
  .pipe(csv())
  .on('data', async (row) => {
    try {
      // Insert or find Agent
      const agent = await Agent.findOneAndUpdate(
        { agent_name: row.agent },
        { agent_name: row.agent },
        { upsert: true, new: true }
      );

      // Insert or find User
      const user = await User.findOneAndUpdate(
        { email: row.email },
        {
          firstname: row.firstname,
          dob: row.dob,
          address: row.address,
          phone: row.phone,
          state: row.state,
          zip: row.zip,
          gender: row.gender,
          userType: row.userType
        },
        { upsert: true, new: true }
      );

      // Insert or find Account
      const account = await Account.findOneAndUpdate(
        { account_name: row.account_name },
        { account_name: row.account_name },
        { upsert: true, new: true }
      );

      // Insert or find LOB (Policy category)
      const lob = await Lob.findOneAndUpdate(
        { category_name: row.category_name },
        { category_name: row.category_name },
        { upsert: true, new: true }
      );

      // Insert or find Carrier
      const carrier = await Carrier.findOneAndUpdate(
        { company_name: row.company_name },
        { company_name: row.company_name },
        { upsert: true, new: true }
      );

      // Insert Policy, referencing others
      await Policy.create({
        policy_number: row.policy_number,
        policy_start_date: row.policy_start_date,
        policy_end_date: row.policy_end_date,
        policy_mode: row.policy_mode,
        premium_amount: row.premium_amount,
        category_id: lob._id,
        company_id: carrier._id,
        user_id: user._id,
        agent_id: agent._id,
        account_id: account._id
      });
    } catch (err) {
      console.error('Error inserting record:', err.message);
    }
  })
  .on('end', () => {
    parentPort.postMessage('Upload and insert completed successfully.');
  });
