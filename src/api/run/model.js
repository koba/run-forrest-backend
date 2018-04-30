import mongoose, { Schema } from 'mongoose'

const runSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  path: {
    type: Object,
    required: true
  },
  distance: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

runSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      city: this.city,
      country: this.country,
      path: this.path,
      distance: this.distance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Run', runSchema)

export const schema = model.schema
export default model
