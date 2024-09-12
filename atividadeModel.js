const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  data: { type: String, required: true },
  realizada: { type: String, enum: ['sim', 'não'], required: true }
});

const Activity = mongoose.model('1571432412002', activitySchema);

module.exports = Activity;
