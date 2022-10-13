import express from "express";
import controller from '../controllers/postsControllers';

const router = express.Router();

router.get('/posts', controller.getPosts);
router.post('/posts', controller.addPost);
router.delete('/posts/:id', controller.deletePost);
router.get('/posts/:id', controller.getPostById);
router.put('/posts/:id', controller.updatePost);
router.get('/random', controller.getRandom);

export default router;