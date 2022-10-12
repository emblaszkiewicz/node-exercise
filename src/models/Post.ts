import mongoose, { Schema } from "mongoose";
import { TPost } from '../types/types';

const PostSchema: Schema<TPost> = new Schema ({
    postTitle: { type: String, required: true },
    postContent: { type: String, required: true },
});

export default mongoose.model('Post', PostSchema);