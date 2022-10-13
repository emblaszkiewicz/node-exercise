import { Request, Response } from "express";
import BlackList from '../models/BlackList';
import jwt from 'jsonwebtoken';

const getSecured = async (req: Request , res: Response) => {
    try {
        const token = req.header('token');
        const isBlocked = await BlackList.findOne({ token });
        if(!token || isBlocked) return res.send('Access denied!');
        const verify = jwt.verify(token, process.env.JWT_SECRET || '');
        if(verify && !isBlocked) {
            return res.send('Access provided!');
        }
    } catch (err) {
        res.status(500).send('Invalid token!');
    }
}

export default { getSecured };