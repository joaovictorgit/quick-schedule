import mongoose from "mongoose";
import { env } from "./env";

export const databaseconfig = {
  mongo: {
    uri: env.mongoUri,
  }
};

export const connectMongo = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('conectado!');
  } catch (error) {
    console.error('Erro ao conectar o mongoDB', error);
    process.exit(1);
  }
};