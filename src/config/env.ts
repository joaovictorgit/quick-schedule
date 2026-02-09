import 'dotenv/config';

const required = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} not defined`);
  }

  return value;
};

export const env = {
  nodeEnv: required('NODE_ENV'),
  mongoUri: required('MONGO_URI'),
  secret: required('SECRET'),
};