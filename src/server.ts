import { Server } from "http";
import { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from "./app";

dotenv.config();

let server : Server;



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


process.on("unhandledRejection", (error: Error) => {
    console.error("Unhandled Rejection:", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});
