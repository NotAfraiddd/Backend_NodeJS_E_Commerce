const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cart: { type: Object, require: true },
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
)

userSchema.plugin(mongooseDelete, { overrideMethods: 'all' }) // only show data without deletedAt

module.exports = mongoose.model('User', userSchema)
