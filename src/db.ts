import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// ✅ Use `globalThis` instead of `any`
declare global {
  var mongooseGlobal: MongooseConn | undefined;
}

// ✅ Use global caching to prevent multiple DB connections
let cached: MongooseConn = globalThis.mongooseGlobal || { conn: null, promise: null };

export const connect = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "FinalProjDB",
      bufferCommands: true,
      connectTimeoutMS: 30000,
    });

  cached.conn = await cached.promise;

  globalThis.mongooseGlobal = cached; // ✅ Store in global cache

  return cached.conn;
};
