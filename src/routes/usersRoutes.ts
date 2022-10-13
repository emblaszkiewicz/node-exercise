import express from "express";
import controller from '../controllers/usersControllers';

const router = express.Router();

router.post('/user/register', controller.registerUser);
router.post('/user/login', controller.loginUser);
router.post('/user/change', controller.changeUserPassword);
router.get('/user/logOut', controller.logOut);

export default  router;