import { Request, Response } from "express";
import Post from '../models/Post';
import { TPost } from '../types/types';

const getPosts = async (req: Request, res: Response) => {
    try {
        res.send(await Post.find());
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const addPost = async (req: Request<{}, {}, TPost>, res: Response) => {
    try {
        const { postTitle, postContent } = req.body;
        const newPost = new Post<TPost>({ postTitle, postContent });
        await newPost.save();
        res.send(newPost);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deletePost = async (req: Request<{id: string}>, res: Response) => {
    try {
        const findPost = await Post.findById(req.params.id);
        if(findPost) {
            await Post.deleteOne({ _id: req.params.id });
            res.send(findPost);
        } else res.status(404).json({ message: 'Post not found...'});
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const getPostById = async (req: Request<{id: string}>, res: Response) => {
    try {
        const findPost = await Post.findById(req.params.id);
        if(findPost) {
            res.send(findPost);
        } else res.status(404).send({ message: 'Post not found...'});
    } catch (err) {
        res.status(500).send({ message: err});
    }
};

const updatePost = async (req: Request<{id: string}, string, TPost>, res: Response) => {
    try {
        const { postTitle, postContent } = req.body;
        await Post.updateOne(
            { _id: req.params.id},
            { $set: { postTitle, postContent }},
        );
        res.send('Success!')
    } catch (err) {
        res.status(500).send({ message: err});
    }
};

const getRandom = async (req: Request, res: Response<TPost | {message: string} | unknown>) => {
    try {
        const count = await Post.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const post = await Post.findOne().skip(rand);
        if(post) {
            res.send(post);
        } else res.status(404).send({ message: 'Not found...'});
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

export default { getPosts, addPost, deletePost, getPostById, updatePost, getRandom };