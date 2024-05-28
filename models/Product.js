const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const mongooseDelete = require('mongoose-delete')

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, require: true },
    name: { type: String, require: true },
    image: { type: String, require: true },
    category: { type: String, require: true },
    new_price: { type: Number, require: true },
    old_price: { type: Number, require: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

productSchema.plugin(AutoIncrement, { inc_field: 'id' })
productSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

module.exports = mongoose.model('Product', productSchema)
