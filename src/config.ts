const MONGO_IP = process.env.MONGO_IP || "mongodb";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
// const MONGO_USER = process.env.MONGO_USER;
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

// const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/postDb`;
const MONGODB_URI = `mongodb://yash:password@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const REDIS_HOST = process.env.REDIS_URL || "redis";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const SESSION_SECRET =
  process.env.SESSION_SECRET || "JNJNGSLKDFJNSLDKFJNDJFNLJ";
// const REDIS_URL = `redis://yash:password@${REDIS_HOST}:${REDIS_PORT}`;
const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

// export { MONGODB_URI, REDIS_HOST, REDIS_PORT, SESSION_SECRET };
export { MONGODB_URI, REDIS_HOST, REDIS_PORT, REDIS_URL, SESSION_SECRET };
