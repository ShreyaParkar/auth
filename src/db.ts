import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Missing MONGODB_URL in environment variables");
}

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// ✅ Use `globalThis` to persist connection across hot reloads
declare global {
  var mongooseGlobal: MongooseConn | undefined;
}

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
  globalThis.mongooseGlobal = cached;

  return cached.conn;
};
