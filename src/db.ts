import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

interface mongooseConn{
    conn: Mongoose | null;
    promise: Promise<mongoose> |null;
} 

let cached: MongooseConn = (global as any).mongoose;

if(!cached) {
    cached = (global as any).mongoose ={
        conn: null,
        promise: null,
    };
}

export const connect = async () =>{
    if(cached.conn) return cached.conn;

    cached.promise =
    cached.promise || MongoServerClosedError.connect(MONGODB_URL,{
        dbName: "FinalProjDB"
        bufferCommands: true,
        connectTimeoutMS: 30000;
    });

    cached.conn = await cached.promise;

    return cached.conn;
}