// Description: Progress model for tracking user video progress in MongoDB database using Mongoose.
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IWatchedInterval {
  start: number;
  end: number;
}

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  videoId: string;
  videoDuration: number;
  watchedIntervals: IWatchedInterval[];
  lastPosition: number;
  progressPercent: number;
}

const WatchedIntervalSchema = new Schema<IWatchedInterval>(
  {
    start: { type: Number, required: true },
    end: { type: Number, required: true },
  },
  { _id: false }
);

const ProgressSchema = new Schema<IProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    videoId: { type: String, required: true, index: true },
    videoDuration: { type: Number, required: true },
    watchedIntervals: { type: [WatchedIntervalSchema], default: [] },
    lastPosition: { type: Number, default: 0 },
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

// Prevent one user/video duplicate
ProgressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export default mongoose.model<IProgress>('Progress', ProgressSchema);
