import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  recurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly' | null;
}

const eventSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    recurring: {
      type: Boolean,
      required: true,
      default: false,
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
