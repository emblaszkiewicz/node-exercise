import mongoose, { Schema } from "mongoose";
import { TBlackList } from '../types/types';

const BlackListSchema: Schema<TBlackList> = new Schema ({
    token: { type: String, required: true, unique: true },
    expireAt: { type: Date, default: new Date(), expires: 600, required: true },
});

export default mongoose.model('BlackList', BlackListSchema);