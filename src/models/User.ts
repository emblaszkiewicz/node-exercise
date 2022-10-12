import mongoose, { Schema } from "mongoose";
import { TUser } from '../types/types';

const UserSchema: Schema<TUser> = new Schema ({
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true },
});

export default mongoose.model('User', UserSchema);