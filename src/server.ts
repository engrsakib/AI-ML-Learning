import { Server } from "http";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

let server : Server;
const app: Express = express();


const startServer = async(port: number): Promise<void> => {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string);
        server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error: unknown) {
        console.error('Error connecting to MongoDB:', error);
    }
}

startServer(Number(process.env.PORT) || 1000);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Welcome to the Tour Management System');
});