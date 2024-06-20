const { Schema, model } = require('mongoose')

// Схема для поста
const postSherikSchema = new Schema({
  chatId: { type: Number, required: true },
  fullName: { type: String, required: true },
  tehnologiya: { type: String, required: true },
  telegram: { type: String, required: true },
  aloqa: { type: String, required: true },
  hudud: { type: String, required: true },
  narxi: { type: String, required: true },
  kasbi: { type: String, required: true },
  murojat: { type: String, required: true },
  maqsad: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  sent: { type: Boolean, default: false },  // новый флаг
});

const ishJoyiSchema = new Schema({
  chatId: { type: Number, required: true },
  fullName: { type: String, required: true },
  yosh: { type: Number, required: true },
  tehnologiya: { type: String, required: true },
  aloqa: { type: String, required: true },
  hudud: { type: String, required: true },
  narxi: { type: String, required: true },
  kasbi: { type: String, required: true },
  murojat: { type: String, required: true },
  maqsad: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  sent: { type: Boolean, default: false },  // новый флаг
})


module.exports = model('PostSherik', postSherikSchema);