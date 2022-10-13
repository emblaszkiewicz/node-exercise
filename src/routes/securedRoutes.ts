import express from 'express';
import controller from '../controllers/securedControllers';

const router = express.Router();

router.get('/secured', controller.getSecured);

export default  router;