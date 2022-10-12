import { Request, Response } from "express";
import User from '../models/User';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TUser, JwtPayload, TObject } from '../types/types';
import { JWT_SECRET } from '../config/JWT_SECRET';

const registerUser = async (req: Request<TObject, TObject, TUser>, res: Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !email.toLowerCase().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) || !password || password.length < 6) {
            return res.send({ message: 'Invalid password(Password must be a string with min 6 char)!' });
        }
        const codedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: codedPassword });
        await newUser.save();
        res.send({ message: 'User created!' });

    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const loginUser = async (req: Request<TObject, TObject, TUser>, res: Response) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if(findUser && await bcrypt.compare(password, findUser.password)) {
            const token = jwt.sign(
                {
                    id: findUser._id,
                    email: findUser.email
                },
                JWT_SECRET || ''
            )
            return res.send({ message: 'You are logged in!', token })
        }
        res.status(404).send({ message: 'Invalid email or password' });

    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const changeUserPassword = async (req: Request<TObject, TObject, TUser>, res: Response) => {
    try {
        const { token, password } = req.body;
        if(!password || password.length < 6) {
            return res.status(400).send({ message: 'Invalid password(Password must be a string with min 6 char)!' });
        }
        const user = jwt.verify(token, JWT_SECRET || '') as JwtPayload;
        const _id = user.id;
        const codedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            { _id },
            {$set: { password: codedPassword }},
        );
        res.send({ message: 'Password changed!' });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

export default { registerUser, loginUser, changeUserPassword };