import express, { Request, Response } from 'express';
import 'dotenv/config'
import cors from 'cors'
import mongoose from "mongoose";
import postsRoutes from './routes/postsRoutes';
import usersRoutes from './routes/usersRoutes';
import securedRoutes from './routes/securedRoutes';

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Endpoints
app.use('/api', postsRoutes);
app.use('/api', usersRoutes);
app.use('/api', securedRoutes);

//Error
app.use('/api', (req: Request, res: Response) => {
    res.status(404).send({ message: 'Not found...' })
});

//Connect to database
const dbUri = 'mongodb+srv://Atlas:FlrEAwOMGrOTMsiM@cluster0.mjc1u1p.mongodb.net/PostsDB?retryWrites=true&w=majority';

mongoose.connect(dbUri)
    .then(() => console.log('Connected to the database!'))
    .catch((err) => console.log('Error' + err));


//Start server
app.listen(8000, () => {
    console.log('Server is running on 8000 port!')
});