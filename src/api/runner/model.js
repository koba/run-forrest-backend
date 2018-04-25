import mongoose, { Schema } from 'mongoose'

const runnerSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  run: {
    type: Schema.ObjectId,
    ref: 'Run',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

runnerSchema.index({ user: 1, run: 1 }, { unique: true })

runnerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      run: this.run.view(full),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Runner', runnerSchema)

export const schema = model.schema
export default model
